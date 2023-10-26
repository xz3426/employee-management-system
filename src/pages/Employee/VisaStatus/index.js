import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Select, Form, Layout } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailById } from "services/auth";
import OPTReceipt from "./OPTReceipt";
import OPTEAD from "./OPTEAD";
import I983 from "./I983";
import I20 from "./I20";

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

const VisaStatus = () => {
  const { id } = useParams();
  const [visaStatus, setVisaStatus] = useState("I983");
  const [statusOfCurrentStep, setStatusOfCurrentStep] = useState("never");
  const [feedback, setFeedBack] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const user = await getUserDetailById(id);
      setVisaStatus(user.visaStatus);
      setStatusOfCurrentStep(user.statusOfCurrentStep);
      setFeedBack(user.feedback);
      setIsLoading(false);
    }
    // fetchData();
  }, []);

  const onOPTReceiptClick = () => {
    setStatusOfCurrentStep("never");
    setVisaStatus("OPTEAD");
    // navigate("employee/visaStatus/optEAD");
  };
  const onOPTEADClick = () => {
    setStatusOfCurrentStep("never");
    setVisaStatus("I983");
    // navigate("employee/visaStatus/i983");
  };
  const onI983Click = () => {
    setStatusOfCurrentStep("never");
    setVisaStatus("I20");
    // navigate("employee/visaStatus/i20");
  };

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Visa Status Management</h1>
        <div style={container}>
          {!isLoading && visaStatus === "OPTReceipt" && (
            <OPTReceipt
              statusOfCurrentStep={statusOfCurrentStep}
              onOPTReceiptClick={onOPTReceiptClick}
              feedback={feedback}
            />
          )}

          {!isLoading && visaStatus === "OPTEAD" && (
            <OPTEAD
              statusOfCurrentStep={statusOfCurrentStep}
              onOPTEADClick={onOPTEADClick}
              feedback={feedback}
            />
          )}

          {!isLoading && visaStatus === "I983" && (
            <I983
              statusOfCurrentStep={statusOfCurrentStep}
              onI983Click={onI983Click}
              feedback={feedback}
            />
          )}

          {!isLoading && visaStatus === "I20" && (
            <I20
              statusOfCurrentStep={statusOfCurrentStep}
              feedback={feedback}
            />
          )}
        </div>
      </div>
    </Content>
  );
};

export default VisaStatus;
