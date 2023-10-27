import React, { useEffect, useState } from "react";
// import useAuth from "hooks/useAuth";
import { Layout, Avatar, Space, Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { getUserById } from "services/auth";
// import { BACKEND_URI } from "@/consts";

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

      function formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
        const day = date.getDate();
        return `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
      }

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
          children: formatDate(new Date(response.userDetail.birth)),
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
          children: formatDate(new Date(response.userDetail.startDate)),
        },
        {
          key: "10",
          label: "End Date",
          children: formatDate(new Date(response.userDetail.endDate)),
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
              Phone Number: {response.userDetail.emergencyCellPhone}
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
          children: response.userDetail.workTitle === "F1" && (
            <>
              {response.optRecipt.status === "never" ? null : (
                <a
                  href={`http://localhost:8080/api/files/${response._id}/optRecipt`}
                  target="_blank"
                >
                  OPT Recipt: {response.optRecipt.file.originalName}
                </a>
              )}
              <br />
              {response.optEAD.status === "never" ? null : (
                <a
                  href={`http://localhost:8080/api/files/${response._id}/optEAD`}
                  target="_blank"
                >
                  OPT EAD: {response.optEAD?.file.originalName}
                </a>
              )}
              <br />
              {response.I983.status === "never" ? null : (
                <a
                  href={`http://localhost:8080/api/files/${response._id}/I983`}
                  target="_blank"
                >
                  I983: {response.I983.file.originalName}
                </a>
              )}
              <br />
              {response.I20.status === "never" ? null : (
                <a
                  href={`http://localhost:8080/api/files/${response._id}/I20`}
                  target="_blank"
                >
                  I20: {response.I20.file.originalName}
                </a>
              )}
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
                {user.userDetail.firstName + " " + user.userDetail.lastName}
              </h3>
            </Space>
            <br />

            <Descriptions
              size="small"
              bordered
              layout="vertical"
              items={info}
            />
          </div>
        )}
      </div>
    </Content>
  );
};

export default EntireProfile;
