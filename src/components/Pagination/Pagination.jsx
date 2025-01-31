import React from "react";

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentPage(idx + 1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded hover:bg-gray-300`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
