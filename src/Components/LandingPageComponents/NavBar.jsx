import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Input, Badge, Avatar, Button, Popover, List } from "antd";
import { logOutUser } from "app/userSlice";
import useAuth from "hooks/useAuth";
const { Header } = Layout;
const { Search } = Input;

const NavBar_ = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOutUser());
  };
  const { authorization } = useAuth();

  return (
    <div className="nav-bar">
      <Header
        style={{
          display: "flex",
          position: "fixed",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "-50px",
          zIndex: "1000",
        }}
      >
        <div>
          <Link to="/">
            <h2>Human Resources Chuwa</h2>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {authorization === "hr" && (
            <div style={{ display: "flex", padding: "20px" }}>
              <Link>
                <h2>HR1 </h2>
              </Link>
              <Link>
                <h2>HR2 </h2>
              </Link>
            </div>
          )}

          {authorization === "regular" && (
            <div style={{ display: "flex", padding: "20px" }}>
              <Link>
                <h2> My Information </h2>
              </Link>
              <Link>
                <h2> Visa Status </h2>
              </Link>
            </div>
          )}

          <Badge>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
          {authorization ? (
            <Link to="/SignIn" onClick={signOut}>
              SignOut
            </Link>
          ) : (
            <Link to="/SignIn">SignIn</Link>
          )}
        </div>
      </Header>
    </div>
  );
};

export default NavBar_;
