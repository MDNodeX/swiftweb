import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminAllowed = () => {
  const user = useSelector((state) => state.user);

  // check login first
  if (!user || !user.isLoggedIn) {
    return <Navigate to={RouteSignIn} replace />;
  }

  // check admin role
  if (user?.user?.role !== "admin") {
    return <Navigate to={RouteIndex} replace />;
  }

  return <Outlet />;
};

export default OnlyAdminAllowed;
