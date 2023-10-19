import { getUserApplicationStatus } from "services/auth";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import OnboardingForm from "Components/OnboardingForm";

const Employee = () => {
  const [applicationStatus, setApplicationStatus] = useState();
  const { userID } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const response = await getUserApplicationStatus(userID);
      setApplicationStatus(response.ApplicationStatus);
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>Employee Page</h1>
      {applicationStatus === "never" && <OnboardingForm />}
    </>
  );
};

export default Employee;
