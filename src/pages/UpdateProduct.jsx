// src/components/UpdateProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/Products/AddProductForm";
import { getProductById, updateProduct } from "../services/productService";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product data when the component mounts.
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

  const handleUpdateProduct = async (updatedData) => {
    try {
      const response = await updateProduct(id, updatedData);
      console.log("Product updated successfully:", response.data);
      // Navigate to the products list or another appropriate page.
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, display an error message to the user.
    }
  };

  if (loading) {
    return <div>Loading product data...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>Update Product</h2>
      <ProductForm
        initialValues={initialValues}
        onSubmit={handleUpdateProduct}
        submitButtonText="Update Product"
      />
    </div>
  );
}

export default UpdateProduct;
