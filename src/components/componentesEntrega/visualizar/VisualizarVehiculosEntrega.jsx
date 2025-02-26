import styles from "./module/VisualizarVehiculosEntrega.module.css";

function VisualizarVehiculosEntrega({ vehiculos }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Vehiculos</h3>
      </div>
      <div className={styles.container}>
        {vehiculos.length != 0 ? (
          <>
            {vehiculos.map((vehiculo, index) => (
              <p key={index}>{vehiculo.ve_marca} {vehiculo.ve_modelo} {vehiculo.ve_ano}</p>
            ))}
          </>
        ) : (
          <p>Aún no se han asignado vehiculos</p>
        )}
      </div>
      <div className={styles.fooder}/>
    </div>
  );
}

export default VisualizarVehiculosEntrega;
