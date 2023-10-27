import "./App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import {
  NavBar,
  MyFooter,
  MyContent,
} from "./Components/LandingPageComponents";
import { Layout } from "antd";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./app/userSlice";
import store from "app/store";
import jwtDecode from "jwt-decode";
import OnboardingForm from "./Components/OnboardingForm";
import Employee from "./pages/Employee";
import VisaStatus from "./pages/Employee/VisaStatus";
import PersonalInfo from "./pages/Employee/PersonalInfo";
import AllEmployeeProfiles from "./pages/HR/AllEmployeeProfiles";
import EntireProfile from "./pages/HR/EntireProfile";
import VisaStatusManagement from "./pages/HR/VisaStatusManagement";
import HiringManagement from "./pages/HR/HiringManagement";
import TestOPT from "./pages/Employee/TestOPT";

const { Header, Footer, Content } = Layout;

if (localStorage.getItem("token")) {
  const user = jwtDecode(localStorage.getItem("token"));
  store.dispatch(setCurrentUser(user));
}
function App() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <NavBar></NavBar>
        </Header>

        <Content>
          <Routes>
            <Route path="/" element={<MyContent />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="employee" element={<Employee />} />
            <Route path="hr/hiringmanagement" element={<HiringManagement />} />
            <Route path="test" element={<TestOPT />} />
            <Route path="employee/visaStatus" element={<VisaStatus />} />
            <Route path="employee/personalInfo" element={<PersonalInfo />} />
            <Route path="onboarding" element={<OnboardingForm />} />
            <Route path="hr/allEmployeeProfiles" element={<AllEmployeeProfiles />} />
            <Route path="hr/allEmployeeProfiles/profileDetail/:id" element={<EntireProfile />} />
            <Route path="hr/visaStatusManagement" element={<VisaStatusManagement />} />

            

            <Route path="*" element={<Error />} />
          </Routes>
        </Content>

        <br />
        <Footer>
          <MyFooter></MyFooter>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
