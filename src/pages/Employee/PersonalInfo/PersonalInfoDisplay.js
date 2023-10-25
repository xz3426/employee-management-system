import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Select, Form, Layout, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { submitOnboardingForm } from "services/auth";
import { getUserDetailById } from "services/auth";

import EmergencyForm from "Components/OnboardingForm/emergency";
import BasicInfoForm from "Components/OnboardingForm/basicInfo";
import OPTForm from "Components/OnboardingForm/optForm";

const { Content } = Layout;
const { Option } = Select;

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

const PersonalInfoDisplay = ({ userDetail, fetchData }) => {
  const [editClicked, setEditClicked] = useState(false);
  const [isAmerican, setIsAmerican] = useState(true);

  const { userID } = useAuth();
  useEffect(() => {
    const USID = userDetail;
    if (USID === "yes") {
      setIsAmerican(true);
    } else {
      setIsAmerican(false);
    }
  }, []);
  const onSubmit = async (data) => {
    data.id = userID;
    console.log(data);
    try {
      await submitOnboardingForm(data);
      message.success("onBoarding for submit successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onUSIDChange = (value) => {
    switch (value) {
      case "yes":
        setIsAmerican(true);
        break;
      case "no":
        setIsAmerican(false);
        break;
      default:
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f3f38f" }}>
      <h1 style={title}>Personal Information</h1>
      <div style={container}>
        <Form
          onFinish={onSubmit}
          initialValues={userDetail}
          layout="vertical"
          autoComplete="off"
        >
          <BasicInfoForm profileImageUrl={userDetail.profileImage} />

          <Form.Item
            name="USID"
            label="Permanent resident of citizen of the U.S.?"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a option" onChange={onUSIDChange}>
              <Option value="yes">yes</Option>
              <Option value="no">no</Option>
            </Select>
          </Form.Item>

          {!isAmerican && <OPTForm />}
          <br />
          <EmergencyForm />
          <br />

          {editClicked && (
            <>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setEditClicked(false);
                }}
                style={{ margin: "20px" }}
              >
                Save
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setEditClicked(false);
                }}
                style={{ margin: "20px" }}
              >
                Cancle
              </Button>
            </>
          )}

          {!editClicked && (
            <Button
              type="primary"
              onClick={() => {
                setEditClicked(true);
              }}
              style={{ margin: "20px" }}
            >
              Edit
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default PersonalInfoDisplay;
