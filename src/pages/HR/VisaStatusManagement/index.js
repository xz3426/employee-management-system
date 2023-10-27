import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Select } from "antd";
import { fetchAllUsers, manageDoc } from "services/hrwork";
import { BACKEND_URI } from "consts";
import { Layout, Avatar, Space, Descriptions } from "antd";
const { Content } = Layout;
const { Option } = Select;

const VisaStatusManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [action, setAction] = useState("");
  const [rerender, setRerender] = useState(false);
  const [currentStepFilter, setCurrentStepFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchAllUsers()
      .then((data) => {
        const filteredUsers = data.filter(
          (user) =>
            user.currentStep !== "done" &&
            user.currentStep !== "onBoardingApplication"
        );
        setUsers(filteredUsers);
      });
  }, [rerender]);

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
            label: user.currentStep,
            children: (
            <a
                href={`${BACKEND_URI}/files/${user._id}/${user.currentStep}`}
                target="_blank"
              >
                {user[user.currentStep].file.originalName}
            </a>
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
        

              <div style={{marginTop:"20px"}}>
                <Input
                  placeholder="Enter feedback if reject this application"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop:"10px" }}>
                <Button style={{color:"green"}} onClick={() => handleAction("approved", user._id,user.currentStep)}>Approve</Button>
                <Button style={{color:"red"}} onClick={() => handleAction("rejected", user._id,user.currentStep)}>Reject</Button>
              </div>
              </div>
       
          </div>
          
        </Content>
        );
      }
      
    


  const handleAction = async (selectedAction, userId, currentStep) => {
    const data = {
      action: selectedAction,
      userId: userId,
      feedback: feedback,
      fileType: currentStep,
    };
    await manageDoc(data);
    setSelectedUser(null);
    setFeedback("");
    setAction("");
    setRerender(!rerender);
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  }

  const handleCloseDetails = () => {
    setSelectedUser(null);
    setFeedback("");
    setAction("");
  }

  const columns = [
    {
      title: "Employee Name",
      key: "name",
      render: (text, record) => (
        <span>{record.userDetail.firstName + " " + record.userDetail.lastName}</span>
      ),
    },
    {
      title: "Current Step",
      dataIndex: "currentStep",
      key: "currentStep",
      filters: [
        {
          text: "optRecipt",
          value: "optRecipt",
        },
        {
          text: "optEAD",
          value: "optEAD",
        },
        {
          text: "I983",
          value: "I983",
        },
        {
          text: "I20",
          value: "I20",
        },
      ],
      onFilter: (value, record) => record.currentStep === value,
    },
    {
      title: "Status",

      key: "status",
      render: (text, record) => (
        <span>{record[record.currentStep]?.status}</span>
     ),
      filters: [
        {
          text: "Never",
          value: "never",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record[record.currentStep]?.status === value,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
        <Button onClick={() => handleViewDetails(record)}>
          View User Profile
        </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Onboarding Application Table</h2>
      <Table
        dataSource={users}
        columns={columns}
      />

      <Modal
        title="User Details"
        visible={selectedUser !== null}
        onCancel={handleCloseDetails}
        footer={[]}
        width={800}
      >
        {selectedUser !== null && detailExtractor(selectedUser)}
      </Modal>
    </div>
  );
};

export default VisaStatusManagement;
