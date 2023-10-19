import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Input,
  Select,
  Form,
  Layout,
  Image,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import ImagePreview from "./ImagePreview";

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
  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    if (user?.imgLink !== undefined) {
      setProfileImage(user.imgLink);
    }
  }, []);

  const onBirthDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Content>
      <div style={{ backgroundColor: "white" }}>
        <Space size="large">
          <Form.Item
            key={fields.firstName.name}
            name={fields.firstName.name}
            label="First Name"
            rules={fields.firstName.rules}
          >
            <Input />
          </Form.Item>

          <Form.Item
            key={fields.midName.name}
            name={fields.midName.name}
            label="Mid Name"
            rules={fields.midName.rules}
          >
            <Input />
          </Form.Item>

          <Form.Item
            key={fields.lastName.name}
            name={fields.lastName.name}
            label="Last Name"
            rules={fields.lastName.rules}
          >
            <Input />
          </Form.Item>
        </Space>

        <Space size="large">
          <Form.Item
            key={fields.preferredName.name}
            name={fields.preferredName.name}
            label="preferred Name"
            rules={fields.preferredName.rules}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            key={fields.email.name}
            name={fields.email.name}
            label="Email"
            rules={fields.email.rules}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Space>

        <Space size="large">
          <Form.Item
            key={fields.cellPhone.name}
            name={fields.cellPhone.name}
            label="Cell Phone Number"
            rules={fields.cellPhone.rules}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            key={fields.workPhone.name}
            name={fields.workPhone.name}
            label="Work Phone Number"
            rules={fields.workPhone.rules}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Space>

        <Form.Item
          key={fields.address.name}
          name={fields.address.name}
          label="Current Address"
          rules={fields.address.rules}
        >
          <Input placeholder={fields.address.placeholder} />
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

        <ImagePreview
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      </div>
    </Content>
  );
};

export default BasicInfoForm;
