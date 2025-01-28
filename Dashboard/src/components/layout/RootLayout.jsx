import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

        <Outlet />
   
    </div>
  );
};

export default RootLayout;
