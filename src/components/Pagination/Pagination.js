import React from 'react';
import styles from "./pagination.module.css"

const Pagination = ({ page, total, limit, handlePagination }) => {

  const totalPages = Math.ceil(total/limit)

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button className={page === i ? styles.active : ''} onClick={() => handlePagination(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <ul>
        {page > 1 && (
          <li>
            <button  onClick={() => handlePagination(page - 1)}>Previous</button>
          </li>
        )}
        {renderPageNumbers()}
        {page < totalPages && (
          <li>
            <button onClick={() => handlePagination(page + 1)}> Next </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
