import React, { useEffect, useState } from "react";
import Container from "../layout/Container";
import ShopSidebar from "./../Component/ShopSidebar";
import AllProducts from "./../Component/AllProducts";
import { FaFilter } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";

const Shop = () => {
  const [filterModal, setFilterModal] = useState(true);
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
              <ShopSidebar />
            </div>
          )}

          <div className=" col-span-12 lg:col-span-9">
            <AllProducts />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Shop;
