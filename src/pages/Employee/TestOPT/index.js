import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Button, Select, Form, Layout } from "antd";
import OPTForm from "Components/OnboardingForm/optForm";

const { Content } = Layout;

const TestOPT = () => {
  onsubmit = (data) => {
    console.log(data);
  };
  return (
    <Content>
      <Form onFinish={onsubmit}>
        <OPTForm />
      </Form>
    </Content>
  );
};

export default TestOPT;
