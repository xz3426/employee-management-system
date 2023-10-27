import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Layout, message, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadComponent from "Components/UploadComponent";
const { Content } = Layout;

const I983 = ({ statusOfCurrentStep, onI983Click, feedback }) => {
  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <h3>Step 3: I-983</h3>
        <h4>Current Status: {statusOfCurrentStep}</h4>
        <Space direction="vertical">
          <a
            href="https://www.ice.gov/doclib/sevis/pdf/i983.pdf"
            target="_blank"
          >
            Empty I-983 Template
          </a>
          <a
            href="https://oiss.isp.msu.edu/files/9316/8909/5443/Sample_Form_I-983_Last_Updated_71123.pdf"
            target="_blank"
          >
            Sample I-983 Template
          </a>
        </Space>
        {statusOfCurrentStep === "never" && (
          <>
            <div>
              <h4 style={{ textAlign: "center" }}>
                Please upload a copy of your I-983.
              </h4>
              <UploadComponent fileType={"I983"} />
            </div>
          </>
        )}

        {statusOfCurrentStep === "pending" && (
          <h4 style={{ textAlign: "center" }}>
            Waiting for HR to approve your I-983.
          </h4>
        )}
        {statusOfCurrentStep === "approved" && (
          <div>
            <h4 style={{ textAlign: "center" }}>
              Please sen the I-983 along with all necessary documents to your
              school and upload a copy of your I-20 next.
            </h4>
            <Button type="primary" onClick={onI983Click}>
              next
            </Button>
          </div>
        )}
        {statusOfCurrentStep === "rejected" && (
          <div>
            <h4>Here is the feedback from HR:</h4>
            <h5 style={{ textAlign: "center" }}> {feedback} </h5>
            <UploadComponent fileType={"I983"} />
          </div>
        )}
      </div>
    </Content>
  );
};

export default I983;
