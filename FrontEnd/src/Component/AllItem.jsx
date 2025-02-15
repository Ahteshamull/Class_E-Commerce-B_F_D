import React from 'react'

const AllItem = (productItem) => {
  return (
    <div>
      {" "}
      <div className="font-sans bg-gray-50 px-4 py-8">
        <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
           
            <div className="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div className="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/product14.webp"
                  alt="product2"
                  className="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-sm font-bold text-gray-800">
                  Echo Elegance
                </h3>
                <h4 className="text-sm text-blue-600 font-bold mt-2">$20.00</h4>
              </div>
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllItem