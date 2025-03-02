import React from "react";

const CategoryProducts = ({ productItem }) => {
  return (
    <div>
      <div className="font-[sans-serif] p-4 mx-auto lg:max-w-5xl sm:max-w-2xl max-w-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Iterate through the productItem array */}
          {productItem.map((product) => (
            <div
              className="bg-white overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 relative"
              key={product.id}
            >
              <div className="w-full p-4">
                <img
                  src={product.image[0]} // Assuming product.image is an array of images
                  alt={product.title} // Use dynamic title for alt
                  className="aspect-[8/6] w-full object-contain"
                />
              </div>
              <div className="p-6">
                <hr className="border mb-6" />
                <div>
                  {/* Display dynamic product title */}
                  <h4 className="text-sm text-gray-800 leading-relaxed">
                    {product.title}
                  </h4>
                  {/* Display dynamic product price */}
                  <h4 className="text-base text-gray-800 font-bold mt-4">
                    ${product.price}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
