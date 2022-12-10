import React from "react";
import styles from "./Pagination.module.scss";

import ReactPaginate from "react-paginate";

type PaginationProps = { value: number; onChange: (page: number) => void };

const Pagination: React.FC<PaginationProps> = ({ value, onChange }) => {
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
      />
    </>
  );
};

export default Pagination;
