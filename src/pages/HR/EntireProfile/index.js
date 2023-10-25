import React, { useEffect, useState } from "react";
// import useAuth from "hooks/useAuth";
import { Layout, Avatar, Space, Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { getUserById } from "services/auth";

const { Content } = Layout;

const title = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  marginLeft: "-800px",
};

const container = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginLeft: "200px",
  marginRight: "200px",
  padding: "30px 100px",
  fontFamily: "Arial, sans-serif",
};

// const test = {
//   firstName: "Matt",
//   midName: "W",
//   lastName: "S",
//   workTitle: "H1b",
//   profileImageUrl:
//     "https://resizing.flixster.com/vBWiDcDQTn4xMwg6Llmlcvzbwwk=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/528854_v9_bb.jpg",
//   cellPhone: "77777",
//   email: "123@gmail.com",
//   gender: "male",
//   address: "123",
// };

const EntireProfile = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserById(id);
      console.log(response);
      setUser(response);

      const items = [
        {
          key: "1",
          label: "Email",
          children: response.userDetail.email,
        },
        {
          key: "2",
          label: "Cell Phone Number",
          children: response.userDetail.cellPhone,
        },
        {
          key: "3",
          label: "Work Phone Number",
          children: response.userDetail.workPhone,
        },
        {
          key: "4",
          label: "Current Address",
          children: response.userDetail.address,
          span: 3,
        },
        {
          key: "5",
          label: "Gender",
          children: response.userDetail.gender,
          span: 1,
        },
        {
          key: "6",
          label: "Date of Birth",
          children: response.userDetail.birth,
          span: 2,
        },
        {
          key: "7",
          label: "Visa Title",
          children: response.userDetail.workTitle,
        },
        {
          key: "8",
          label: "Start Date",
          children: response.userDetail.startDate,
        },
        {
          key: "10",
          label: "End Date",
          children: response.userDetail.endDate,
        },
        {
          key: "10",
          label: "Emergency Contact",
          children: (
            <>
              Name:{" "}
              {response.userDetail.emergencyFirstName +
                " " +
                response.userDetail.emergencyMidName +
                " " +
                response.userDetail.emergencyLastName}
              <br />
              Phone Number: {response.userDetail.emergencyPhone}
              <br />
              Email: {response.userDetail.emergencyEmail}
              <br />
              Relationship: {response.userDetail.emergencyRelationship}
              <br />
            </>
          ),
          span: 3,
        },
        {
          key: "11",
          label: "Documents Uploaded",
          children: (
            <>
              doc1:
              <br />
              doc2:
              <br />
            </>
          ),
          span: 3,
        },
      ];

      setInfo(items);

      setIsLoading(false);
    }
    fetchData();
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
              <h3>
                {" "}
                {user.firstName + " " + user.midName + " " + user.lastName}
              </h3>
            </Space>
            <br />

            <Space size="large">
              <p> Email: {user.email}</p>
              <p> Cell Phone Number: {user.cellPhone}</p>
              <p> Work Phone Number: {user.workPhone}</p>
            </Space>
            <p>Current Address: {user.address}</p>
            <Space size="large">
              <p> Date of Birth: {user.birth}</p>
              <p> Gender: {user.gender}</p>
            </Space>
            <Space size="large">
              <p> Visa Title: {user.workTitle}</p>
              <p> Start Date: {user.startDate}</p>
              <p> End Date: {user.endDate}</p>
            </Space>

            <h4>Emergency Contact:</h4>
            <Space size="large">
              <p> Fisrt Name: {user.birth}</p>
              <p> Mid Name: {user.gender}</p>
              <p> Last Name: {user.gender}</p>
            </Space>
            <p> Phone Number: {user.birth}</p>
            <p> Email: {user.birth}</p>
            <p> Relationship: {user.birth}</p>
          </div>
        )}
      </div>
    </Content>
  );
};

export default EntireProfile;
