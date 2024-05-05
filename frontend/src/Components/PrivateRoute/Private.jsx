import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = () => {
  const { UserInfo } = useSelector((state) => state.auth);
  return UserInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Private;
