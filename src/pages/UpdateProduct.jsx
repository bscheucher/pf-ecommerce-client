import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateProductForm from "../components/Products/UpdateProductForm";
import { getProductById, updateProduct } from "../services/productService";
import { addCategoryToProduct } from "../services/categoryService";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setInitialValues(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async ({ updatedProduct, updatedProductCategories }) => {
    try {
      const response = await updateProduct(id, updatedProduct);
      console.log("Product updated successfully:", response.data);

      await Promise.all(
        updatedProductCategories.map(async (categoryId) => {
          const data = { productId: id, categoryId };
          const categoryResponse = await addCategoryToProduct(data);
          console.log("Category added to product:", categoryResponse);
        })
      );
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading product data...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">Update Product</h2>
          <UpdateProductForm initialValues={initialValues} onSubmit={handleUpdateProduct} />
        </>
      )}
    </div>
  );
}

export default UpdateProduct;
