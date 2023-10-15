import { Layout } from "antd";
import React from "react";

const MyFooter_ = () => {
  const { Footer } = Layout;
  return (
    <Footer
      className="footer"
      style={{
        display: "flex",
        bottom: "0",
        position: "fixed",
        width: "100%",
        marginLeft:"-50px",
        justifyContent: "space-between",
        backgroundColor: "#111827",
      }}
    >
      <div className="footer-left">@2023 All Rights Reserved.</div>
      <div className="social-media-icons">
        <a
          href="https://www.youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-youtube"></i>
        </a>
        <a
          href="https://www.twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <a
          href="https://www.facebook.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-facebook"></i>
        </a>
      </div>
      <div className="footer-right">
        <a href="https://www.facebook.com/yourprofile">Contact us</a>
        <a href="https://www.facebook.com/yourprofile">Privacy Policies</a>
        <a href="https://www.facebook.com/yourprofile">Help</a>
      </div>
    </Footer>
  );
};

export default MyFooter_;
