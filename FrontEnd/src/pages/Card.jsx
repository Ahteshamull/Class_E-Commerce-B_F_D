import React, { useEffect, useState, useMemo } from "react";
import Container from "../layout/Container";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleError, handleSuccess } from "../Toast";
import { ToastContainer } from "react-toastify";

const Card = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const loginUserdata = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!loginUserdata) {
      navigate("/login");
      return;
    }
    if (loginUserdata?.id) {
      fetchProducts();
    }
  }, [loginUserdata?.id]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/cart/single-cart/${loginUserdata.id}`
      );
      setProducts(response.data.singleCart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleRemoveCart = async (product) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cart/deleteCartProduct/${product._id}`
      );
      handleSuccess(response.data.message);
      fetchProducts();
    } catch (error) {
      handleError("Error removing from cart:", error);
    }
  };

  const handleProductDecrement = async (product) => {
    if (product.quantity > 1) {
      try {
        await axios.patch(
          `http://localhost:3000/api/v1/cart/decrementCart/${product._id}`
        );
        fetchProducts();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleProductIncrement = async (product) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/cart/incrementCart/${product._id}`
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const { subtotal, totalDiscount, grandTotal } = useMemo(() => {
    let subtotal = products.reduce(
      (acc, product) => acc + product.products.discountPrice * product.quantity,
      0
    );

    let totalDiscount = products.reduce(
      (acc, product) =>
        acc +
        (product.products.sellingPrice - product.products.discountPrice) *
          product.quantity,
      0
    );

  
    let grandTotal = subtotal 

    return { subtotal, totalDiscount, grandTotal };
  }, [products]);

  return (
    <div>
      <Container>
        <div className="font-roboto md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4 mt-10 mb-10">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Cart Items Section */}
            <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
              <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
              <hr className="border-gray-300 mt-4 mb-8" />
              <div className="space-y-4">
                {products?.map((product) => (
                  <div
                    key={product._id}
                    className="grid grid-cols-3 items-center gap-4"
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                        <img
                          src={product?.products.image[0]}
                          className="w-full h-full object-contain"
                          alt={product.products.name}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-800">
                          {product.products.name}
                        </h3>
                        <h6
                          onClick={() => handleRemoveCart(product)}
                          className="text-xs text-red-500 cursor-pointer mt-0.5"
                        >
                          Remove
                        </h6>
                        <div className="flex gap-4 mt-4">
                          <button
                            type="button"
                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                          >
                            <svg
                              onClick={() => handleProductDecrement(product)}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                            </svg>
                            <span className="mx-2.5">{product.quantity}</span>
                            <svg
                              onClick={() => handleProductIncrement(product)}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 fill-current"
                              viewBox="0 0 42 42"
                            >
                              <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <h4 className="text-base font-bold text-gray-800">
                        ${product?.products.discountPrice}
                      </h4>
                      <h6 className="text-xs text-gray-600 line-through">
                        ${product.products.sellingPrice}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
              <ul className="text-gray-800 mt-8 space-y-4">
                <li className="flex flex-wrap gap-4 text-base">
                  Subtotal{" "}
                  <span className="ml-auto font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 text-base">
                  Discount{" "}
                  <span className="ml-auto font-bold">
                    -${totalDiscount.toFixed(2)}
                  </span>
                </li>
               
                <li className="flex flex-wrap gap-4 text-base font-bold">
                  Total{" "}
                  <span className="ml-auto">${grandTotal.toFixed(2)}</span>
                </li>
              </ul>
              <div className="mt-8 space-y-2 ">
                <Link to={"/checkout"}>
                  <button className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    Checkout
                  </button>
                </Link>
                <Link to={"/shop"}>
                  <button className="text-sm px-4 mt-5 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Card;
