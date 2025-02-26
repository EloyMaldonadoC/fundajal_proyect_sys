import React from 'react'
import styles from './module/Input.module.css'

function Input({placeholder, value, onChange, readOnly, validation, type}) {

  const handleTextChange = () => {
    const newValue = event.target.value;
    onChange(newValue);
  }

  return (
    <div className={styles.container}>
      <input 
        value={value}
        onChange={handleTextChange}
        readOnly={readOnly ? true : false}
        className={`${styles.input} ${validation ? styles.validation : ''}`}
        type={type}
        min={0}
    />
    <span className={`${styles.placeholder} ${value ? styles.hiden : ''} ${validation ? styles.colorValidation : ''}`}>{`${placeholder ? placeholder : ''}`}</span>
    </div>
  )
}

export default Input