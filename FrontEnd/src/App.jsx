import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Card from "./pages/Card";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Shop from "./pages/Shop";
import ProductView from "./pages/ProductView";
import ForgetPass from "./pages/ForgetPass";
import CheckOut from "./pages/CheckOut";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/card" element={<Card />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/shop/view/:id" element={<ProductView />}></Route>
          <Route path="/password" element={<ForgetPass />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
