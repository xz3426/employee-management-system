import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "hooks/useAuth";
import { Layout, Input, Avatar, List } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailById, fetchAllUsers } from "services/auth";
import { searchEmployeesAction } from "app/userSlice";

const { Content } = Layout;
const { Search } = Input;

const title = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  marginLeft: "-500px",
};

const container = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginLeft: "350px",
  marginRight: "350px",
  padding: "30px 100px",
  fontFamily: "Arial, sans-serif",
};

const test = [
  {
    firstName: "Daniel",
    midName: "",
    lastName: "Y",
    workTitle:"OPT",
    profileImageUrl:
      "https://resizing.flixster.com/vBWiDcDQTn4xMwg6Llmlcvzbwwk=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/528854_v9_bb.jpg",
    cellPhone: "123456",
    email: "123@gmail.com",
  },
  {
    firstName: "Matt",
    midName: "Will",
    lastName: "S",
    workTitle:"H1b",
    profileImageUrl:
      "https://resizing.flixster.com/vBWiDcDQTn4xMwg6Llmlcvzbwwk=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/528854_v9_bb.jpg",
    cellPhone: "77777",
    email: "123@gmail.com",
  },
  {
    firstName: "Nate",
    midName: "Tom",
    lastName: "X",
    workTitle:"F1",
    profileImageUrl:
      "https://resizing.flixster.com/vBWiDcDQTn4xMwg6Llmlcvzbwwk=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/528854_v9_bb.jpg",
    cellPhone: "17171",
    email: "123@gmail.com",
  },
];

const AllEmployeeProfiles = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(test);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllUsers();
      setUsers(response);
      setIsLoading(false);
    }
    // fetchData();
  }, []);


  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Employee Profiles</h1>
        <div style={container}>
          <h3>Employee Information List</h3>
          <p>Search an employee: </p>
          <Search
            placeholder="Search"
            allowClear
            enterButton="Search"
            size="small"
            style={{ width: "50%" }}
            onSearch={(value) => {
              dispatch(searchEmployeesAction(value));
            }}
          />
          {!isLoading && (
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(item) => (
                <List.Item onClick={() => navigate(`employee/profileDetail/${item._id}`)}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.profileImageUrl} />}
                    title={ item.firstName + " " + item.midName + " " + item.lastName }
                    description={
                      <>
                        <p>Work Authorization Title: {item.workTitle} </p>
                        <p>Phone: {item.cellPhone} </p>
                        <p>Email: {item.email} </p>
                      </>
                      
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </Content>
  );
};

export default AllEmployeeProfiles;
