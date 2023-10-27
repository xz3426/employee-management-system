import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal } from "antd";
import styled from "styled-components"; // Import styled from styled-components
import { fetchTokens, sendToken, deleteToken, generateUser } from "services/hrwork";
import useAuth from "hooks/useAuth";

const TokenTableWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  // margin: 00px 000px; /* Updated margin for top and left/right */
  // padding: 0px 10px;
  // font-family: "Arial, sans-serif";
  // align-items: center;
  justify-content: center;
  // min-height: 100vh; /* Ensure the div takes at least the full viewport height */
`;
const inputContainer = {
  display: "flex",
  alignItems: "center",
};

const tableMargin = {
  marginTop: "10px" // Adjust the margin as needed
};

const TokenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [rerender, setRerender] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const username = useAuth().username;


  useEffect(() => {
    fetchTokens()
      .then((data) => {
        setTokens(data);
        setFilteredTokens(data);
      })
      .catch((error) => console.error("Error fetching tokens:", error));
  }, [rerender]);

  const handleResendToken = (hr, employee) => {
    sendToken({ user: employee })
      .then((response) => {
        console.log("Token resend successful:", response);
        setRerender(!rerender);
      })
      .catch((error) => {
        console.error("Error resending token:", error);
      });
  };

  const handleDeleteToken = (hr, employee) => {
    deleteToken({ user: employee })
      .then((response) => {
        console.log("Token deletion successful:", response);
        setRerender(!rerender);
      })
      .catch((error) => {
        console.error("Error deleting token:", error);
      });
  };

  // const getActionButton = (status, hr, employee) => {
  //   if (status === "Token Expired" || status === "Token Sent") {
  //     return (
  //       <div>
  //         <Button
  //           onClick={() => handleResendToken(hr, employee)}
  //           disabled={status === "Registered"}
  //         >
  //           Resend
  //         </Button>
  //         <Button onClick={() => handleDeleteToken(hr, employee)}>Delete</Button>
  //       </div>
  //     );
  //   } else if (status === "Token Not Send") {
  //     return (
  //       <div>
  //         <Button
  //           onClick={() => handleResendToken(hr, employee)}
  //           disabled={status === "Registered"}
  //         >
  //           Send
  //         </Button>
  //         <Button onClick={() => handleDeleteToken(hr, employee)}>Delete</Button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <Button disabled onClick={() => handleResendToken(hr, employee)}>
  //           Send
  //         </Button>
  //         <Button onClick={() => handleDeleteToken(hr, employee)}>Delete</Button>
  //       </div>
  //     );
  //   }
  // };

  const handleGenerateUser = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailPattern.test(newUser)) {
      setEmailValid(true);
      setRerender(!rerender);
      generateUser({ hr: username, user: newUser });
    } else {
      setEmailValid(false);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setFilteredTokens(tokens);
    } else {
      const filtered = tokens.filter((token) => token.registration === selectedFilter);
      setFilteredTokens(filtered);
    }
  };

  return (
    
    <TokenTableWrapper>
      <div style={inputContainer}>
        <Input
          type="text"
          placeholder="Enter an Employee Email"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          style={{ width: "250px" }}
        />
        <Button onClick={handleGenerateUser}>Generate User</Button>
      </div>
      

      <Table
        dataSource={filteredTokens}
        rowKey={(record) => record.user}
        columns={[
          {
            title: "HR",
            dataIndex: "hr",
            key: "hr",
          },
          {
            title: "Employee",
            dataIndex: "user",
            key: "user",
          },
          {
            title: "token",
            dataIndex:"token",
            key: "token"
          },
          {
            title: "Status",
            dataIndex: "registration",
            key: "registration",
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <div>
                <Button
                  onClick={() => handleResendToken(record.hr, record.user)}
                  disabled={record.registration === "Registered"}
                >
                  {record.registration === "Token Expired" ||
                  record.registration === "Token Sent"
                    ? "Resend"
                    : "Send"}
                </Button>
                <Button onClick={() => handleDeleteToken(record.hr, record.user)}>
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        pagination={{ pageSize: 8 }} 
      />
    </TokenTableWrapper>
  );
};

export default TokenTable;
