import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Container from "../../layout/Container";

export default function CategoryProducts({ productItem }) {
  const navigate = useNavigate();

  const handleProductId = (item) => {
    navigate(`/shop/view/${item}`);
  };

  return (
    <Container>
    <div className="">
      <div
        onClick={() => handleProductId(productItem._id)}
        className="bg-white rounded-lg p-4 cursor-pointer  hover:-translate-y-1 transition-all relative"
      >
        <div className="mb-4 bg-gray-100 rounded-xl p-2">
          <img
            src={productItem.image[0]}
            alt="Product 1"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl object-contain"
          />
        </div>
        <div>
          <div className="flex gap-2 justify-between">
            <h5 className="text-base font-bold text-gray-800">
              {productItem.name}
            </h5>
            <h6 className="text-base text-gray-800 font-bold">
              {productItem.sellingPrice}$
            </h6>
          </div>
          <p className="text-gray-500 text-sm mt-2 truncate">
            {productItem.description}
          </p>
        </div>
      </div>
      </div>
    </Container>
  );
}
