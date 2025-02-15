import React from "react";
import { Slider } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import { handleError } from "../Toast";
import  axios  from 'axios';

const ShopSidebar = () => {
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
    <>
      <div className="shadow-sm rounded-md shadow-gray-400 p-3">
        <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
          Category
        </h2>
        <ul>
          {
            category.map((item) => (
              <li
                key={item._id}
                className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium"
              >
                {item.name}
              </li>
        
    ))
          }
        </ul>
        
      </div>
      {/* price filter// */}
      <div className="shadow-sm rounded-md shadow-gray-400 p-3 mt-4">
        <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
          Price Filter
        </h2>
        <div className="flex  flex-col gap-8">
          <Slider color="teal" defaultValue={50} />
        </div>
      </div>
    </>
  );
};

export default ShopSidebar;
