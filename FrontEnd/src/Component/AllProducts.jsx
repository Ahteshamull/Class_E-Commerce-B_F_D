import React from "react";
import PageNation from "../Component/PageNation";
import AllItem from "./AllItem";


const AllProducts = () => {



  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
       
        <PageNation itemsPerPage={4}/>
      </div>
    </>
  );
};

export default AllProducts;
