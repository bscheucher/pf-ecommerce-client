import { useState, useEffect } from "react";
import {
  listCategories,
  getProductCategories,
} from "../../services/categoryService";
import MultipleCategoryFilter from "../Categories/MultipleCategoryFilter";

function UpdateProductForm({ onSubmit, initialValues }) {
  const [product, setProduct] = useState(initialValues);
  const productId = product.id;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesRes, selectedCategoriesRes] = await Promise.all([
          listCategories(),
          getProductCategories(productId),
        ]);
        setCategories(categoriesRes.data || []);
        setSelectedCategories(
          selectedCategoriesRes.data.map((cat) => cat.id) || []
        );
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedProduct = {
      ...product,
      image_url: product.imageUrl,
    };

    delete formattedProduct.imageUrl;

    onSubmit({
      updatedProduct: formattedProduct,
      updatedProductCategories: selectedCategories,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
      <h4 className="text-center mb-4">Update Product</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Product Name</label>
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Stock</label>
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="imageUrl"
            type="text"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Categories</label>
          <MultipleCategoryFilter
            categories={categories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Update Product
      </button>
    </form>
  );
}

export default UpdateProductForm;
