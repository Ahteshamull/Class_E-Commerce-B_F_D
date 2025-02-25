// import React, { useEffect, useState } from "react";
// import Container from "../layout/Container";
// import ShopSidebar from "./../Component/ShopSidebar";
// import AllProducts from "./../Component/AllProducts";
// import { FaFilter } from "react-icons/fa";
// import { AiFillCloseSquare } from "react-icons/ai";
// import { useSelector } from 'react-redux';

// const Shop = () => {
//   const [filterModal, setFilterModal] = useState(true);
//   const cetagory = useSelector((state) => state.cetagory) 
//   const product = useSelector((state) => state.product) 
//   console.log(cetagory)
//   useEffect(() => {
//     function resizeScreen() {
//       if (window.innerWidth < 1024) {
//         setFilterModal(false);
//       } else {
//         setFilterModal(true);
//       }
//     }
//     resizeScreen();
//     window.addEventListener("resize", resizeScreen);
//   }, []);
 
//   return (
//     <section className="mt-10 mb-10">
//       <Container>
//         <FaFilter
//           onClick={() => setFilterModal(!filterModal)}
//           size={20}
//           className="lg:hidden text-primary ml-auto mb-2 cursor-pointer select-none"
//         />
//         <div className="grid grid-cols-12 gap-5">
//           {filterModal && (
//             <div className="lg:col-span-3 lg:static fixed z-50 lg:w-auto w-full left-0 top-[140px] bg-white col-span-12">
//               <AiFillCloseSquare
//                 onClick={() => setFilterModal(false)}
//                 size={40}
//                 className="lg:hidden text-primary ml-auto mb-2 cursor-pointer select-none"
//               />
//               <ShopSidebar />
//             </div>
//           )}

//           <div className=" col-span-12 lg:col-span-9">
//          <AllProducts />
            
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Shop;

import React, { useEffect, useState } from "react";
import Container from "../layout/Container";
import ShopSidebar from "./../Component/ShopSidebar";
import AllProducts from "./../Component/AllProducts";
import { FaFilter } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";

const Shop = () => {
  const [filterModal, setFilterModal] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [selectedCategory, setSelectedCategory] = useState(null); // Store selected category
  const categories = useSelector((state) => state.cetagory); // Assuming categories are in the Redux state
  const product = useSelector((state) => state.product); // Products

  // This function will handle the price range change
  const handlePriceChange = (event) => {
    const { value, name } = event.target;
    setPriceRange((prevRange) => {
      if (name === "min") {
        return [value, prevRange[1]];
      } else if (name === "max") {
        return [prevRange[0], value];
      }
    });
  };

  // This function will handle the category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Effect to adjust the filter modal based on screen size
  useEffect(() => {
    function resizeScreen() {
      if (window.innerWidth < 1024) {
        setFilterModal(false);
      } else {
        setFilterModal(true);
      }
    }
    resizeScreen();
    window.addEventListener("resize", resizeScreen);
  }, []);

  return (
    <section className="mt-10 mb-10">
      <Container>
        <FaFilter
          onClick={() => setFilterModal(!filterModal)}
          size={20}
          className="lg:hidden text-primary ml-auto mb-2 cursor-pointer select-none"
        />
        <div className="grid grid-cols-12 gap-5">
          {filterModal && (
            <div className="lg:col-span-3 lg:static fixed z-50 lg:w-auto w-full left-0 top-[140px] bg-white col-span-12">
              <AiFillCloseSquare
                onClick={() => setFilterModal(false)}
                size={40}
                className="lg:hidden text-primary ml-auto mb-2 cursor-pointer select-none"
              />
              <ShopSidebar
                categories={categories}
                onCategorySelect={handleCategoryChange} // Pass function to handle category selection
              />
              {/* Price Range Filter UI */}
              <div className="price-range-filter">
                <label>
                  Min Price:
                  <input
                    type="number"
                    name="min"
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    className="border p-2"
                  />
                </label>
                <label>
                  Max Price:
                  <input
                    type="number"
                    name="max"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="border p-2"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="col-span-12 lg:col-span-9">
            {/* Pass the price range and selected category to AllProducts */}
            <AllProducts
              priceRange={priceRange}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Shop;
