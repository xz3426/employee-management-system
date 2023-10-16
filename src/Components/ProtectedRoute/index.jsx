import { Routes, Route, Link, Navigate } from "react-router-dom";
import React, { useMemo } from "react";
import jwt_decode from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = useMemo(() => localStorage.getItem("token"), []);

  // const { user } = useSelector(state => state.user);
  const user = jwt_decode(token);

  console.log(user);

  if (user.authorization !== "admin") {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
}
