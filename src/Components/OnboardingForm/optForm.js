import React, { useEffect, useState } from "react";
import {
  Space,
  Select,
  Input,
  Form,
  Layout,
  Button,
  Upload,
  message,
  DatePicker,
} from "antd";
import useAuth from "hooks/useAuth";
import { deleteFile } from "services/files";
import UploadComponent from "../UploadComponent";

const { Content } = Layout;
const { Option } = Select;

const fields = {
  workTitle: {
    placeholder: "Choose your work authorization",
    name: "workTitle",
    type: "string",
    rules: [
      {
        required: true,
        message: "Please choose your gender",
      },
    ],
    choices: [
      {
        value: "H1B",
        label: "H1-B",
      },
      {
        value: "L2",
        label: "L2",
      },
      {
        value: "F1",
        label: "F1(CPT/OPT)",
      },
      {
        value: "H4",
        label: "H4",
      },
      {
        value: "Other",
        label: "Other",
      },
    ],
  },

  startDate: {
    // placeholder: "Input your current address here",
    name: "startDate",
    type: "date",
    rules: [
      {
        required: true,
        message: "Please enter your start date!",
      },
      {
        type: "date",
        message: "Invalid date format!",
      },
    ],
  },

  endDate: {
    // placeholder: "Input your current address here",
    name: "endDate",
    type: "date",
    rules: [
      {
        required: true,
        message: "Please enter your end date!",
      },
      {
        type: "date",
        message: "Invalid date format!",
      },
    ],
  },
};

const OPTForm = () => {
  const [workTitle, setWorkTitle] = useState("");

  const onTitleChange = (value) => {
    setWorkTitle(value);
  };

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <Form.Item
          key={fields.workTitle.name}
          name={fields.workTitle.name}
          label="What's your work autorization?"
          rules={fields.workTitle.rules}
        >
          <Select
            placeholder={fields.workTitle.placeholder}
            onChange={onTitleChange}
            style={{ width: "200px" }}
          >
            <Option value="H1B">H1-B</Option>
            <Option value="L2">L2</Option>
            <Option value="F1">F1(CPT/OPT)</Option>
            <Option value="H4">H4</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        {workTitle === "F1" ? <UploadComponent fileType={"optRecipt"} /> : null}

        <Space size="large">
          <Form.Item
            key={fields.startDate.name}
            name={fields.startDate.name}
            label="Start Date"
            rules={fields.startDate.rules}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            key={fields.endDate.name}
            name={fields.endDate.name}
            label="End Date"
            rules={fields.endDate.rules}
          >
            <DatePicker />
          </Form.Item>
        </Space>
      </div>
    </Content>
  );
};

export default OPTForm;
