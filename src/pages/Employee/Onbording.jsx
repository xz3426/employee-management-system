import React from "react";
import { Form, Input, Button, DatePicker, Select, Layout } from "antd";
import ImagePreview from "Components/OnboardingForm/ImagePreview";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { populateDetail } from "services/auth";
const { Content } = Layout;

const Onboarding = () => {
  const [profileImage, setProfileImage] = useState();
  const [citizen, setCitizen] = useState("false");
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { userID } = useAuth();
  const { Option } = Select;
  const onSubmit = (data) => {
    data.id = userID;
    populateDetail(data);
  };

  return (
    <div>
      <Form
        onFinish={onSubmit}
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mid Name"
          name="midname"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Preferred Name"
          name="preferredname"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Cell Phone Number"
          name="cellphone"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Work Phone Number"
          name="workphone"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Current Address"
          name="address"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: `Please enter your First Name` }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            placeholder="Please Select Your Gender"
            initialValue="Male"
            options={[
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
              {
                value: "I prefer not to Answer",
                label: "I prefer not to Answer",
              },
            ]}
            style={{ width: "200px" }}
          />
        </Form.Item>
        <ImagePreview
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <Form.Item label="Citizen" name="Citizen">
          <label>Permanent resident or citizen of the U.S.?</label>
          <Select
            defaultValue={citizen}
            style={{ width: "100%" }}
            onChange={(value) => setCitizen(value)}
          >
            <Option value="true">yes</Option>
            <Option value="false">no</Option>
          </Select>
        </Form.Item>
        {citizen === "false" && <h1>Whats's Your work authoization?</h1>}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ margin: "20px" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Onboarding;
