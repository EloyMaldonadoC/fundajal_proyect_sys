"use client";
import { useState, useEffect } from "react";
import styles from "./module/CheckBox.module.css";

function CheckBox({ value, onSelect, onUnselect, inicialiced }) {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if(inicialiced) {
      for(let i = 0; i < inicialiced.length; i++) {
        if(inicialiced[i].produc_id == value ){
          setIsChecked(true);
        }
      }
    }
  }, [value, inicialiced])

  const handleTextChange = () => {
    const newValue = event.target.value;
    
    if(!isChecked) {
      onSelect(newValue);
    } else {
      onUnselect(newValue);
    }
    setIsChecked(!isChecked);
  };

  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={isChecked}
      value={value}
      onChange={handleTextChange}
    />
  );
}

export default CheckBox;
