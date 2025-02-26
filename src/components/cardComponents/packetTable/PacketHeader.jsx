import styles from "./module/PacketHeader.module.css";

function PacketHeader() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.fila}>
        <h4 className={styles.celda}>Nombre</h4>
        <h4 className={styles.celda}>Descripción</h4>
        <h4 className={styles.celda}>Precio</h4>
        <h4 className={styles.celda}>Comisión</h4>
      </div>
    </div>
  );
}

export default PacketHeader;
