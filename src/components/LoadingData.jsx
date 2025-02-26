import styles from "./module/LoadingData.module.css";

function LoadingData({show}) {
  return (
   <div className={`${styles.modal} ${show ? styles.show : ''}`}>
     <div className={styles.contenedor}>
      <div className={styles.cuadrado1}></div>
      <div className={styles.cuadrado2}></div>
    </div>
   </div>
  );
}

export default LoadingData;
