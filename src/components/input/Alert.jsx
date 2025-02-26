import React from "react";
import styles from "./module/Alert.module.css"

function Alert({ show, title, message, handleAccept }) {
  return (
    <div className={`${styles.alert} ${show ? styles.show : ""}`}>
      <div className={styles.alertContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{message}</p>
        <button className={styles.buttonAccept} onClick={handleAccept}>Aceptar</button>
      </div>
    </div>
  );
}

export default Alert;
