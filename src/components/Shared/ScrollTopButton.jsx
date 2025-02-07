import React from "react";

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className="btn btn-primary position-fixed bottom-0 end-0 m-3 to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
}

export default ScrollToTopButton;
