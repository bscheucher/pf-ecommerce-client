import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getAllProducts } from "../services/productService";
import Hero2 from "../components/Home/Hero2";
import ProductCard from "../components/Products/ProductCard";
import LoadingIndicator from "../components/Shared/LoadingIndicator";


function Home() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [latestProduct, setLatestProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getAllProducts();
        const allProducts = response.data.data;
        setProducts(allProducts);

        // Get the latest product (based on creation date)
        const latest = allProducts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0];
        setLatestProduct(latest);

        // Randomly select 3 featured products
        const featured = allProducts
          .filter((product) => product.featured)
          .slice(0, 3);
        setFeaturedProducts(featured);

        // Simulate trending products by randomly picking products
        const trending = allProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setTrendingProducts(trending);

        // Simulate best sellers by picking the top 3 products (e.g., most stock left or some other criteria)
        const bestSellers = allProducts
          .sort((a, b) => b.stock - a.stock)
          .slice(0, 3);
        setBestSellers(bestSellers);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <Container>
      <Hero2 />

      {/* Latest Product */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        latestProduct && (
          <div>
            <h2 className="products-heading">Latest Added</h2>
            <ProductCard product={latestProduct} />
          </div>
        )
      )}

      {/* Featured Products */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        featuredProducts.length > 0 && (
          <div>
            <h2 className="products-heading">Featured</h2>
            <Row>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Row>
          </div>
        )
      )}

      {/* Trending Products */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        trendingProducts.length > 0 && (
          <div>
            <h2 className="products-heading">Trending</h2>
            <Row>
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Row>
          </div>
        )
      )}

      {/* Best Sellers */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        bestSellers.length > 0 && (
          <div>
            <h2>Best Sellers</h2>
            <Row>
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Row>
          </div>
        )
      )}
      
    </Container>
  );
}

export default Home;
