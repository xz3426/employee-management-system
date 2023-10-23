import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // Import the CSS Module
import { fetchUsers } from "services/hrwork";

const OnboardingTable = () =>{
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                

                setUsers(data);
            })
    },[])

    const detailExtractor = (user) => {
        // Function to extract and format user details
        // You can format the user details here as needed
        return (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Status: {user.ApplicationStatus}</p>
            {/* Add more user details here */}
          </div>
        );
      }
    const handleViewDetails = (user) => {
    // When a user clicks "View Application," set the selectedUser state
    // to the user they clicked on
    setSelectedUser(user);
    }

    return (
        <div>
            <h2 className={styles.h2}>Onboarding Application Table</h2>
            <div >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>View Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? styles["tr-even"] : ""}>
                            <td className={styles.td}>{user.name}</td>
                            <td className={styles.td}>{user.email}</td>
                            <td className={styles.td}>{user.ApplicationStatus}</td>
                            <td className={styles.td}>
                                <button onClick={() => handleViewDetails(user)}>View Application</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <div className={styles.userDetailsCard}>
                    <h3>User Details</h3>
                    {detailExtractor(selectedUser)}
                    <button onClick={() => setSelectedUser(null)}>Close</button>
                </div>
            )}
        </div>
    )





};
export default OnboardingTable;