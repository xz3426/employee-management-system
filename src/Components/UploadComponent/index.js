import React, { useEffect, useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useAuth from "hooks/useAuth";
import { deleteFile } from "services/files";

const UploadComponent = ({ fileType }) => {
  const { userID } = useAuth();
  const [isUploaded, setIsUploaded] = useState(false);
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    accept: ".pdf",
    label: "Upload your ${fileType}",
    rules: [{ required: true, message: `Please upload your ${fileType} ` }],
  };

  useEffect(() => {
    if (isUploaded === true) {
      message.success("Upload Successfully!");
    } else if (isUploaded === false) {
      message.success(`file deleted!`);
    }
  }, [isUploaded]);

  const onRemove = (info) => {
    try {
      deleteFile(userID, fileType).then(setIsUploaded(false));
    } catch (error) {
      message.error(error);
    }
  };

  const onChange = (info) => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      setIsUploaded(true);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const isLt18M = file.size / 1024 / 1024 < 18;
    if (!isLt18M) {
      message.error("file has to be lower than 18MB");
      return false;
    }
    return true;
  };

  return (
    <Upload
      {...props}
      onRemove={onRemove}
      onChange={onChange}
      beforeUpload={beforeUpload}
      action={`http://localhost:8080/api/files/${userID}/${fileType}`}
    >
      <Button disabled={isUploaded} icon={<UploadOutlined />}>
        Click to Upload
      </Button>
    </Upload>
  );
};

export default UploadComponent;
