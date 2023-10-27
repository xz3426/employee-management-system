import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Select, Form, Layout } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailById, getVisaStatus } from "services/auth";
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
  const { userID } = useAuth();
  const [visaStatus, setVisaStatus] = useState("I983");
  const [statusOfCurrentStep, setStatusOfCurrentStep] = useState("never");
  const [feedback, setFeedBack] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const userStatus = await getVisaStatus(userID);
      console.log(userStatus);
      setVisaStatus(userStatus.currentStep);
      setStatusOfCurrentStep(userStatus.status);
      setFeedBack(userStatus.feedback);
      // setIsLoading(false);
    }
    fetchData();
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
          {!isLoading && visaStatus === "onBoardingApplication" && (
            <h2>
              Wating for the onBoardingApplication to be Approved by Your HR
            </h2>
          )}

          {!isLoading && visaStatus === "done" && <h2>You are all set!</h2>}

          {statusOfCurrentStep === "rejected" &&
            visaStatus === "onBoardingApplication" && (
              <div>
                <h4>Here is the feedback from HR:</h4>
                <h5 style={{ textAlign: "center", color: "red" }}>
                  {" "}
                  {feedback}{" "}
                </h5>
              </div>
            )}

          {!isLoading && visaStatus === "optRecipt" && (
            <OPTReceipt
              statusOfCurrentStep={statusOfCurrentStep}
              onOPTReceiptClick={onOPTReceiptClick}
              feedback={feedback}
            />
          )}

          {!isLoading && visaStatus === "optEAD" && (
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
