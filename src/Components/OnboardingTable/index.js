import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import { fetchUsers, manageDoc } from "services/hrwork";

import { BACKEND_URI } from "consts";

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
    return (
      <div>
        <p>Full Name: {user.userDetail.firstName + " " + (user.userDetail.middleName ? user.userDetail.middleName : "") + " " + user.userDetail.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Cell Phone: {user.userDetail.cellPhone}</p>
        <p>Work Phone: {user.userDetail.workPhone}</p>
        <p>Address: {user.userDetail.address}</p>
        <p>Gender: {user.userDetail.gender}</p>
        <p>Date of Birth: {formattedDob}</p>
        <p>Status: {user.onBoardingApplication.status}</p>
        <p>US residents: {user.userDetail.USID}</p>
        {user.userDetail.USID === "no" ? (
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
        ) : null}
            <Input
              placeholder="Enter feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button onClick={() => handleAction("approve",user._id)}>Approve</Button>
            <Button onClick={() => handleAction("reject",user._id)}>Reject</Button>
        {/* Add more user details here */}
      </div>
    );
  }

  const handleAction = (selectedAction, userId) => {
    // setAction(selectedAction);
    const data = {action: selectedAction,
                  userId:userId,
                  feedback: feedback,
                  fileType: "optRecipt"};
    manageDoc(data);
    

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
