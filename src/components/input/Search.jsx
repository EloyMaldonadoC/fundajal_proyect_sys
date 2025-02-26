import React, { useState } from "react";
import styles from "./module/Serch.module.css";
import IonIcon from "@reacticons/ionicons";

function Search({ placeholder, onSearch, type }) {
  const [serch, setSerch] = useState("");

  const handleTextChange = () => {
    const newValue = event.target.value;
    setSerch(newValue);
  };

  const handlePressSearch = () => {
    onSearch(serch);
  };

  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        value={serch}
        onChange={handleTextChange}
        className={styles.input}
      />
      <button
        className={`
          ${type == "light" ? styles.light : styles.button} 
          ${type == "dark" ? styles.darck : styles.button}
          `}
        onClick={handlePressSearch}
      >
          Buscar
      </button>
    </div>
  );
}

export default Search;
