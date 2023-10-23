import React, { useState } from "react";
import BreadCrumbs from "Components/BreadCrumbs";
import TokenTable from "Components/TokenTable";
import { generateUser } from "services/hrwork";
import useAuth from 'hooks/useAuth';

  const HR = () => {
  const [currentPage, setCurrentPage] = useState("Registration Token");
  const [newUser, setNewUser] = useState("");

  const { username } = useAuth();
  const handleBreadcrumbClick = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleGenerateUser = () => {
    // Generate a user based on some logic, e.g., a random username
    // const newUser = generateRandomUser();
    // setNewUserName(newUser);
    generateUser({hr:username ,user: newUser});
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
      {currentPage === "Registration Token" &&  (
        <div>
          <input
            type="text"
            placeholder="Enter a Employee Email"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <button onClick={handleGenerateUser}>Generate User</button>
          <TokenTable />
        </div>
      )}
    </div>
  );
}





export default HR;
