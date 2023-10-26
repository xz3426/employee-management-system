import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input,Select } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import { fetchAllUsers, manageDoc } from "services/hrwork";
import { Layout, Avatar, Space, Descriptions } from "antd";
import { BACKEND_URI } from "consts";
const { Option } = Select;
const VisaStatusManagement = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [action, setAction] = useState(""); // to store "approve" or "reject"
    const [rerender, setRerender] = useState(false);
    const [currentStepFilter, setCurrentStepFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
    fetchAllUsers()
        .then((data) => {
            const filteredUsers = data.filter(user => user.currentStep !== 'done' && user.currentStep !== 'onBoardingApplication');
        setUsers(filteredUsers);
        // console.log("!!!!!!!!!!",filteredUsers[0][filteredUsers[0].currentStep].status);
        });
    }, [rerender]);

    const detailExtractor = (user) => {
    const dob = new Date(user.userDetail.birth);
    const formattedDob = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear}`;

    
    return (
    
        // <Content>
        // <div style={{ backgroundColor: "#f5f3f38f" }}>
        // <h1 style={title}>Employee Profiles</h1>
        
        //     <div >
        //     <h2>Employee Information Detail</h2>
        //     <Space size="large">
        //         <Avatar size="large" src={user.profileImageUrl}></Avatar>
        //         <h3>
        //         {" "}
        //         {user.userDetail.firstName + " " + user.userDetail.lastName}
        //         </h3>
        //     </Space>
        //     <br />

        //     <Descriptions
        //         size="small"
        //         bordered
        //         layout="vertical"
        //         items={items}
        //     />
        //     </div>
    
            
    //     </div>
        
    // </Content>
      
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

            
            <Input
                placeholder="Enter feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />
            <Button onClick={() => handleAction("Approved",user._id, user.currentStep)}>Approve</Button>
            <Button onClick={() => handleAction("Rejected",user._id, user.currentStep)}>Reject</Button>
            </div>
    
    
    );
    }

    const handleAction = async (selectedAction, userId, currentStep) => {
    // setAction(selectedAction);
    const data = {action: selectedAction,
                    userId:userId,
                    feedback: feedback,
                    fileType: currentStep};
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
            title: "Employee Name",
            key: "name",
            render: (text,record) => (
                <span>{record.userDetail.firstName + " " + record.userDetail.lastName}</span>
            )
            },
            {
                title: "Current Step",
                key: "currentStep",
                render: (text, record) => (
                  <span>{record.currentStep}</span>
                ),
                filters: [
                  { text: "optRecipt", value: "optRecipt" },
                  { text: "optEAD", value: "optEAD" },
                  { text: "I983", value: "I983" },
                  { text: "I20", value: "I20" },
                ],
                onFilter: (value, record) => record.currentStep === value,
                filterDropdown: (
                  <div>
                    <Select
                      placeholder="Filter Current Step"
                      value={currentStepFilter}
                      onChange={(value) => setCurrentStepFilter(value)}
                      style={{ width: 120 }}
                    >
                      {currentStepFilter &&
                        currentStepFilter !== "all" && (
                          <Option value="all">Show All</Option>
                        )}
                      <Option value="optRecipt">optRecipt</Option>
                      <Option value="optEAD">optEAD</Option>
                      <Option value="I983">I983</Option>
                      <Option value="I20">I20</Option>
                    </Select>
                    <Button
                      type="primary"
                      onClick={() => setRerender(!rerender)}
                      icon={<i className="fas fa-search" />}
                    >
                      Filter
                    </Button>
                  </div>
                ),
                filterIcon: (filtered) => (
                  <Button
                    type="primary"
                    icon={<i className="fas fa-filter" />}
                  />
                ),
              },
              {
                title: "Status",
                key: "status",
                render: (text, record) => (
                  <span>{record[record.currentStep]?.status}</span>
                ),
                filters: [
                  { text: "never", value: "never" },
                  { text: "pending", value: "pending" },
                  { text: "Rejected", value: "Rejected" },
                ],
                onFilter: (value, record) => record[record.currentStep]?.status === value,
                filterDropdown: (
                  <div>
                    <Select
                      placeholder="Filter Status"
                      value={statusFilter}
                      onChange={(value) => setStatusFilter(value)}
                      style={{ width: 120 }}
                    >
                      {statusFilter && statusFilter !== "all" && (
                        <Option value="all">Show All</Option>
                      )}
                      <Option value="never">never</Option>
                      <Option value="pending">pending</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>
                    <Button
                      type="primary"
                      onClick={() => setRerender(!rerender)}
                      icon={<i className="fas fa-search" />}
                    >
                      Filter
                    </Button>
                  </div>
                ),
                filterIcon: (filtered) => (
                  <Button
                    type="primary"
                    icon={<i className="fas fa-filter" />}
                  />
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

export default VisaStatusManagement;