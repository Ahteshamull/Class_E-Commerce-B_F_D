import React, { useEffect, useState } from "react";
import Container from "../layout/Container";
import { Link } from "react-router";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { handleError, handleSuccess } from './../Toast';
import { ToastContainer } from 'react-toastify';

const ProductView = () => {
  const navigate = useNavigate()
  const [singleProduct, setSingleProduct] = useState({});
  const [productImage, setProductImage] = useState([]);
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
 const loginUserdata = useSelector((state) => state.user.value);
  // Function to fetch product details
  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/singleProduct/${id}`
      );
      setSingleProduct(response.data.singleProduct);
      setProductImage(response.data.singleProduct.image || []);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);
  const handleClick = (product) => {
    if (!loginUserdata) {
      handleSuccess("Please login first")
      setTimeout(() => {
        navigate('/login')
        
      },2000)
    } else {
      const response = axios.post(
        "http://localhost:3000/api/v1/cart/add-to-cart",
        {
          user:loginUserdata.id,
          products:product._id
         
        }
      ).then((response) => {
        console.log(response)
        handleSuccess(response.data.message || "Product Add to card success")
        setTimeout(() => {
          navigate("/card")
        }, 2000);
      }).catch((error) => {
        console.log(error)
        handleError(error.response.data.message)
      })
      
    }
}
  return (
    <div className="mt-5 mb-5">
      <Container>
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
              {/* Product Images */}
              <div className="w-full md:w-1/2 px-4 mb-8">
                {productImage.length > 0 && (
                  <img
                    src={productImage[activeImage]}
                    alt="Product"
                    className="w-full h-auto rounded-lg shadow-md mb-4"
                  />
                )}
                <div className="flex flex-wrap gap-4 py-4 justify-center overflow-x-auto">
                  {productImage.map((item, index) => (
                    <img
                      key={index}
                      onClick={() => setActiveImage(index)}
                      src={item}
                      alt="Thumbnail"
                      className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300 ${
                        activeImage === index
                          ? "opacity-100 border-2 border-indigo-500"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  {singleProduct.name || "Product Name"}
                </h2>
                <p className="text-gray-600 mb-4">
                  SKU: {singleProduct.sku || "N/A"}
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">
                    ${singleProduct.discountPrice || "0.00"}
                  </span>
                  {singleProduct.sellingPrice && (
                    <span className="text-gray-500 line-through">
                      ${singleProduct.sellingPrice}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mb-6">
                  {singleProduct.description || "No description available."}
                </p>

                

                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => handleClick(singleProduct)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                  >
                    Add to Cart
                  </button>

                  <Link to="/shop">
                    <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none">
                      Back
                    </button>
                  </Link>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {singleProduct.features?.length > 0 ? (
                      singleProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    ) : (
                      <li>No features listed.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </Container>
    </div>
  );
};

export default ProductView;
