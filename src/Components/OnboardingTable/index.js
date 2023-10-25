import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import { fetchUsers, manageDoc } from "services/hrwork";
import { Layout, Avatar, Space, Descriptions } from "antd";
import { BACKEND_URI } from "consts";
const container = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginLeft: "200px",
  marginRight: "200px",
  padding: "30px 100px",
  fontFamily: "Arial, sans-serif",
};

const { Content } = Layout;
const title = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  // marginLeft: "-800px",
};
const OnboardingTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [action, setAction] = useState(""); // to store "approve" or "reject"

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const detailExtractor = (user) => {
    const dob = new Date(user.userDetail.birth);
    const formattedDob = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear}`;
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
    ];
    return (
  
        <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Employee Profiles</h1>
        
          <div >
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
              items={items}
            />
          </div>
    
         <Input
              placeholder="Enter feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button onClick={() => handleAction("Approved",user._id)}>Approve</Button>
            <Button onClick={() => handleAction("Rejected",user._id)}>Reject</Button>
      </div>
      
    </Content>
        /* {user.userDetail.USID === "no" ? (
          <div>
            <p>
              OPT Receipt:{' '}
              <a
                href={`http://${BACKEND_URI}/files/${user._id}/optRecipt`}
                target="_blank"
              >
                {user.optRecipt.file.originalName}
              </a>
            </p>

          </div>
        ) : null} */
           
  
    
    );
  }

  const handleAction = async (selectedAction, userId) => {
    // setAction(selectedAction);
    const data = {action: selectedAction,
                  userId:userId,
                  feedback: feedback,
                  fileType: "onBoardingApplication"};
    await manageDoc(data);
    setSelectedUser(null);
    setFeedback(""); // Reset feedback
    setAction(""); // Reset action
    

    // You can perform the action (approve or reject) with the feedback here.
    // You may want to send this information to your backend API.
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  }

  const handleCloseDetails = () => {
    setSelectedUser(null);
    setFeedback(""); // Reset feedback
    setAction(""); // Reset action
  }

  return (
    <div>
      <h2>Onboarding Application Table</h2>
      <Table
        dataSource={users}
        columns={[
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Onboarding Status",
            key: "onBoardingStatus",
            render: (text, record) => (
              <span>{record.onBoardingApplication ? record.onBoardingApplication.status : ''}</span>
            ),
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Button onClick={() => handleViewDetails(record)}>
                View Application
              </Button>
            ),
          },
        ]}
      />

      <Modal
        title="User Details"
        visible={selectedUser !== null}
        onCancel={handleCloseDetails}
        footer={[
          // <Button key="close" onClick={handleCloseDetails}>
          //   Close
          // </Button>
        ]}
        width={800}
      >
        {selectedUser !== null && detailExtractor(selectedUser)}
      </Modal>
    </div>
  );
};

export default OnboardingTable;
