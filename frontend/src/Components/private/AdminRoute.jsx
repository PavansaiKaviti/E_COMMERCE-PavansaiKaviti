import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = () => {
  const { UserInfo } = useSelector((state) => state.auth);
  return UserInfo.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
