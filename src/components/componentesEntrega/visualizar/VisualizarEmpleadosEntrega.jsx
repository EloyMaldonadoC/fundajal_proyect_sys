import styles from "./module/VisualizarEmpleadosEntrega.module.css";

function VisualizarEmpleadosEntrega({ encargado, empleados }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Personal</h3>
      </div>
      <div className={styles.container}>
        <p className={styles.nombre}>
          <b>Encargado: </b>
          {encargado.emp_nombre} {encargado.emp_apellido}
        </p>
        {empleados && (
          <>
            {empleados.map((empleado, index) => (
              <p key={index} className={styles.nombre}>
                <b>{empleado.emp_rol}: </b>
                {empleado.emp_nombre} {empleado.emp_apellido}
              </p>
            ))}
          </>
        )}
      </div>
      <div className={styles.fooder}/>
    </div>
  );
}

export default VisualizarEmpleadosEntrega;
