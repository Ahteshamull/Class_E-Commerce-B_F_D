import React from "react";
import PageNation from "../Component/PageNation";
import AllItem from "./AllItem";
import { useState } from "react";
import { useEffect } from "react";
import { handleError } from "../Toast";
import  axios  from 'axios';

const AllProducts = () => {
  const [allProductsState, setAllProductsState] = useState([]);
  const [loading, setLoading] = useState(false);

  const allProductsItem = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/allProduct"
      );
      setAllProductsState(response.data.allProducts);
      console.log(response.data.allProducts);
      setLoading(false);
    } catch (error) {
      handleError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    allProductsItem();
  }, []);
  const LoadingState = () => {
    return (
      <>
        {Array.from({ length: 6 }).map((_, item) => {
          return (
            <div
              key={item}
              className="max-w-sm w-full p-4 bg-white shadow-md rounded-lg border"
            >
              {/* Skeleton Image */}
              <div className="animate-pulse mb-4">
                <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto"></div>
              </div>

              {/* Skeleton Text */}
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return <> <PageNation allProducts={allProductsState} itemsPerPage={1} /></>;
};

export default AllProducts;
