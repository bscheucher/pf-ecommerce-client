import React from "react";
import { Link } from "react-router-dom";

function Hero2() {
  return (
    <div className="hero-container row mt-2 p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
          Discover Your Next Favorite Product
        </h1>
        <p className="lead">
          Browse through our exclusive collection of top-rated products and get
          amazing deals today.
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <Link
            to="/products"
            className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
