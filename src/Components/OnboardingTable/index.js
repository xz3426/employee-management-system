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
  const [rerender,setRerender] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending");

  const filterUsersByStatus = () => {
    if (statusFilter === "All") {
      return users;
    } else {
      return users.filter((user) =>
        user.onBoardingApplication && user.onBoardingApplication.status === statusFilter
      );
    }
  };

  const handleStatusFilterChange = (selectedStatus) => {
    setStatusFilter(selectedStatus);
  };
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      });
  }, [rerender]);

  const fetchUsersData = () => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  };

  const detailExtractor = (user) => {
    const dob = new Date(user.userDetail.birth);
    const formattedDob = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;
    if (user.USID === 'no'){
      var dos = new Date(user.userDetail.startDate);
      var doe = new Date(user.userDetail.endDate);
      var formattedDos = `${dos.getMonth() + 1}/${dos.getDate()}/${dos.getFullYear()}`;
      var formattedDoe = `${doe.getMonth() + 1}/${doe.getDate()}/${doe.getFullYear()}`;
    }
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
        children: formattedDob,
        span: 1,
      },
      {
        key: '7',
        label: 'US Citizen or resident',
        children: user.USID,
      },
      {
        key: '8',
        label: 'Visa Title',
        children: user.userDetail.workTitle,
      },
      {
        key: '9',
        label: 'Start Date',
        children: formattedDos,
      },
      {
          key: '10',
          label: 'End Date',
          children: formattedDoe,
        },
      {
        key: '11',
        label: 'Referral',
        children: (
          <>
            Name: {user.userDetail.referFirstName + " " + user.userDetail.referLastName}
            <br />
            Phone Number: {user.userDetail.referCellPhone}
            <br />
            Email: {user.userDetail.referEmail}
            <br />
            Relationship: {user.userDetail.referRelationship}
            <br />
          </>
        ),
        span: 3,
      },
      {
        key: '11',
        label: 'Emergency Contact',
        children: (
          <>
            Name: {user.userDetail.emergencyFirstName + " " + user.userDetail.emergencyLastName}
            <br />
            Phone Number: {user.userDetail.emergencyCellPhone}
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
          <div >
           
            <Space size="large">
              <Avatar size="large" src={user.profileImageUrl}></Avatar>
              <h3>
                {" "}
                {user.userDetail.firstName + " " + user.userDetail.lastName}
              </h3>
            </Space>
            <br />

            <Descriptions size="small" bordered layout="vertical" items={items.filter(item => !(user.USID === "yes" && ["Visa Title", "Start Date", "End Date"].includes(item.label)))} />
          </div>
    
          {user.onBoardingApplication.status !== "approved" && (
          <div style={{marginTop:"20px"}}>
            <Input
              placeholder="Enter feedback if reject this application"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop:"10px" }}>
            <Button style={{color:"green"}} onClick={() => handleAction("approved", user._id)}>Approve</Button>
            <Button style={{color:"red"}} onClick={() => handleAction("rejected", user._id)}>Reject</Button>
          </div>
          </div>
        )}
      </div>
      
    </Content>
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
    setRerender(!rerender);

    // You can perform the action (approve or reject) with the feedback here.
    // You may want to send this information to your backend API.
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
    setFeedback(""); // Reset feedback
    setAction(""); // Reset action
  }

  return (
    <div style={{margin: "30px"}}>
      <div>
        <span>Status Filter: </span>
        <select value={statusFilter} onChange={(e) => handleStatusFilterChange(e.target.value)}>
          <option value="All">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="never">Never</option>
        </select>
      </div>
      <Table
        dataSource={filterUsersByStatus()}
        columns={[
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Onboarding Status",
            key: "onBoardingStatus",
            width: 550, 
            render: (text, record) => (
              <span>{record.onBoardingApplication ? record.onBoardingApplication.status : ''}</span>
            ),
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <div>
              <Button onClick={() => handleViewDetails(record)} disabled={record.onBoardingApplication.status === "never" }>
                View Application
              </Button>
              <Button style={{ width: "80px", marginLeft: "20px", backgroundColor: "#d12626" , color:"white"}}>Delete</Button>
              </div>
            ),
          },
        ]}
        pagination={{ pageSize: 8 }} 
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
        width={1000}
      >
        {selectedUser !== null && detailExtractor(selectedUser)}
      </Modal>
    </div>
  );
};

export default OnboardingTable;
