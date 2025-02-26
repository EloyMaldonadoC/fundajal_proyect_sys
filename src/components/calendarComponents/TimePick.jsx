import React, { useState, useEffect } from "react";
import styles from "./module/TimePick.module.css";

function TimePick({text, timeSelect, time, validation}) {

  const handleChange = (event) => {
    timeSelect(event.target.value);
  };

  return (
    <div className={styles['time-picker-container']}>
      <label htmlFor="time" className={`${styles["time-picker-label"]} ${validation ? styles.validation : ''}`}>{text}</label>
      <input
        id="time"
        type="time"
        value={time}
        onChange={handleChange}
        className={`${styles["time-picker-input"]} ${validation ? styles.validation : ''}`}
        step="300" // 5 minutos
      />
    </div>
  );
}
export default TimePick;
