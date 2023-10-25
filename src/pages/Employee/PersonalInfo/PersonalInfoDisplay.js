import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Select, Form, Layout, message, Modal } from "antd";

import { submitOnboardingForm } from "services/auth";

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
  const [form] = Form.useForm();

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
    setEditClicked(false);
    data.id = userID;
    try {
      await submitOnboardingForm(data);
      message.success("onBoarding for submit successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onCancel = () => {
    Modal.confirm({
      title: "Do you want to discard your changes?",
      content: "All unsaved changes will be lost.",
      okText: "Discard",
      cancelText: "Cancel",
      onOk: async () => {
        form.resetFields(); // reset the form to its initial values
        setEditClicked(false);
      },
    });
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
          form={form}
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
                style={{ margin: "20px" }}
              >
                Save
              </Button>

              <Button
                type="primary"
                onClick={onCancel}
                style={{ margin: "20px" }}
              >
                Cancel
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
