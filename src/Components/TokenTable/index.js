// TokenTable.js

import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // Import the CSS Module
import { fetchTokens, sendToken, deleteToken, generateUser } from "services/hrwork";
import useAuth from "hooks/useAuth";

const TokenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [rerender, setRerender] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const username = useAuth().username;
  useEffect(() => {
    // Fetch tokens from the API when the component mounts
    console.log('11111!!!!');
    fetchTokens()
      .then((data) => {
        setTokens(data);
        setFilteredTokens(data); // Initialize filteredTokens with all tokens
      })
      .catch((error) => console.error("Error fetching tokens:", error));
  }, [rerender]);

  const handleResendToken = (hr, employee) => {
    // Call the sendToken API with the HR and employee data
    sendToken({ user: employee })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("Token resend successful:", response);
        setRerender(!rerender);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
        console.error("Error resending token:", error);
      });
  };

  const handleDeleteToken = (hr, employee) => {
    // Call the deleteToken API with the HR and employee data
    deleteToken({ user: employee })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("Token deletion successful:", response);
        setRerender(!rerender);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
        console.error("Error deleting token:", error);
      });
  };

  const getActionButton = (status, hr, employee) => {
    if (status === "Token Expired" || status === "Token Sent") {
      return (
        <div>
          <button onClick={() => handleResendToken(hr, employee)}>Resend</button>
          <button onClick={() => handleDeleteToken(hr, employee)}>Delete</button>
        </div>
      );
    } else if (status === "Token Not Send") {
      return (
        <div>
        <button onClick={() => handleResendToken(hr, employee)}>Send</button>
        <button onClick={() => handleDeleteToken(hr, employee)}>Delete</button>
        </div>
      );
    } else {
      return (
        <div>
        <button disabled onClick={() => handleResendToken(hr, employee)}>Send</button>
        <button onClick={() => handleDeleteToken(hr, employee)}>Delete</button>
        </div>
      );
    }
  };

  const handleGenerateUser = () => {
    // Validate email format using a regular expression
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailPattern.test(newUser)) {
      setEmailValid(true);
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
    <div>
      <input
      type="text"
      placeholder="Enter an Employee Email"
      value={newUser}
      onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={handleGenerateUser}>Generate User</button>
      {emailValid ? (
        <p style={{ color: "green" }}>Email is valid!</p>
      ) : (
        <p style={{ color: "red" }}>Invalid email format. Please enter a valid email address.</p>
      )}
      <h2 className={styles.h2}>Registration Token Table</h2>
      <label htmlFor="statusFilter">Filter by Status:</label>
      <select id="statusFilter" value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Token Not Send">Token Not Send</option>
        <option value="Token Sent">Token Sent</option>
        <option value="Token Expired">Token Expired</option>
        <option value="Registered">Registered</option>
      </select>
      <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>HR</th>
            <th className={styles.th}>Employee</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTokens.map((token, index) => (
            <tr key={token.user} className={index % 2 === 0 ? styles["tr-even"] : ""}>
              <td className={styles.td}>{token.hr}</td>
              <td className={styles.td}>{token.user}</td>
              <td className={styles.td}>{token.registration}</td>
              <td className={styles.td}>{getActionButton(token.registration, token.hr, token.user)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TokenTable;

