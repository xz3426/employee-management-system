import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Layout, Input, Avatar, List } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllUsers, searchUsers } from"services/hrwork";

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



const AllEmployeeProfiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllUsers();
      console.log(response);
      setUsers(response);
      setIsLoading(false);
      console.log(users);
    }
    fetchData();
  }, []);


  async function onSearch(value){
    const response = await searchUsers(value);
    setUsers(response);
  }


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
            onSearch={(value) => onSearch(value)}
          />
          {!isLoading && (
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(item) => (
                <List.Item onClick={() => navigate(`profileDetail/${item._id}`)}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.userDetail.profileImage} />}
                    title={ item.userDetail.firstName + " " + (item.userDetail.midName? item.userDetail.midName : "") + " " + item.userDetail.lastName }
                    description={
                      <>
                        <p>Work Authorization Title: {item.userDetail.workTitle} </p>
                        <p>Phone: {item.userDetail.cellPhone} </p>
                        <p>Email: {item.userDetail.email} </p>
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
