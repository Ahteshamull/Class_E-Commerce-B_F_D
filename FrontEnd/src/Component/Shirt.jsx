import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError } from "../Toast";
import { Link } from 'react-router';


const Shirt = () => {
  const [category, setCategory] = useState([]);

  const allCetagory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/category/allCetagory"
      );
      setCategory(response.data.allCetagory);
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    allCetagory();
  }, []);

  return (
    <Link >
      <div className="font-sans bg-gray-50 px-4 py-8">
        <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {category.map((item) => (
              <div
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
                  <h4 className="text-sm text-blue-600 font-bold mt-2">
                    {item.description}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
    </Link>
  );
};

export default Shirt;
