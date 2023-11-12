import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const buttonStyles = {
    padding: "0.5em 0.8em",
    margin: "0.2em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: currentPage === 1 ? "#007bff" : "#fff", // Highlight the current page
    color: currentPage === 1 ? "#fff" : "#007bff",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          style={buttonStyles}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
