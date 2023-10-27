import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Form, Layout, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadComponent from "Components/UploadComponent";

const { Content } = Layout;

const I20 = ({ statusOfCurrentStep, feedback }) => {
  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <h3>Step 4: I20</h3>
        <h4>Current Status: {statusOfCurrentStep}</h4>
        {statusOfCurrentStep === "never" && (
          <div>
            <h4 style={{ textAlign: "center" }}>
              Please upload a copy of your I20.
            </h4>

            <UploadComponent fileType={"I20"} />
          </div>
        )}
        {statusOfCurrentStep === "pending" && (
          <h4 style={{ textAlign: "center" }}>
            Waiting for HR to approve your I-20.
          </h4>
        )}
        {statusOfCurrentStep === "approved" && (
          <div>
            <h4 style={{ textAlign: "center" }}>
              All Documents have been approved.
            </h4>
          </div>
        )}
        {statusOfCurrentStep === "rejected" && (
          <div>
            <h4>Here is the feedback from HR:</h4>
            <h5 style={{ textAlign: "center" }}> {feedback} </h5>
            <UploadComponent fileType={"I20"} />
          </div>
        )}
      </div>
    </Content>
  );
};

export default I20;
