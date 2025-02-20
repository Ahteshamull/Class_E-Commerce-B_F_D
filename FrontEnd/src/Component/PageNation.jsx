import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import AllItem from "./AllItem";

// Example items, to simulate fetching from another resources.


function PageNation({ itemsPerPage,allProducts }) {
  
  const items = allProducts;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <AllItem productItem={item } />
            </div>
          ))}
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        activeClassName="bg-red-500"
        containerClassName="flex gap-5 items-center mt-3"
        nextClassName="bg-primary text-md text-white px-2 py-1 select-none"
        previousClassName="bg-primary text-md text-white px-2 py-1 select-none"
        pageClassName="bg-primary text-md text-white px-2 py-1 rounded-full"
      />
    </>
  );
}
export default PageNation;
