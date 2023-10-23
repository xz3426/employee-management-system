import { getUserApplicationStatus } from "services/auth";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import OnboardingForm from "Components/OnboardingForm";

const Employee = () => {
  const [applicationStatus, setApplicationStatus] = useState();
  console.log(applicationStatus);
  const { userID } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const response = await getUserApplicationStatus(
        userID,
        "onBoardingApplication"
      );
      console.log(response);
      setApplicationStatus(response.ApplicationStatus);
    }
    fetchData();
  }, [applicationStatus]);
  return (
    <>
      <h1>Employee Page</h1>
      {applicationStatus === "never" && <OnboardingForm />}
      {applicationStatus === "pending" && <h1>Pending</h1>}
      {applicationStatus === "rejected" && <h1>Rejected</h1>}
    </>
  );
};

export default Employee;