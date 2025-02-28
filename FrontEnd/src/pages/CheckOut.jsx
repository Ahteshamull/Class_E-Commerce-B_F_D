import React, { useEffect, useMemo, useState } from "react";
import Container from "../layout/Container";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Toast";

const CheckOut = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [payment, setPayment] = useState("Cash On Delivery"); // Default to "Cash On Delivery"
  const loginUserdata = useSelector((state) => state.user.value);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    paymentMethod: payment,
  });

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

  const { grandTotal } = useMemo(() => {
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

    let grandTotal = subtotal;

    return { subtotal, totalDiscount, grandTotal };
  }, [products]);

  const handlePayment = (e) => {
    setPayment(e.target.value);
    setData((prevData) => ({
      ...prevData,
      paymentMethod: e.target.value,
    }));
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productItem = products.map((item) => {
      return {
        productId: item.products._id,
        quantity: item.quantity,
      };
    });

    try {
      const response = await axios
        .post("http://localhost:3000/api/v1/order/user-order", {
          ...data,
          user: loginUserdata.id,
          cartItems: productItem,
          totalPrice: grandTotal.toFixed(2),
        })
        .then((response) => {
          if (response.data.Order.paymentMethod == "Cash On Delivery") {
            handleSuccess(response.data.message);
            setTimeout(() => {
              navigate("/welcome");
            }, 2000);
          } else if (paymentMethod == "Online Payment") {
            
            window.location.href = response.data;
          }
        });
    } catch (error) {
    console.log(error)
      handleError("Order Failed :" || error.message);
    }
  };



  return (
    <div className="mt-10 mb-10">
      <Container>
        <div className="font-roboto bg-white">
          <div className="max-lg:max-w-xl mx-auto w-full">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Order Summary Section */}
              <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
                <div className="relative h-full">
                  <div className="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                    <h2 className="text-xl font-bold text-gray-800">
                      Order Summary
                    </h2>
                    <div className="space-y-6 mt-8">
                      {products?.map((item) => (
                        <div className="flex gap-4" key={item.id}>
                          <div className="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                            <img
                              src={item.products.image[0]}
                              className="w-full object-contain"
                              alt={item.products.name}
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm text-gray-800 font-bold">
                              Name: {item.products.name}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-1 mt-2">
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">{item.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price
                                <span className="ml-auto">
                                  ${item.products.discountPrice * item.quantity}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                    <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">
                      Total{" "}
                      <span className="ml-auto">${grandTotal.toFixed(2)}</span>
                    </h4>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment Section */}
              <div className="lg:col-span-2 max-lg:order-first p-6 !pr-0 max-w-4xl mx-auto w-full">
                <div className="text-center max-lg:hidden">
                  <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">
                    Checkout
                  </h2>
                </div>
                <form className="lg:mt-16" onSubmit={handleSubmit}>
                  {/* Shipping Info Section */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Shipping info
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-8 mt-8">
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Address"
                          value={data.address}
                          onChange={(e) =>
                            setData({ ...data, address: e.target.value })
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="City"
                          value={data.city}
                          onChange={(e) =>
                            setData({ ...data, city: e.target.value })
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Phone"
                          value={data.phone}
                          onChange={(e) =>
                            setData({ ...data, phone: e.target.value })
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Postal code"
                          value={data.postal}
                          onChange={(e) =>
                            setData({ ...data, postal: e.target.value })
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Section */}
                  <div className="mt-16">
                    <h2 className="text-xl font-bold text-gray-800">
                      Payment method
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="CashOnDelivery"
                          name="payment-method"
                          className="w-5 h-5 cursor-pointer"
                          value="Cash On Delivery"
                          onChange={handlePayment}
                          checked={payment === "Cash On Delivery"}
                        />
                        <label
                          htmlFor="CashOnDelivery"
                          className="ml-4 cursor-pointer"
                        >
                          Cash On Delivery
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="OnlinePayment"
                          name="payment-method"
                          className="w-5 h-5 cursor-pointer"
                          value="Online Payment"
                          onChange={handlePayment}
                          checked={payment === "Online Payment"}
                        />
                        <label
                          htmlFor="OnlinePayment"
                          className="ml-4 cursor-pointer"
                        >
                          Online Payment
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 max-md:flex-col mt-8">
                    <Link to={"/card"}>
                      <button
                        type="button"
                        className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                      >
                        Back
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Payment Now ${grandTotal.toFixed(2)}
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckOut;
