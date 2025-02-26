import React from "react";
import styles from "./module/Button.module.css";

function Button({ text, onPress, type, disabled}) {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`
        ${styles.container}
        ${type == "aceptar" ? styles.aceptar : styles.default} 
        ${type == "cancelar" ? styles.cancelar : styles.default}
        ${type == "contenido-light" ? styles.contentLight : styles.default}
        ${type == "contenido-dark" ? styles.contentDark : styles.default}
      `}
    >
      {text}
    </button>
  );
}

export default Button;
