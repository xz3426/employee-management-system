import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Form, Layout, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Content } = Layout;

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

const I20 = ({ statusOfCurrentStep, feedback }) => {
  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <h3>Step 4: I20</h3>
        {statusOfCurrentStep === "never" && (
          <div>
            <h4 style={{textAlign: "center"}}>
              Please upload a copy of your I20.
            </h4>

            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        )}
        {statusOfCurrentStep === "pending" && (
          <h4 style={{textAlign: "center"}}>
            Waiting for HR to approve your I-20.
          </h4>
        )}
        {statusOfCurrentStep === "approved" && (
          <div>
            <h4 style={{textAlign: "center"}}>
              All Documents have been approved.
            </h4>
          </div>
        )}
        {statusOfCurrentStep === "rejected" && (
          <div>
            <h4>Here is the feedback from HR:</h4>
            <h5 style={{textAlign: "center"}}> {feedback} </h5>
          </div>
        )}
      </div>
    </Content>
  );
};

export default I20;
