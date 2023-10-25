import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import {
  Button,
  Select,
  Form,
  Layout,
  message,
  Input,
  Space,
  Upload,
  DatePicker,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailById } from "services/auth";
import moment from "moment";
import PersonalInfoDisplay from "./PersonalInfoDisplay";
import { getUserFilesInfo } from "services/files";

const { Content } = Layout;
const { Option } = Select;

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

const PersonalInfo = () => {
  const { userID } = useAuth();
  const [userDetail, setUserDetail] = useState();
  const [userFiles, setFiles] = useState({});
  const navigate = useNavigate();

  async function fetchData() {
    let userDetail = await getUserDetailById(userID);
    let files = await getUserFilesInfo(userID);
    const birth = moment(userDetail.birth);
    const startDate = moment(userDetail.startDate);
    const endDate = moment(userDetail.endDate);
    setUserDetail({
      ...userDetail,
      birth: birth,
      startDate: startDate,
      endDate: endDate,
    });
    setFiles(files);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Content>
      {userDetail && (
        <PersonalInfoDisplay
          userDetail={userDetail}
          uploadedFilesInfo={userFiles}
        />
      )}
    </Content>
  );
};

export default PersonalInfo;
