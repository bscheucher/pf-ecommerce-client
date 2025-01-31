import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getAllProducts } from "../services/productService";
import Hero2 from "../components/Home/Hero2";
import ProductCard from "../components/Products/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Hero2 />
      <Row>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </Row>
    </Container>
  );
}

export default Home;
