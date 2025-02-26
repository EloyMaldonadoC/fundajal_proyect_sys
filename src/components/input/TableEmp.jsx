import React, { useEffect } from "react";
import styles from './module/TableEmp.module.css'

function TableEmp({ empleados, onClickRow }) {

  useEffect(() => {}, [empleados]);

  const handleClickRow = (id) => {
    onClickRow(id)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Estado</th>
          <th>Teléfono</th>
          <th>Rol</th>
          <th>Hora Entrada</th>
          <th>Hora Salida</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((item) => item.emp_rol != "Administrador" && (
          <tr key={item.emp_id} onClick={() => {handleClickRow(item.emp_id)}}>
            <td>{item.emp_nombre}</td>
            <td>{item.emp_apellido}</td>
            <td className={styles.cellCircle}><div className={`${styles.circle} ${item.emp_estado == 'disponible' ? styles.green : styles.red}`}/></td>
            <td>{item.emp_num_tel}</td>
            <td>{item.emp_rol}</td>
            <td>{item.emp_hora_entrada}</td>
            <td>{item.emp_hora_salida}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableEmp;
