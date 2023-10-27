import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Layout, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadComponent from "Components/UploadComponent";
import { optRecipt } from "consts";

const { Content } = Layout;

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

const OPTReceipt = ({ statusOfCurrentStep, onOPTReceiptClick, feedback }) => {
  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px" }}>
        <h3>Step 1: OPT Receipt</h3>
        <h4>Current Status: {statusOfCurrentStep}</h4>
        {statusOfCurrentStep === "never" && (
          <div>
            <h4 style={{ textAlign: "center", color: "red" }}>
              Please upload a copy of your OPT Receipt.
            </h4>

            <UploadComponent fileType={optRecipt} />
          </div>
        )}

        {statusOfCurrentStep === "pending" && (
          <h4 style={{ textAlign: "center" }}>
            Waiting for HR to approve your OPT receipt.
          </h4>
        )}
        {statusOfCurrentStep === "approved" && (
          <div>
            <h4 style={{ textAlign: "center" }}>
              Please upload a copy of your OPT EAD next.
            </h4>
            <Button type="primary" onClick={onOPTReceiptClick}>
              next
            </Button>
          </div>
        )}
        {statusOfCurrentStep === "rejected" && (
          <div>
            <h4>Here is the feedback from HR:</h4>
            <h5 style={{ textAlign: "center" }}> {feedback} </h5>
            <UploadComponent fileType={optRecipt} />
          </div>
        )}
      </div>
    </Content>
  );
};

export default OPTReceipt;
