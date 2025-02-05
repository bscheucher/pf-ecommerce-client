import React from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/Products/AddProductForm";
import { addProduct } from "../services/productService";
import { addCategoryToProduct } from "../services/categoryService";

function AddProduct() {
  const navigate = useNavigate();

  const handleAddProduct = async ({ newProduct, productCategories }) => {
    try {
      const response = await addProduct(newProduct);
      console.log("Product added successfully:", response.data);
      const createdProduct = response.data;
      const productId = createdProduct.id;
      console.log("productCategories in AddProduct", productCategories);
      // Wait for all category assignments to complete before navigating
      await Promise.all(
        productCategories.map(async (categoryId) => {
         
          console.log("Category ID in AddProduct");
          const data = { productId, categoryId };
          const categoryResponse = await addCategoryToProduct(data);
          console.log("Category added to product:", categoryResponse);
        })
      );

      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <AddProductForm onSubmit={handleAddProduct} />
    </div>
  );
}

export default AddProduct;
