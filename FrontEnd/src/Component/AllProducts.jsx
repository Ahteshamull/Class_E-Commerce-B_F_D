import React, { useEffect, useState } from "react";
import PageNation from "../Component/PageNation";
import { handleError } from "../Toast";
import  axios  from 'axios';


const AllProducts = () => {
const [allProducts, setAllProducts] = useState([]);


const AllProductsItem = async () => {


  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product/allProduct"
    );
    setAllProducts(response.data.allProduct);
    
  
  } catch (error) {
    console.error("Error fetching products:", error);
    handleError(error.message);
   
  }
};

useEffect(() => {
  AllProductsItem();
}, []);


  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
       
        <PageNation itemsPerPage={4} allProducts={ allProducts} />
      </div>
    </>
  );
};

export default AllProducts;
