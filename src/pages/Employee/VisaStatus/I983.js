import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Layout, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadComponent from "Components/UploadComponent";
const { Content } = Layout;

const I983 = ({ statusOfCurrentStep, onI983Click, feedback }) => {
  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <h3>Step 3: I-983</h3>
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
