import React, { useEffect, useState } from 'react'
import Container from '../layout/Container';
import { Link } from 'react-router';
import axios from 'axios';
import { useParams } from 'react-router';

const ProductView = () => {

  const [singleProduct, setSingleProduct] = useState({})
  const [productImage, setProductImage] = useState([])
  const { id } = useParams();
  const SingleProduct = () => {
    const response = axios.get(
      `http://localhost:3000/api/v1/product/singleProduct/${id}`
    ).then((response) => {
      setSingleProduct(response.data.singleProduct);
      setProductImage(response.data.singleProduct.image)
    }).catch((error)=> {
  console.log(error)
    })
}
  useEffect(() => {
  SingleProduct()
},[])

  return (
    <div className="mt-5 mb-5">
      <Container>
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
              {/* Product Images */}
              <div className="w-full md:w-1/2 px-4 mb-8">
                <img
                  src={productImage[0]}
                  alt="Product"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  id="mainImage"
                />
                  <div className="flex flex-col-6 gap-4 py-4 justify-center overflow-x-auto">
                {productImage.map((item) => (
                    
                      <img
                        src={item}
                        alt="Thumbnail 4"
                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        onclick="changeImage(this.src)"
                      />
                  
                    ))}
                  </div>
              </div>
              {/* Product Details */}
              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  Premium Wireless Headphones
                </h2>
                <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">$349.99</span>
                  <span className="text-gray-500 line-through">$399.99</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
                </div>
                <p className="text-gray-700 mb-6">
                  Experience premium sound quality and industry-leading noise
                  cancellation with these wireless headphones. Perfect for music
                  lovers and frequent travelers.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Color:</h3>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" />
                    <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
                    <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={1}
                    defaultValue={1}
                    className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div className="flex space-x-4  mb-6">
                  <Link to={"/card"}>
                    <button
                      onClick={() => handleClick(productItem)}
                      className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </Link>
                  <Link to={"/shop"}>
                    <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      Back
                    </button>
                  </Link>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Industry-leading noise cancellation</li>
                    <li>30-hour battery life</li>
                    <li>Touch sensor controls</li>
                    <li>Speak-to-chat technology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductView