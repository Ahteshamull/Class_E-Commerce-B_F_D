import React from 'react'
import { Link } from 'react-router';



const AllItem = ({ productItem} ) => {

  return (
    <Link to={"/shop/:view"}>
      <div className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
        <div className="mb-4 bg-gray-100 rounded p-2">
          <img
            src={productItem.image}
            alt="Product 1"
            className="aspect-[33/35] w-full object-contain"
          />
        </div>
        <div>
          <div className="flex gap-2">
            <h5 className="text-base font-bold text-gray-800">{ productItem.name}</h5>
            <h6 className="text-base text-gray-800 font-bold ml-auto">{ productItem.sellingPrice }$</h6>
          </div>
          <p className="text-gray-500 text-[13px] mt-2">
           {productItem.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AllItem