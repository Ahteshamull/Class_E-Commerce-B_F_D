import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../../layout/Container";

export default function CategoryProducts() {
  const [products, setProducts] = useState([]); // State for products from the category
  const navigate = useNavigate();
  const { id } = useParams(); // Use id from URL params to fetch products

  // Handle product click
  const handleProductId = (item) => {
    navigate(`/shop/view/${item}`);
  };

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
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductId(product._id)}
            className="bg-white rounded-lg p-4 cursor-pointer hover:-translate-y-1 transition-all relative"
          >
            <div className="mb-4 bg-gray-100 rounded-xl p-2">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl object-contain"
              />
            </div>
            <div>
              <div className="flex gap-2 justify-between">
                <h5 className="text-base font-bold text-gray-800">
                  {product.name}
                </h5>
                <h6 className="text-base text-gray-800 font-bold">
                  {product.sellingPrice}$
                </h6>
              </div>
              <p className="text-gray-500 text-sm mt-2 truncate">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
