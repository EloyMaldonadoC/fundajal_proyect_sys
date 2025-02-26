import React from 'react';
import styles from './module/Modal.module.css'

const Modal = ({ show, handleClose, handleAccept, title, message }) => {
  return (
    <div className={`${styles.modal} ${show ? styles.show : ''}`}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{message}</p>
        <button className={styles.buttonAccept} onClick={handleAccept}>Aceptar</button>
        <button className={styles.buttonCancel} onClick={handleClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;