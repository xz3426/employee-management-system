import { useEffect, useState } from "react";
import { Form, Input, Button, Space, Image } from "antd";
import { FileImageTwoTone } from "@ant-design/icons";

const ImagePreview = ({ profileImage, setProfileImage, disabled = false }) => {
  function isValidURL(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  }
  return (
    <>
      <Form.Item
        key="profileImage"
        name="profileImage"
        label="Add Image Link"
        rules={[
          {
            type: "url",
            message: "Invalid url format!",
            validateTrigger: "onBlur", // Validate onBlur
          },
        ]}
      >
        <Space.Compact>
          <Input
            placeholder="Please put your profile Image"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            id="myInputImg"
            disabled={disabled}
          />
        </Space.Compact>
      </Form.Item>
      <Form.Item>
        {!isValidURL(profileImage) ? (
          <div
            style={{
              margin: "0px 50px",
              height: "15em",
              backgroundColor: "#f5f3f38f",
              border: "1px dashed grey",
              borderRadius: "10px",
            }}
          >
            <p>
              <FileImageTwoTone
                style={{
                  display: "block",
                  fontSize: "50px",
                  alignItems: "center",
                  paddingTop: "1em",
                }}
              />
            </p>
            <p
              style={{
                display: "block",
                textAlign: "center",
                color: "grey",
              }}
            >
              Profile Image Preview
            </p>
          </div>
        ) : (
          <Image
            width={250}
            src={profileImage}
            style={{ display: "block", marginLeft: "150px" }}
          />
        )}
      </Form.Item>
    </>
  );
};

export default ImagePreview;
