import HiringManagement from "pages/HR/HiringManagement";
import { Navigate } from "react-router-dom";
import { Layout } from "antd";
import React, { useMemo } from "react";
import Employee from "pages/Employee";
import jwt_decode from "jwt-decode";

const { Content } = Layout;

const MyContent_ = () => {
  const token = useMemo(() => localStorage.getItem("token"), []);
  if (!token) {
    return <Navigate to="/error" />;
  }
  const authorization = jwt_decode(token).authorization;

  return (
    <Content
      style={{
        padding: "0 50px",
        minHeight: "90vh",
        backgroundColor: "lightgrey",
      }}
    >
      {authorization === "hr" ? <HiringManagement /> : <Employee />}
    </Content>
  );
};

export default MyContent_;
