import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./components/layout/RootLayout";
import AddProduct from "./pages/AddProduct";

import AddCetagory from "./pages/AddCetagory";
import AllCetagory from "./pages/AllCetagory";
import AddStore from "./pages/AddStore";
import AllStore from "./pages/AllStore";
import { AllProducts } from "./pages/AllProducts";
import OTPVerification from "./pages/OTPVerification";
import ProtectedRoute from "./components/layout/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route element={<ProtectedRoute/>}>


          <Route index element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/add-cetagory" element={<AddCetagory />} />
          <Route path="/all-cetagory" element={<AllCetagory />} />
          <Route path="/add-store" element={<AddStore/>} />
          <Route path="/all-stores" element={<AllStore />} />

          </Route>
        </Route>
        <Route path="/otp-verify" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
