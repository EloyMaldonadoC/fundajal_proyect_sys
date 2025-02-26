"use client";
import { useState, useEffect } from "react";
import { Button, Input, Modal } from "../input/InputComponents";
import LoadingScreen from "../LoadingScreen";
import styles from "./module/Servicios.module.css";

function Servicios({ id }) {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [seleccionado, setSeleccionado] = useState("Todos");
  const [nuevoServicio, setNuevoServicio] = useState(false);
  const [servicios, setServicios] = useState(null);

  const [estado, setEstado] = useState("pendiente");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [diaCreacion, setDiaCreacion] = useState("");
  const [horaCreacion, setHoraCreacion] = useState("");
  const [diaRealizado, setDiaRealizado] = useState("");
  const [horaRealizado, setHoraRealizado] = useState("");

  const [validarEstado, setValidarEstado] = useState(false);
  const [validarDescripcio, setValidarDescripcion] = useState(false);
  const [validarCosto, setValidarCosto] = useState(false);

  useEffect(() => {
    fetch(`/api/vehiculos/servicios/${id}`)
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        setServicios(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id, reload]);

  const onPressServiosTodos = () => {
    console.log('Todos')
    fetch(`/api/vehiculos/servicios/${id}`)
      .then((response) => {
        if (!response.ok) {
          return
        }
        return response.json();
      })
      .then((data) => {
        setServicios(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    setSeleccionado("Todos");
    setNuevoServicio(false);
  };

  const onPressServiciosPendientes = () => {
    console.log("Pendientes");
    fetch(`/api/vehiculos/servicios/filtro/pendientes/${id}`)
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        setServicios(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    setSeleccionado("Pendientes");
    setNuevoServicio(false);
  };

  const onPressServiciosRealizados = () => {
    console.log("Realizados");
    fetch(`/api/vehiculos/servicios/filtro/realizados/${id}`)
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        setServicios(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    setSeleccionado("Realizados");
    setNuevoServicio(false);
  };

  const onPressnuevoServicio = () => {
    setSeleccionado("Nuevo");
    setNuevoServicio(!nuevoServicio);
  };

  const validarEdicion = () => {
    if (descripcion == "") {
      setValidarDescripcion(true);
    }
    if (costo <= 0 || costo == "") {
      setValidarCosto(true);
    } else {
      setValidarDescripcion(false);
      setValidarCosto(false);
      setShowModal(true);
    }
  };

  const addNewServicio = async () => {
    try {
      const [dateResponse, timeResponse] = await Promise.all([
        fetch("/api/datetime/date"),
        fetch("/api/datetime/time"),
      ]);

      if (!dateResponse.ok || !timeResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const date = await dateResponse.json();
      const time = await timeResponse.json();

      setDiaCreacion(date.fecha_actual);
      setHoraCreacion(time.hora_actual);

      console.log(date.fecha_actual);
      console.log(time.hora_actual);

      await fetch(`/api/vehiculos/servicios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ve_id: id,
          ser_estado: estado,
          ser_desc: descripcion,
          ser_costo: costo,
          ser_fecha_creacion: date.fecha_actual,
          ser_hora_creacion: time.hora_actual,
          ser_fecha_realizacion: "",
          ser_hora_realizacion: "",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setShowModal(false);
          setReload(true);
          setDescripcion("");
          setCosto("");
          onPressServiosTodos();
          return response.json();
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const onPressRealizado = async (ser_id) => {
    try {
      const [dateResponse, timeResponse] = await Promise.all([
        fetch("/api/datetime/date"),
        fetch("/api/datetime/time"),
      ]);

      if (!dateResponse.ok || !timeResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const date = await dateResponse.json();
      const time = await timeResponse.json();

      setDiaRealizado(date.fecha_actual);
      setHoraRealizado(time.hora_actual);

      console.log(date.fecha_actual);
      console.log(time.hora_actual);

      await fetch(`/api/vehiculos/servicios/servicio/${ser_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ser_estado: "realizado",
          ser_fecha_realizacion: date.fecha_actual,
          ser_hora_realizacion: time.hora_actual,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("network response was not ok");
          }
          setReload(true);
          return response.json();
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const ajsutarFecha = (date) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + newDate.getTimezoneOffset() / 60);
    console.log(newDate);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.banner}>
        <h3>Servicios</h3>
      </div>
      <div className={styles.serviciosMenu}>
        <Button
          text={"Todos"}
          type={seleccionado == "Todos" ? "cancelar" : ""}
          onPress={onPressServiosTodos}
        />
        <Button
          text={"Pendientes"}
          type={seleccionado == "Pendientes" ? "cancelar" : ""}
          onPress={onPressServiciosPendientes}
        />
        <Button
          text={"Realizados"}
          type={seleccionado == "Realizados" ? "cancelar" : ""}
          onPress={onPressServiciosRealizados}
        />
        <Button
          text={"Nuevo"}
          type={seleccionado == "Nuevo" ? "cancelar" : ""}
          onPress={onPressnuevoServicio}
        />
      </div>
      {nuevoServicio ? (
        <div className={styles.servicios}>
          <div>
            <Input
              placeholder={"Descripcion"}
              type={"text"}
              value={descripcion}
              onChange={(descripcion) => {
                setDescripcion(descripcion);
              }}
              validation={validarDescripcio}
            />
            <Input
              placeholder={"Costo"}
              type={"number"}
              value={costo}
              onChange={(costo) => {
                setCosto(costo);
              }}
              validation={validarCosto}
            />
          </div>
          <Button text={"Aceptar"} type={"aceptar"} onPress={validarEdicion} />
        </div>
      ) : (
        <>
          {servicios ? (
            <div>
              {servicios.map((item) => (
                <div key={item.ser_id} className={styles.servicios}>
                  <h3>Servicio {item.ser_estado}</h3>
                  <p>
                    <span className={styles.text}> Descipción: </span>
                    {item.ser_desc}
                  </p>
                  <p>
                    <span className={styles.text}> Costo: </span>$
                    {item.ser_costo}
                  </p>
                  {item.ser_estado == "realizado" && (
                    <p>
                      <span className={styles.text}> Realizado el </span>
                      {ajsutarFecha(item.ser_fecha_realizacion)}
                      <span className={styles.text}> a las </span>
                      {item.ser_hora_realizacion}
                    </p>
                  )}
                  {item.ser_estado == "pendiente" && (
                    <div className={styles.espaciado}>
                      <Button
                        text={"Marcar como Realizado"}
                        type={"aceptar"}
                        onPress={() => {
                          onPressRealizado(item.ser_id);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.servicios}>
              <p className={styles.sinServicio}>Aún no hay servicios</p>
            </div>
          )}
        </>
      )}
      <Modal
        title={"Nuevo Servicio"}
        message={"¿Agregar nuevo servicio?"}
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
        handleAccept={addNewServicio}
      />
    </div>
  );
}

export default Servicios;
