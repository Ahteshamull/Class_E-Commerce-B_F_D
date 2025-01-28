import React from "react";
import { Slider } from "@material-tailwind/react";

const ShopSidebar = () => {
  return (
    <>
      <div className="shadow-sm rounded-md shadow-gray-400 p-3">
        <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary mb-3">
          Category
        </h2>
        <ul>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Ti-Shirt
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Shirt
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Shoes
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Sari
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Watch
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Glass
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Phone
          </li>
          <li className="font-roboto hover:text-primary cursor-pointer select-none text-lg mt-2 text-black font-medium">
            Laptop
          </li>
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
