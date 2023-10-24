import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import {
  Button,
  Select,
  Form,
  Layout,
  message,
  Input,
  Space,
  Upload,
  DatePicker,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { submitOnboardingForm } from "services/auth";
import { getUserDetailById } from "services/auth";

import EmergencyForm from "Components/OnboardingForm/emergency";
import BasicInfoForm from "Components/OnboardingForm/basicInfo";

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

const PersonalInfo = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [isAmerican, setIsAmerican] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const user = await getUserDetailById(id);
      setIsAmerican(user.USID);
      setIsLoading(false);
    }
    // fetchData();
  }, []);

  const onSubmit = async (data) => {};

  const editOnClick = () => {};

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    label: "Upload your OPT receipt",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Personal Information</h1>
        <div style={container}>
          <Form onFinish={onSubmit} layout="vertical" autoComplete="off">
            <BasicInfoForm />

            {isAmerican && (
              <Space size="large">
                <Form.Item key="workTitle" name="workTitle" label="Visa Title">
                  <Input />
                </Form.Item>
                <Form.Item key="startDate" name="startDate" label="Start Date">
                  <DatePicker />
                </Form.Item>

                <Form.Item key="endDate" name="endDate" label="End Date">
                  <DatePicker />
                </Form.Item>
              </Space>
            )}
            <br />
            <EmergencyForm />
            <br />

            <Form.Item label="OPT Receipt Upload:" name="optReceipt">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                editOnClick={editOnClick}
                style={{ margin: "20px" }}
              >
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default PersonalInfo;
