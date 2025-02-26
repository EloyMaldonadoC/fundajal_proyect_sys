/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import styles from "./module/CardVehiculo.module.css";

function CardVehiculo({ vehiculo }) {

  const router = useRouter();

  const handleOnClick = (id) => {
    router.push(`/vehiculos/informacion?id=${id}`);
  }

  return (
    <div className={styles.container} onClick={() => {handleOnClick(vehiculo.ve_id)}}>
      <div>
        <h4>
          {vehiculo.ve_marca} {vehiculo.ve_modelo} {vehiculo.ve_ano}
        </h4>
        <img
          src={vehiculo.ve_imagen}
          alt="Imagen de Vehiculo"
          className={styles.imagen}
        />
      </div>
      <div className={styles.datos}>
        <p className={styles.text}>Agencia: {vehiculo.ve_agencia}</p>
        <p className={styles.text}>Capacidad: {vehiculo.ve_capacidad} Kg</p>
        <p className={styles.text}>Propietario: {vehiculo.ve_propietario}</p>
        <p className={styles.text}>Entidad: {vehiculo.ve_entidad}</p>
        <p className={styles.text}>Placas: {vehiculo.ve_placas}</p>
        <div className={styles.status}>
          <p className={styles.text}>Estado Operativo: {vehiculo.ve_estatus_gen}</p>
          <div
            className={`${styles.circle} ${
              vehiculo.ve_estatus_gen == "Optimo" && styles.green
            } ${vehiculo.ve_estatus_gen == "Revisión" && styles.orange} ${
              vehiculo.ve_estatus_gen == "Fuera de Servicio" && styles.red
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default CardVehiculo;
