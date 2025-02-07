import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import { Link } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import CategoryFilter from "../components/Categories/CategoryFilter";
import Pagination from "../components/Pagination/Pagination";
import { listCategories } from "../services/categoryService";
import { getCategoryProducts } from "../services/categoryService";
import { getAllProducts } from "../services/productService";
import LoadingIndicator from "../components/Shared/LoadingIndicator";
import ScrollToTopButton from "../components/Shared/ScrollTopButton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const { isAdmin } = useContext(AuthContext);

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
      setIsLoading(true);
      if (selectedCategory) {
        try {
          const { data } = await getCategoryProducts(selectedCategory);
          setProducts(data.products);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        const { data } = await getAllProducts();
        console.log("Data:", data);
        setProducts(data.data);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

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
      {isAdmin && (
        <Link role="button" to={`/products/add`} className="product-add-btn">
          Add Product
        </Link>
      )}

      <CategoryFilter
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="products">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <Pagination
        totalItems={products.length}
        itemsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ScrollToTopButton />
    </div>
  );
};

export default Products;
