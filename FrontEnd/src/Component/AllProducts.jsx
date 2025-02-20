import React, { useEffect, useState } from "react";
import PageNation from "../Component/PageNation";
import { handleError } from "../Toast";
import axios from "axios";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const AllProductsItem = async () => {

    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/allProduct"
      );
    
      setAllProducts(response.data.allProduct);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      handleError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    AllProductsItem();
  }, []);

  const LoadingState = () => {
    return (
      <>
        {Array.from({ length: 4 }).map((_, item) => {
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

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading ? (
          <LoadingState />
        ) : (
          <PageNation itemsPerPage={4} allProducts={allProducts} />
        )}
      </div>
    </>
  );
};

export default AllProducts;
