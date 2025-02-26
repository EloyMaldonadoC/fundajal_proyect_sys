import styles from "./module/SeleccionarFecha.module.css";
import {
  DatePick,
  TimePick,
} from "@/components/calendarComponents/CalendarComponents";

function SeleccionarFecha({
  fechaEntrega,
  fechaSalida,
  onChangeDate,
  onChangeExit,
  horaSalida,
  onChangeHoraSalida,
  horaEntrega,
  onChangeHoraEntrega,
  validar,
}) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Horarios de entrega</h3>
      </div>
      <div className={styles.container}>
        <DatePick
          text={"Fecha de Entrega: "}
          value={fechaEntrega}
          onChange={(date) => onChangeDate(date)}
          validation={validar && fechaEntrega == "" ? true : false}
        />
        <TimePick
          text={"Hora de Entrega: "}
          time={horaEntrega}
          timeSelect={(hour) => onChangeHoraEntrega(hour)}
          validation={validar && horaEntrega == "" ? true : false}
        />
        <DatePick
          text={"Fecha de Salida: "}
          value={fechaSalida}
          onChange={(date) => onChangeExit(date)}
          validation={validar && fechaSalida == "" ? true : false}
        />
        <TimePick
          text={"Hora de Salida: "}
          time={horaSalida}
          timeSelect={(hour) => onChangeHoraSalida(hour)}
          validation={validar && horaSalida == "" ? true : false}
        />
      </div>
      <div className={styles.fooder} />
    </div>
  );
}

export default SeleccionarFecha;
