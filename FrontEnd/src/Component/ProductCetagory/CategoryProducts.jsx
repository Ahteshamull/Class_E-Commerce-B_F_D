import axios from "axios";
import React, { useEffect, useState } from "react";


export default function CategoryProducts({ productItem }) {
  
 

  const navigate = useNavigate();
  const handleProductId = (item) => {
    navigate(`/shop/view/${item}`);
  };
  return (
    <div>
      {category.map((item) => (
        <div
          onClick={() => handleProductId(item._id)}
          className="antialiased cursor-pointer flex items-center justify-between text-gray-900"
        >
          <div className=" p-8 flex items-center justify-center">
            <div className=" rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">
              {/* Image Section */}
              <img
                className="h-48 w-full object-cover object-end"
                src={item.image[0]}
                alt="Home in Countryside"
              />
              <div className="p-6">
                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                  {item.name}
                </h4>
                <p className="mt-2 font-normal text-sm ">{item.description}</p>

                {/* Price */}
                <div className="mt-1 flex items-center gap-5">
                  <span>BDT: {item.discountPrice}</span>
                  <span className="text-gray-600 text-sm line-through">
                    {item.sellingPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
