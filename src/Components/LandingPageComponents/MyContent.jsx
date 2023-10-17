import HR from "pages/HR";
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
  // const [authorization] =  useAuth();

  return (
    <Content
      style={{
        padding: "0 50px",
        minHeight: "90vh",
        backgroundColor: "lightgrey",
      }}
    >
      {authorization === "hr" ? <HR /> : <Employee />}
    </Content>
  );
};

export default MyContent_;
