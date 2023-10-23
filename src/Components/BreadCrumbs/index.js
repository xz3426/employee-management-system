import React from "react";
import styles from './style.module.css';

const BreadCrumbs = ({ currentPage }) => {
  return (
    <div className={styles.breadcrumbs}>
      <a href="#">Home</a> &gt; 
      {/* <a href="#">Registration Token</a> &gt;  */}
      <span>{currentPage}</span>
    </div>
  );
};

export default BreadCrumbs;