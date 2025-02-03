import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const navigate = useNavigate();
    const user = Cookies.get("user");
    useEffect(() => {
        if(!user) return navigate("/login")
    },[])


  return <>{user ? <Outlet /> : navigate("/login")}</>;
};

export default ProtectedRoute;
