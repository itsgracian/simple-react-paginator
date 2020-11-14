import React from "react";
import { Pagination } from "@material-ui/lab";

interface Props {
  totalItems: number;
  itemPerPage: number;
  setCurrentPage: (data: {currentPage: number; limit: number; offset: number}) => void;
  currentPage: number;
  pageRangeDisplayed: number;
}
const PaginationComponent = (props: Props) => {
  const { totalItems, setCurrentPage, currentPage, itemPerPage } = props;

  const count = totalItems/itemPerPage;

  return (
    <>
      <div>
        <Pagination
          count={Number(count.toFixed())}
          color="primary"
          onChange={(val, pageNumber) => {
            const limit = itemPerPage * pageNumber;
            const offset = limit - itemPerPage;
            setCurrentPage({currentPage: pageNumber, limit, offset})
          }}
          defaultPage={currentPage}
          shape="rounded"
        />
      </div>
    </>
  );
};

export default PaginationComponent;
