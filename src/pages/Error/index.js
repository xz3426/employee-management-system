import React from "react";
import { Button, Space} from "antd";
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";


const container = {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    marginLeft: "350px",
    marginRight: "350px",
    padding: "30px 100px",
    "font-family": "Arial, sans-serif",
  };

  const Error = () => {
  
    return (
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <div style={container}>
            <Space direction="vertical" size="small" align="center" style={{ display: 'flex' }}>
                <ExclamationCircleTwoTone style={{fontSize: '64px', margin:"0 auto", marginTop:"100px"}}/>
                <p style={{fontSize: '28px', fontFamily: "Arial, sans-serif",}}> Oops, something went wrong! </p>
                <Link to="/">
                    <Button type="primary">Go Home</Button>
                </Link>

            </Space>
        </div>
    </div>
  );
};

export default Error;
