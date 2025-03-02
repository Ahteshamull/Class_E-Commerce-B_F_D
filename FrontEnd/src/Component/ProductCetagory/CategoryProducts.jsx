import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function CategoryProducts({ productItem }) {
  const navigate = useNavigate();
  const handleProductId = (item) => {
    navigate(`/shop/view/${item}`);
  };
  return (
    <div
      onClick={() => handleProductId(productItem._id)}
      className="bg-white  rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative"
    >
      <div className="mb-4  bg-gray-100 rounded-xl p-2">
        <img
          src={productItem.image[0]}
          alt="Product 1"
          className="w-full  rounded-xl object-contain"
        />
      </div>
      <div>
        <div className="flex gap-2">
          <h5 className="text-base font-bold text-gray-800">
            {productItem.name}
          </h5>
          <h6 className="text-base text-gray-800 font-bold ml-auto">
            {productItem.sellingPrice}$
          </h6>
        </div>
        <p className="text-gray-500 text-[13px] mt-2">
          {productItem.description}
        </p>
      </div>
    </div>
  );
}
