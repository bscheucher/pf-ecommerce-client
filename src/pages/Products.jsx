import React, { useState, useEffect } from "react";
import ProductCard from "../components/Products/ProductCard";
import CategoryFilter from "../components/Categories/CategoryFilter";
import Pagination from "../components/Pagination/Pagination";
import { listCategories } from "../services/categoryService";
import { getCategoryProducts } from "../services/categoryService";
import { getAllProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await listCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        try {
          const { data } = await getCategoryProducts(selectedCategory);
          setProducts(data.products);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      } else {
        const { data } = await getAllProducts();
        console.log("Data:", data);
        setProducts(data.data);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  console.log("Selected Category:", selectedCategory);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <h1>Products</h1>
      <CategoryFilter
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="products">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        totalItems={products.length}
        itemsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Products;
