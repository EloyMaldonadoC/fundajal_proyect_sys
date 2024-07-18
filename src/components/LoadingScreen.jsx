import React from 'react'
import styles from './LoadingScreen.module.css';

export default function loadingScreen() {
  return (
    <div className={styles.contenedor}>
        <div className={styles.cuadrado1}></div>
        <div className={styles.cuadrado2}></div>
    </div>
  )
}
