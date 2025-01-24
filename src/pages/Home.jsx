import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllProducts } from "../services/productService";

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
  console.log("products in home:", products);
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* Render product card here */}
            <div className="card my-1">
              <div className="card-img-top d-flex justify-content-center align-items-center h-1">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-img"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                {/* Add button to view product details or add to cart */}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
