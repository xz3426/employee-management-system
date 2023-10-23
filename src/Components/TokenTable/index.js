// TokenTable.js

import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // Import the CSS Module
import { fetchTokens, sendToken, deleteToken, generateUser } from "services/hrwork";

const TokenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredTokens, setFilteredTokens] = useState([]);

  useEffect(() => {
    // Fetch tokens from the API when the component mounts
    fetchTokens()
      .then((data) => {
        setTokens(data);
        setFilteredTokens(data); // Initialize filteredTokens with all tokens
      })
      .catch((error) => console.error("Error fetching tokens:", error));
  }, []);

  const handleResendToken = (hr, employee) => {
    // Call the sendToken API with the HR and employee data
    sendToken({ user: employee })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("Token resend successful:", response);

        // After sending the token, update the token list
        fetchTokens()
          .then((data) => {
            setTokens(data);
            setFilteredTokens(data); // Update the filtered tokens as well
          })
          .catch((error) => console.error("Error fetching tokens:", error));
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

        // After deleting the token, update the token list
        fetchTokens()
          .then((data) => {
            setTokens(data);
            setFilteredTokens(data); // Update the filtered tokens as well
          })
          .catch((error) => console.error("Error fetching tokens:", error));
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
        console.error("Error deleting token:", error);
      });
  };

  const getActionButton = (status, hr, employee) => {
    if (status === "Token Expired" || status === "Token Sent") {
      return (
        <button onClick={() => handleResendToken(hr, employee)}>
          Resend
        </button>
      );
    } else if (status === "Token Not Send") {
      return (
        <button onClick={() => handleResendToken(hr, employee)}>
          Send
        </button>
      );
    } else {
      return (
        <button onClick={() => handleDeleteToken(hr, employee)}>
          Delete
        </button>
      );
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
            <tr key={token.id} className={index % 2 === 0 ? styles["tr-even"] : ""}>
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

