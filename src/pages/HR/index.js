import React, { useState } from "react";
import BreadCrumbs from "Components/BreadCrumbs";
import TokenTable from "Components/TokenTable";
import OnboardingTable from "Components/OnboardingTable"; // Import the OnboardingTable component

const HR = () => {
  const [currentPage, setCurrentPage] = useState("Registration Token");
  const handleBreadcrumbClick = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      <BreadCrumbs currentPage={currentPage} />
      <div>
        <button onClick={() => handleBreadcrumbClick("Registration Token")}>
          Registration Token
        </button>
        <button onClick={() => handleBreadcrumbClick("Onboarding Application Review")}>
          Onboarding Application Review
        </button>
      </div>
      {currentPage === "Registration Token" && (<TokenTable />)}
      {currentPage === "Onboarding Application Review" && (
        <OnboardingTable />
      )}
    </div>
  );
}

export default HR;
