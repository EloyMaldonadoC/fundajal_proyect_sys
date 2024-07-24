import styles from "./CardEntregaPreview.module.css";

export default function CardEntregaPreview() {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["entrega-info"]}>
        <h3 className={styles.titulo}>Nombre del poblado</h3>
        <p>hora de salida programada</p>
        <p>hora de entrega</p>
        <div className={styles.estado}>
          <p>Estado actula: en modificación</p>
          <div className={styles["led"]}/>
        </div>
      </div>
      <div className={styles["info-container"]}>
        <div className={styles["entrega-vehiculos"]}>
          <h4>Ford </h4>
        </div>
        <div className={styles["entrega-empleado"]}>
            <h4 className={styles.titulo}>Encargado de entrega</h4>
            <p>Nombre del empleado</p>
        </div>
      </div>
    </div>
  );
}
