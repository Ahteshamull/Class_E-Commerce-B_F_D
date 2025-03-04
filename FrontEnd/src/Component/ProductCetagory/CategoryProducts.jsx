import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../../layout/Container";

export default function CategoryProducts() {
  const [products, setProducts] = useState([]); // State for products from the category
  const navigate = useNavigate();
  const { id } = useParams(); // Use id from URL params to fetch products

  // Handle product click
 

  // Fetch products when the component mounts
  useEffect(() => {
    // Make sure you are properly constructing the URL with category ID
    axios
      .get(`http://localhost:3000/api/v1/category/singleCetagory/${id}`)
      .then((response) => {
        setProducts(response.data.singleCetagory.products); // Assuming response contains 'products'
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, [id]);

  return (
    
  );
}
