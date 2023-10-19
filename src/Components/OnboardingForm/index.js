import React, { useEffect, useState } from "react";
import { Button, Select, Form, Layout } from "antd";
import { useNavigate } from "react-router-dom";
// import { deleteProductById } from "services/products";
import ReferenceForm from "./reference";
import EmergencyForm from "./emergency";
import OPTForm from "./optForm";
import BasicInfoForm from "./basicInfo";

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

const OnboardingForm = ({
  buttonText,
  onSubmit,
  product,
  titleText,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const [isAmerican, setIsAmerican] = useState(true);

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
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Onboarding Form</h1>

        <div style={container}>
          <Form onFinish={onSubmit} layout="vertical" autoComplete="off">
            <BasicInfoForm />
            <ReferenceForm />
            <EmergencyForm />
            <br />

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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "20px" }}
              >
                Submit
              </Button>
              {/* {isEdit && (
                <Button
                  danger
                  style={{ margin: "20px" }}
                  // onClick={() => {
                  //   deleteProductById(product._id).then(navigate("/"));
                  // }}
                >
                  Delete
                </Button>
              )} */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default OnboardingForm;
