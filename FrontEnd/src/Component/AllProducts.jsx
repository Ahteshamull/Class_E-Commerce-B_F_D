import React from "react";
import PageNation from "../Component/PageNation";
import AllItem from "./AllItem";
import { useState } from "react";
import { useEffect } from "react";
import { handleError } from "../Toast";
import axios from "axios";
import { Link } from "react-router";

const AllProducts = () => {
  const [allProductsState, setAllProductsState] = useState([]);
  const [loading, setLoading] = useState(false);

  const allProductsItem = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/allProduct"
      );

      setAllProductsState(response.data.allProduct);
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
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {allProductsState.map((item) => (
          <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <Link to={"/shop/view"}>
              <div className="w-full">
                <img
                  src={item.image[0]}
                  alt="Product 1"
                  className="w-full object-cover object-top aspect-[230/307]"
                />
              </div>
            </Link>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1">
                <h5 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2">
                  {item.name}
                </h5>
                <div className="mt-2 flex items-center flex-wrap gap-2">
                  <div className="flex gap-10 justify-between">
                    <h6 className="text-sm sm:text-base font-bold text-gray-800">
                      {item.sellingPrice}
                    </h6>
                    <h6 className=" text-sm sm:text-base font-bold text-gray-800">
                      <span>Discount Price</span> {item.discountPrice}
                    </h6>
                  </div>

                  <p>
                    <span className="text-sm sm:text-base font-bold text-gray-800">
                      Stock
                    </span>{" "}
                    {item.stock}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllProducts;
