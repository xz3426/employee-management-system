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



const Profile = () => {
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
          key: '1',
          label: 'Email',
          children: user.userDetail.email,
        },
        {
          key: '2',
          label: 'Cell Phone Number',
          children: user.userDetail.cellPhone,
        },
        {
          key: '3',
          label: 'Work Phone Number',
          children: user.userDetail.workPhone,
        },
        {
          key: '4',
          label: 'Current Address',
          children: user.userDetail.address,
          span: 3,
        },
        {
          key: '5',
          label: 'Gender',
          children: user.userDetail.gender,
          span: 1,
        },
        {
          key: '6',
          label: 'Date of Birth',
          children: user.userDetail.birth,
          span: 2,
        },
        {
          key: '7',
          label: 'Visa Title',
          children: user.userDetail.workTitle,
        },
        {
          key: '8',
          label: 'Start Date',
          children: user.userDetail.startDate,
        },
        {
            key: '10',
            label: 'End Date',
            children: user.userDetail.endDate,
          },
        {
          key: '10',
          label: 'Emergency Contact',
          children: (
            <>
              Name: {user.userDetail.emergencyFirstName + " " + user.userDetail.emergencyMidName + " " + user.userDetail.emergencyLastName}
              <br />
              Phone Number: {user.userDetail.emergencyPhone}
              <br />
              Email: {user.userDetail.emergencyEmail}
              <br />
              Relationship: {user.userDetail.emergencyRelationship}
              <br />
            </>
          ),
          span: 3,
        },
        {
            key: '11',
            label: 'Documents Uploaded',
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
              <Avatar size="large" src={user.userDetail.profileImage}></Avatar>
              <h3> {user.userDetail.firstName + " " + user.userDetail.lastName}</h3>
            </Space>
            <br/>

            <Descriptions  size="small" bordered layout="vertical" items={info} />
          </div>
        )}
        
      </div>
    </Content>
  );
};

export default Profile;
