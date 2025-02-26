import React from 'react'
import styles from './module/LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.contenedor}>
        <div className={styles.cuadrado1}></div>
        <div className={styles.cuadrado2}></div>
    </div>
  )
}
