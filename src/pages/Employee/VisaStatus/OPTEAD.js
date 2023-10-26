import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Layout, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadComponent from "Components/UploadComponent";

const { Content } = Layout;

const OPTEAD = ({ statusOfCurrentStep, onOPTEADClick, feedback }) => {
  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <h3>Step 2: OPT EAD</h3>
        {statusOfCurrentStep === "never" && (
          <div>
            <h4 style={{ textAlign: "center" }}>
              Please upload a copy of your OPT EAD.
            </h4>

            <UploadComponent fileType={"optEAD"} />
          </div>
        )}
        {statusOfCurrentStep === "pending" && (
          <h4 style={{ textAlign: "center" }}>
            Waiting for HR to approve your OPT EAD.
          </h4>
        )}
        {statusOfCurrentStep === "approved" && (
          <div>
            <h4 style={{ textAlign: "center" }}>
              Please upload a copy of your I-983 next.
            </h4>
            <Button type="primary" onClick={onOPTEADClick}>
              next
            </Button>
          </div>
        )}
        {statusOfCurrentStep === "rejected" && (
          <div>
            <h4>Here is the feedback from HR:</h4>
            <h5 style={{ textAlign: "center", color: "red" }}> {feedback} </h5>
            <UploadComponent fileType={"optEAD"} />
          </div>
        )}
      </div>
    </Content>
  );
};

export default OPTEAD;
