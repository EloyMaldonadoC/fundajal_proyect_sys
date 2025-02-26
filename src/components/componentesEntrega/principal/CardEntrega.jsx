import { useState, useEffect } from "react";
import styles from "./module/CardEntrega.module.css";
import { useRouter } from "next/navigation";

const getDayOfWeek = (dateString) => {
  if (dateString != null) {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const monthsOfYear = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${dayOfWeek} ${day} de ${month} del ${year}`;
  } else {
    return "Aún no se ha programado una fecha de entrega";
  }
};

function CardEntrega({ entrega, disabled }) {
  const control = disabled ? true : false;
  const router = useRouter();

  const { cliente, empleados, vehiculos, encargado} = entrega;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fechaEntrega = getDayOfWeek(entrega.entrega.en_dia_entrega);


  const contolClick = () => {
    switch (true) {
      case entrega.entrega.en_estado === "en edición":
        router.push(`/entregas/entrega?id=${entrega.entrega.en_id}`);
        break;
      case entrega.entrega.en_estado === "por confirmar":
        router.push(`/entregas/entrega?id=${entrega.entrega.en_id}`);
        break;
      case entrega.entrega.en_estado === "preparación":
        router.push(`/entregas/preparacion?id=${entrega.entrega.en_id}`);
        break;
      case entrega.entrega.en_estado === "recibir":
        router.push(`/entregas/recibir?id=${entrega.entrega.en_id}`);
        break;
      case entrega.entrega.en_estado === "recibido":
        router.push(`/entregas/recibido?id=${entrega.entrega.en_id}`);
        break;
      case entrega.entrega.en_estado === "finalizada":
        router.push(`/entregas/finalizada?id=${entrega.entrega.en_id}`);
        break;
    }
  };

  if (loading)
    return (
      <div className={styles.contenedor}>
        <div className={styles.municipio}>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
        </div>
        <div className={styles.encargado}>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
        </div>
        <div className={styles.vehiculos}>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
        </div>
        <div className={styles.skeletonText}></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.contenedor} onClick={() => {control ? contolClick() : null}}>
      <div className={styles.municipio}>
        <h3 className={styles.espacioTitulo}>
          {cliente.cli_municipio}, {cliente.cli_estado}.
        </h3>
        <p className={styles.espacio}>
          <span className={styles.texto}>Día de la Entrega: </span>
          {fechaEntrega}
        </p>
      </div>
      <div className={styles.encargado}>
        <p>
          <span className={styles.texto}>Encargado: </span>
          {encargado.emp_nombre} {encargado.emp_apellido}
        </p>
        {empleados.length != 0 && (
          <div>
            {empleados.map((empleado, index) => (
              <p key={index}>
                <b>({empleado.emp_rol})</b> {empleado.emp_nombre}{" "}
                {empleado.emp_apellido}
              </p>
            ))}
          </div>
        )}
      </div>
      {vehiculos.length != 0 && (
        <div className={styles.vehiculos}>
          <h4>Vehiculo/s</h4>
          {vehiculos.map((vehiculo, index) => (
            <div key={index}>
              <p>
                {vehiculo.ve_marca} {vehiculo.ve_modelo}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className={styles.estado}>
        <div
          className={`${
            (entrega.entrega.en_estado == "en edición" || "preparación") && styles.edicion
          } ${entrega.entrega.en_estado == "finalizada" && styles.finalizado} ${
            entrega.entrega.en_estado == "cancelada" && styles.cancelado
          }`}
        />
        {entrega.entrega.en_estado}
      </div>
    </div>
  );
}

export default CardEntrega;
