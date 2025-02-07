import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { searchInProducts } from "../services/productService";
import ProductCard from "../components/Products/ProductCard";
import LoadingIndicator from "../components/Shared/LoadingIndicator";
import { AuthContext } from "../services/AuthContext";
import ScrollToTopButton from "../components/Shared/ScrollTopButton";

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.trim().length < 3) {
        setError("Query must be at least 3 characters long.");
        return;
      }

      setLoading(true);
      setError("");
      setResults([]);

      try {
        const response = await searchInProducts({ query });
        setResults(response.data);
      } catch (err) {
        setError("Error fetching search results. Please try again later.");
        console.error(
          "Search error:",
          err.message || err.response?.data?.error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <h1 className="text-center fw-bold mb-4 mt-2">Search Results</h1>

      {loading && <LoadingIndicator />}
      {error && <p>{error}</p>}
      <div className="product-grid">
        {results.length > 0
          ? results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLoggedIn={isLoggedIn}
              />
            ))
          : !loading && <p>No results found.</p>}
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export default SearchResultsPage;
