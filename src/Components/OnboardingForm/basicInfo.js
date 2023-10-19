import React, { useEffect, useState } from "react";
import { Button, Space, Input, Select, Form, Layout, Image, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { FileImageTwoTone } from "@ant-design/icons";
// import { deleteProductById } from "services/products";
import ReferenceForm from "./reference";
import EmergencyForm from "./emergency";
import OPTForm from "./optForm";

const { Content } = Layout;
const { Option } = Select;

const fields = {
  firstName: {
    placeholder: "Input fisrt name",
    name: "firstName",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your fisrt name!",
      },
    ],
  },

  midName: {
    placeholder: "Input mid name",
    name: "midName",
    type: "text",
    rules: [
      {
        required: false,
      },
    ],
  },

  lastName: {
    placeholder: "Input last name",
    name: "lastName",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your last name!",
      },
    ],
  },

  preferredName: {
    placeholder: "Input preferred name",
    name: "preferredName",
    type: "text",
    rules: [
      {
        required: false,
      },
    ],
  },

  email: {
    placeholder: "Input your email",
    name: "email",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your last name!",
      },

      {
        type: "email",
        message: "Invalid email format!",
        validateTrigger: "onBlur", // Validate onBlur
      },
    ],
  },

  cellPhone: {
    placeholder: "Input cell phone number",
    name: "cellPhone",
    type: "number",
    rules: [
      {
        required: true,
        message: "Please enter your cell phone number!",
      },
    ],
  },

  workPhone: {
    placeholder: "Input work phone number",
    name: "workPhone",
    type: "number",
    rules: [
      {
        required: false,
        message: "Please enter your work phone number!",
      },
    ],
  },

  address: {
    placeholder: "Input your current address here",
    name: "address",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your current address!",
        validateTrigger: "onBlur", // Validate onBlur
      },
    ],
  },

  birth: {
    // placeholder: "Input your current address here",
    name: "birth",
    type: "date",
    rules: [
      {
        required: true,
        message: "Please enter your date of birth!",
        validateTrigger: "onBlur", // Validate onBlur
      },
      {
        type: "date",
        message: "Invalid date format!",
      },
    ],
  },

  gender: {
    placeholder: "Choose your gender",
    name: "gender",
    type: "string",
    rules: [
      {
        required: true,
        message: "Please choose your gender",
      },
    ],
    gender: [
      {
        value: "male",
        label: "male",
      },
      {
        value: "female",
        label: "female",
      },
      {
        value: "DontWantToTell",
        label: "Don't want to tell",
      },
    ],
  },

  imgLink: {
    placeholder: "Input Profile Image Link Here",
    name: "imgLink",
    type: "url",
    rules: [
      {
        type: "url",
        message: "Invalid url format!",
      },
    ],
  },
};


const BasicInfoForm = ({ user }) => {
  const [profileImg, setProfileImg] = useState("");
  const [submitedImg, setSubmitedImg] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (user?.imgLink !== undefined) {
      setProfileImg(user.imgLink);
    }
  }, []);

  const handleButtonClick = () => {
    var inputElement = document.getElementById("myInputImg");
    setProfileImg(inputElement.value);
    setSubmitedImg(true);
  };

  const onBirthDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Content>
      <div style={{ backgroundColor: "white" }}>
        
          <Form layout="vertical" autoComplete="off">
            <Space size="large">
              <Form.Item
                key={fields.firstName.name}
                name={fields.firstName.name}
                label="First Name"
                rules={fields.firstName.rules}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                key={fields.midName.name}
                name={fields.midName.name}
                label="Mid Name"
                rules={fields.midName.rules}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                key={fields.lastName.name}
                name={fields.lastName.name}
                label="Last Name"
                rules={fields.lastName.rules}
              >
                <Input/>
              </Form.Item>
            </Space>

            <Space size="large">
              <Form.Item
                key={fields.preferredName.name}
                name={fields.preferredName.name}
                label="preferred Name"
                rules={fields.preferredName.rules}
              >
                <Input
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                key={fields.email.name}
                name={fields.email.name}
                label="Email"
                rules={fields.email.rules}
              >
                <Input
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Space>

            <Space size="large">
              <Form.Item
                key={fields.cellPhone.name}
                name={fields.cellPhone.name}
                label="Cell Phone Number"
                rules={fields.cellPhone.rules}
              >
                <Input
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                key={fields.workPhone.name}
                name={fields.workPhone.name}
                label="Work Phone Number"
                rules={fields.workPhone.rules}
              >
                <Input
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Space>

            <Form.Item
              key={fields.address.name}
              name={fields.address.name}
              label="Current Address"
              rules={fields.address.rules}
            >
              <Input
                placeholder={fields.address.placeholder}
              />
            </Form.Item>

            <Space size="large">
              <Form.Item
                key={fields.gender.name}
                name={fields.gender.name}
                label="Gender"
                rules={fields.gender.rules}
              >
                <Select
                  placeholder={fields.gender.placeholder}
                  options={fields.gender.gender}
                  style={{ width: "200px" }}
                />
              </Form.Item>

              <Form.Item
                key={fields.birth.name}
                name={fields.birth.name}
                label="Date of Birth"
                rules={fields.birth.rules}
              >
                <DatePicker onChange={onBirthDateChange} />
              </Form.Item>
            </Space>

            <Form.Item
              key={fields.imgLink.name}
              name={fields.imgLink.name}
              label="Profile Image"
              rules={fields.imgLink.rules}
            >
              <Space.Compact>
                <Input
                  placeholder={fields.imgLink.placeholder}
                  value={user?.imgLink}
                  id="myInputImg"
                  style={{ width: "100%" }}
                />
                <Button type="primary" onClick={handleButtonClick}>
                  Upload
                </Button>
              </Space.Compact>
            </Form.Item>

            <Form.Item>
              {!submitedImg ? (
                <div
                  style={{
                    margin: "0px 100px",
                    height: "10em",
                    backgroundColor: "#f5f3f38f",
                    border: "1px dashed grey",
                    borderRadius: "10px",
                  }}
                >
                  <p>
                    <FileImageTwoTone
                      style={{
                        display: "block",
                        fontSize: "30px",
                        alignItems: "center",
                        paddingTop: "1em",
                      }}
                    />
                  </p>
                  <p
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "grey",
                    }}
                  >
                    Profile Image Preview
                  </p>
                </div>
              ) : (
                <Image
                  width={250}
                  src={profileImg}
                  style={{ display: "block", marginLeft: "150px" }}
                />
              )}
            </Form.Item>

          </Form>
        </div>
    </Content>
  );
};

export default BasicInfoForm;
