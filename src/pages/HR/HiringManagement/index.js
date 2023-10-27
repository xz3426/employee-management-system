import React, { useState,useEffect } from "react";
import TokenTable from "Components/TokenTable";
import OnboardingTable from "Components/OnboardingTable";

const HiringManagement = () => {
  const tabStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    borderRadius: "5px",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#0056b3",
  };
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("selectedPage") || "Registration Token"
  );

  useEffect(() => {
    localStorage.setItem("selectedPage", currentPage);
  }, [currentPage]);
  return (
    <div>
      <div style={tabStyle}>
        <button
          style={currentPage === "Registration Token" ? activeButtonStyle : buttonStyle}
          onClick={() => setCurrentPage("Registration Token")}
        >
          Registration Token
        </button>
        <button
          style={currentPage === "Onboarding Application Review" ? activeButtonStyle : buttonStyle}
          onClick={() => setCurrentPage("Onboarding Application Review")}
        >
          Onboarding Application Review
        </button>
      </div>
      {currentPage === "Registration Token" && <TokenTable />}
      {currentPage === "Onboarding Application Review" && <OnboardingTable />}
    </div>
  );
};

export default HiringManagement;
