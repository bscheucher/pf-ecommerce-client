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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">
        Search Results
      </h1>

      {loading && <LoadingIndicator />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {results.length > 0 ? (
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-start lg:justify-between gap-4">
          {results.map((product) => (
            <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5" key={product.id}>
              <ProductCard product={product} isLoggedIn={isLoggedIn} />
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-600">No results found.</p>
        )
      )}
      
      <ScrollToTopButton />
    </div>
  );
}

export default SearchResultsPage;
