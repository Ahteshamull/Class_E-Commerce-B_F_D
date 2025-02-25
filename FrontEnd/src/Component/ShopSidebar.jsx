// import React from "react";
// import { Slider } from "@material-tailwind/react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { handleError } from "../Toast";
// import axios from "axios";

// const ShopSidebar = () => {
//   const [category, setCategory] = useState([]);
//   const [allProductsState, setAllProductsState] = useState([]);
//   const [maxValue, setMaxValue] = useState();

//   const handleFilter = (e) => {
//     setMaxValue(e.target.value);

//     const filteredProducts = allProductsState.filter((item) => {
//       return item.sellingPrice >= 0 && item.sellingPrice <= maxValue;
//     });

//   };

//   const allProductsItem = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/product/allProduct"
//       );

//       setAllProductsState(response.data.allProduct);
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   useEffect(() => {
//     allProductsItem();
//   }, []);

//   const allCetagory = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/category/allCetagory"
//       );
//       setCategory(response.data.allCetagory);
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   useEffect(() => {
//     allCetagory();
//   }, []);

//   return (
//     <>
//       <div className="shadow-sm rounded-md shadow-gray-400 p-3">
//         <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
//           Category
//         </h2>
//         <ul>
//           {category.map((item) => (
//             <li
//               key={item._id}
//               className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium"
//             >
//               {item.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* price filter// */}
//       <div className="shadow-sm rounded-md shadow-gray-400 p-3 mt-4">
//         <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
//           Price Filter
//         </h2>
//         <div>
//           <label> value = {maxValue}</label>
//           <input
//             onChange={handleFilter}
//             min={0}
//             max={5000}
//             defaultValue={2000}
//             type="range"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShopSidebar;

import React, { useEffect, useState } from "react";
import { Slider } from "@material-tailwind/react";
import { handleError } from "../Toast";
import axios from "axios";

const ShopSidebar = ({ onCategorySelect, onPriceFilter }) => {
  const [category, setCategory] = useState([]);
  const [allProductsState, setAllProductsState] = useState([]);
  const [maxValue, setMaxValue] = useState(2000); // Default max value
  const [minValue, setMinValue] = useState(0); // Default min value
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle price range change
  const handleFilter = (e) => {
    const newMaxValue = e.target.value;
    setMaxValue(newMaxValue);
    onPriceFilter(minValue, newMaxValue); // Pass min and max to parent
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Pass selected category to parent
  };

  // Fetch all products
  const allProductsItem = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/allProduct"
      );
      setAllProductsState(response.data.allProduct);
    } catch (error) {
      handleError(error.message);
    }
  };

  // Fetch all categories
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
    allProductsItem();
    allCetagory();
  }, []);

  return (
    <>
      {/* Categories */}
      <div className="shadow-sm rounded-md shadow-gray-400 p-3">
        <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
          Category
        </h2>
        <ul>
          {category.map((item) => (
            <li
              key={item._id}
              onClick={() => handleCategorySelect(item)} // Select category on click
              className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="shadow-sm rounded-md shadow-gray-400 p-3 mt-4">
        <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
          Price Filter
        </h2>
        <div>
          <label>Min Price: {minValue}</label>
          <input
            onChange={(e) => setMinValue(e.target.value)} // Handle min value change
            value={minValue}
            min={0}
            max={maxValue}
            type="range"
          />
          <label>Max Price: {maxValue}</label>
          <input
            onChange={handleFilter}
            value={maxValue}
            min={minValue}
            max={5000}
            type="range"
          />
        </div>
      </div>
    </>
  );
};

export default ShopSidebar;
