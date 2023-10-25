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
  const { userID } = useAuth();

  const [isAmerican, setIsAmerican] = useState(true);
  const [editClicked, setEditClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      let userDetail = await getUserDetailById(userID);
      setIsAmerican(userDetail.USID);
      setUserDetail(userDetail);
    }
    fetchData().then(setIsLoading(false));
  }, []);
  console.log(userDetail);
  const onSubmit = async (data) => {};

  const editOnClick = () => {};

  return (
    <Content>
      {!isLoading && (
        <div style={{ backgroundColor: "#f5f3f38f" }}>
          <h1 style={title}>Personal Information</h1>
          <div style={container}>
            <Form
              onFinish={onSubmit}
              initialValues={userDetail}
              layout="vertical"
              autoComplete="off"
            >
              <BasicInfoForm userDetail={userDetail} />

              {isAmerican && (
                <Space size="large">
                  <Form.Item
                    key="workTitle"
                    name="workTitle"
                    label="Visa Title"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    key="startDate"
                    name="startDate"
                    label="Start Date"
                  >
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

              {editClicked && (
                <>
                  <Button
                    type="primary"
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
      )}
    </Content>
  );
};

export default PersonalInfo;
