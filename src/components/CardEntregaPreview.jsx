import styles from "./module/CardEntregaPreview.module.css";
import { useRouter } from "next/navigation";

export default function CardEntregaPreview({entrega}) {
  const router = useRouter();
  return (
    <div className={styles["card-container"]} onClick={() => {router.push(`/entregas/ver?id=${entrega.entrega.en_id}`)}} >
      <div className={styles["entrega-info"]}>
        <h3 className={styles.titulo}>{entrega.cliente.cli_municipio}, {entrega.cliente.cli_estado}.</h3>
        <p>hora de salida programada: {entrega.entrega.en_hora_salida}</p>
        <p>hora de entrega: {entrega.entrega.en_hora_entrega}</p>
        <div className={styles.estado}>
          <p>Estado actula: {entrega.entrega.en_estado}</p>
          <div className={`${styles.led } ${entrega.entrega.en_estado === "finalizada" ? styles.ledVerde : styles.ledAmarillo}`}/>
        </div>
      </div>
      <div className={styles["info-container"]}>
        <div className={styles["entrega-vehiculos"]}>
          {entrega.vehiculos.length != 0 ? (
            <>
              {entrega.vehiculos.map((vehiculo, index) => (
                <h4 key={index}>{vehiculo.ve_marca} {vehiculo.ve_modelo}</h4>
              ))}
            </>
          ) : (
            <h4>No hay vehiculos</h4>
          )}
        </div>
        <div className={styles["entrega-empleado"]}>
            <h4 className={styles.titulo}>Encargado de entrega</h4>
            <p>{entrega.encargado.emp_nombre} {entrega.encargado.emp_apellido}</p>
        </div>
      </div>
    </div>
  );
}
