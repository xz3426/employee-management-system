import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import { fetchUsers } from "services/hrwork";

const OnboardingTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const detailExtractor = (user) => {
    // Function to extract and format user details
    // You can format the user details here as needed
    console.log(user.onBoardingApplication);
    return (
      <div>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Status: {user.onBoardingApplication.status}</p>
        {/* Add more user details here */}
      </div>
    );
  }

  const handleViewDetails = (user) => {
    // When a user clicks "View Application," set the selectedUser state
    // to the user they clicked on
    setSelectedUser(user);
  }

  const handleCloseDetails = () => {
    // Function to close the user details pop-up
    setSelectedUser(null);
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
          <Button key="close" onClick={handleCloseDetails}>
            Close
          </Button>
        ]}
      >
        {selectedUser !== null && detailExtractor(selectedUser)}
      </Modal>
    </div>
  );
};

export default OnboardingTable;
