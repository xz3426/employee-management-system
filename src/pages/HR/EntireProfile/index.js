import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "hooks/useAuth";
import { Button, Select, Form, Layout, Input, Avatar, List, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailById, fetchAllUsers } from "services/auth";
import { searchEmployeesAction } from "app/userSlice";

const { Content } = Layout;
const { Search } = Input;

const title = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  marginLeft: "-600px",
};

const container = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginLeft: "300px",
  marginRight: "300px",
  padding: "30px 100px",
  fontFamily: "Arial, sans-serif",
};

const test = {
  firstName: "Matt",
  midName: "W",
  lastName: "S",
  workTitle: "H1b",
  profileImageUrl:
    "https://resizing.flixster.com/vBWiDcDQTn4xMwg6Llmlcvzbwwk=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/528854_v9_bb.jpg",
  cellPhone: "77777",
  email: "123@gmail.com",
};

const EntireProfile = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(test);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserDetailById(id);
      setUser(response);
      setIsLoading(false);
    }
    // fetchData();
  }, []);

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Employee Profiles</h1>
        {!isLoading && (
          <div style={container}>
            <h2>Employee Information Detail</h2>
            <Space size="large">
              <Avatar size="large" src={user.profileImageUrl}></Avatar>
              <h3> {user.firstName + " " + user.midName + " " + user.lastName}</h3>
            </Space>

            <Space size="large">
              <p> Email: {user.email }</p>
              <p> Cell Phone Number: {user.cellPhone }</p>
              <p> Work Phone Number: {user.workPhone }</p>
            </Space>
            <p>Current Address: {user.address}</p>
            <Space size="large">
              <p> Date of Birth: {user.birth }</p>
              <p> Gender: {user.gender }</p>
            </Space>
            <Space size="large">
              <p> Visa Title: {user.workTitle }</p>
              <p> Start Date: {user.startDate }</p>
              <p> End Date: {user.endDate }</p>
            </Space>

            <h4>Emergency Contact:</h4>
            <Space size="large">
              <p> Fisrt Name: {user.birth }</p>
              <p> Mid Name: {user.gender }</p>
              <p> Last Name: {user.gender }</p>
            </Space>
            <p> Phone Number: {user.birth }</p>
            <p> Email: {user.birth }</p>
            <p> Relationship: {user.birth }</p>

          </div>
        )}
      </div>
    </Content>
  );
};

export default EntireProfile;
