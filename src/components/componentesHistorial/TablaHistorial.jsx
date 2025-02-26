import { formatNumber, getDayOfWeek } from "@/functions/utilsFormat";
import styles from "./module/TablaHistorial.module.css";
import IonIcon from "@reacticons/ionicons";

function TablaHistorial({ historial }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Historial de entradas y salidad de productos</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.estado}>Estado</h4>
        <h4 className={styles.motivo}>Motivo</h4>
        <h4 className={styles.cantidad}>Cant</h4>
        <h4 className={styles.fecha}>Día</h4>
        <h4 className={styles.hora}>Hora</h4>
      </div>
      {historial.map((item, index) => (
        <div className={styles.container} key={index}>
          <div className={styles.nombre}>{item.produc_nombre}</div>
          <div className={styles.estado}>
            {item.hist_estado == "salida" ? (
              <IonIcon name="caret-up-outline" className={styles.rojo}/>
            ) : (
              <IonIcon name="caret-down-outline" className={styles.verde}/>
            )}
          </div>
          <div className={styles.motivo}>{item.hist_motivo}</div>
          <div className={styles.cantidad}>{item.hist_cantidad}</div>
          
          <div className={styles.fecha}>{getDayOfWeek(item.hist_dia)}</div>
          <div className={styles.hora}>{item.hist_hora}</div>
        </div>
      ))}
      <div className={styles.fooder} />
    </div>
  );
}

export default TablaHistorial;
