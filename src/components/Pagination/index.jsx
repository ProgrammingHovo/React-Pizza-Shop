import React from "react";
import styles from "./Pagination.module.scss";

import ReactPaginate from "react-paginate";

function Pagination({ value, onChange }) {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChange(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={value - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
