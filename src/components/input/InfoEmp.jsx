"use client"
import React from "react";
import styles from "./module/InfoEmp.module.css";
import { Button } from "./InputComponents";
import { useRouter } from "next/navigation";

function InfoEmp({ empleado }) {

  const router = useRouter();

  const handlePressEditar = (id) => {
    router.push(`/empleados/editar/empleado?id=${id}`)
  }

  return (
    <>
      {empleado ? (
        <div className={styles.container}>
          <h3>Empleado</h3>
          <p>imagen</p>
          <p className={styles.text}><span>{empleado.emp_nombre} {empleado.emp_apellido}</span></p>  
          <p><span>Teléfon: </span><span className={styles.text}>{empleado.emp_num_tel}</span></p>
          <p><span>Rol: </span><span className={styles.text}>{empleado.emp_rol}</span></p>
          <p><span>Estado: </span><span className={styles.text}>{empleado.emp_estado}</span></p>
          <div className={styles.botones}>
            <Button text={'Editar'} type={'cancelar'} onPress={() => {handlePressEditar(empleado.emp_id)}}/>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <p>Seleccionar Empleado para ver información</p>
        </div>
      )}
    </>
  );
}

export default InfoEmp;
