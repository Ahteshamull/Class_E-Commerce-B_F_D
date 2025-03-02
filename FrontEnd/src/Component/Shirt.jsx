import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError } from "../Toast";
import { Link, useNavigate } from "react-router";

const Shirt = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const allCetagory = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/category/allCetagory"
      );
      setCategory(response.data.allCetagory);
      setLoading(false);
    } catch (error) {
      handleError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    allCetagory();
  }, []);



  const handleCetagoryProduct = (product) => {
   navigate(`/single/category/${product}`);
  }
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
    <Link>
      <div className="font-sans bg-gray-50 px-4 py-8">
        <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading ? (
              <LoadingState />
            ) : (
              category.map((item) => (
                <div onClick={()=>handleCetagoryProduct(item._id)}
                  key={item.id} // Make sure to add a unique key
                  className="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all"
                >
                  <div className="w-full overflow-hidden mx-auto">
                    <img
                      src={item.image}
                      alt="product1"
                      className="aspect-[108/82] w-full object-contain"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-sm font-bold text-gray-800">
                      {item.name}
                    </h3>
                   
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </Link>
  );
};

export default Shirt;
