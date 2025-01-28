// import React from "react";
// import Images from "../layout/Images";

// const Shirt = () => {
//   const category = [
//     {
//       name: "T-Shirts",
//       image: "https://readymadeui.com/images/product1.webp",
//     },
//     {
//       name: "Shirts",
//       image:
//         "https://img.drz.lazcdn.com/static/bd/p/6f21695360a0e06db002b7a6738d1a27.jpg_720x720q80.jpg_.webp",
//     },
//     {
//       name: "Pants",
//       image:
//         "https://img.drz.lazcdn.com/static/bd/p/d48b7ee96cfceb44506846aa8548f06c.jpg_720x720q80.jpg_.webp",
//     },

//     {
//       name: "Books",
//       image:
//         "https://img.drz.lazcdn.com/g/kf/S9e5a30b06ad846d4add25e65717bc488v.jpg_720x720q80.jpg_.webp",
//     },
//   ];
//   return (
//     <>
//       <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
//         {category.map((item, index) => (
//           <div className="lg:w-[300px] text-center rounded-sm border border-gray-400 p-2">
//             <Images
//               className="w-full  lg:h-[300px] object-contain"
//               src={item.image}
//               alt={item.name}
//             />
//             <h2 className="font-roboto text-lg mt-1 text-primary">
//               {item.name}
//             </h2>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Shirt;
import React from 'react'

const Shirt = () => {
  return (
    <div>
      <div class="font-sans bg-gray-50 px-4 py-8">
        <div class="mx-auto lg:max-w-6xl md:max-w-4xl">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/watch1.webp"
                  alt="product1"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">French Timex</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$95.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/product14.webp"
                  alt="product2"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">Echo Elegance</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$20.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/laptop4.webp"
                  alt="product3"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">Acer One 14 AMD</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$400.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/watch4.webp"
                  alt="product4"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">
                  Irish Cream Dream
                </h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$11.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/coffee7.webp"
                  alt="product5"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">
                  Luxury desk clock
                </h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$90.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/watch7.webp"
                  alt="product6"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">Smart Watch</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$110.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/watch8.webp"
                  alt="product7"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">
                  Creative Wall Clock
                </h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$50.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/laptop2.webp"
                  alt="product8"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">
                  ASUS Vivobook 15
                </h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$450.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/watch3.webp"
                  alt="product1"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">French Timex</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$95.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/product14.webp"
                  alt="product2"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">Echo Elegance</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$20.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/laptop4.webp"
                  alt="product3"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">Acer One 14 AMD</h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$400.00</h4>
              </div>
            </div>

            <div class="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
              <div class="w-full overflow-hidden mx-auto">
                <img
                  src="https://readymadeui.com/images/watch5.webp"
                  alt="product4"
                  class="aspect-[108/82] w-full object-contain"
                />
              </div>
              <div class="text-center mt-4">
                <h3 class="text-sm font-bold text-gray-800">
                  Irish Cream Dream
                </h3>
                <h4 class="text-sm text-blue-600 font-bold mt-2">$11.00</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shirt
