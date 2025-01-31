import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import { getProductById } from "../services/productService";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../services/reviewService";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id: productId } = useParams();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    productId,
    rating: "",
    comment: "",
  });
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProductById(productId);
        setProduct(productResponse.data);
        const reviewsResponse = await getReviews(productId);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [productId]);

  const handleAddReview = async () => {
    try {
      const reviewToSubmit = { ...newReview, user_id: userId };
      await addReview(reviewToSubmit);
      const updatedReviews = await getReviews(productId);
      setReviews(updatedReviews.data);
      setNewReview({ productId, rating: "", comment: "" });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleEditReview = async () => {
    try {
      await updateReview(editingReviewId, newReview);
      const updatedReviews = await getReviews(productId);
      setReviews(updatedReviews.data);
      setEditingReviewId(null);
      setNewReview({ productId, rating: "", comment: "" });
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      const updatedReviews = await getReviews(productId); // Fetch updated reviews
      setReviews(updatedReviews.data);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingReviewId) {
      handleEditReview();
    } else {
      handleAddReview();
    }
  };
  console.log(reviews);
  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <img
            src={product.image_url}
            className="img-fluid product-detail-img"
            alt={product.name}
          />
          <h2>Price: ${product.price}</h2>
        </div>
      </div>

      <section>
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review border p-3 mb-3 rounded">
              <strong>{review.rating} / 5</strong>
              <p>{review.comment}</p>
              <p>
                By: {review.username} Review User ID: {review.user_id} UserId:{" "}
                {userId}
              </p>
              {userId === review.user_id && (
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => {
                      setEditingReviewId(review.id);
                      setNewReview({
                        productId,
                        rating: review.rating,
                        comment: review.comment,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </section>

      {isLoggedIn && (
        <section>
          <h3>{editingReviewId ? "Edit Your Review" : "Add a Review"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating:
              </label>
              <input
                type="number"
                id="rating"
                className="form-control"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
                min="1"
                max="5"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment:
              </label>
              <textarea
                id="comment"
                className="form-control"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button className="btn btn-success" type="submit">
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
