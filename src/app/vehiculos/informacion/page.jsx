/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import { Button, Input, Select } from "@/components/input/InputComponents";
import { DatePick } from "@/components/calendarComponents/CalendarComponents";
import Servicios from "@/components/cardComponents/Servicios";
import { useSession } from "next-auth/react";
import IonIcon from "@reacticons/ionicons";

function SelectEstado({ data, onSelect, validar, text, value }) {
  const [valor, setValor] = useState("Optimo");

  useEffect(() => {
    if (value == "Optimo") {
      setValor("Optimo");
    } else if (value == "Revisión") {
      setValor("Revisión");
    } else if (value == "Fuera de Servicio") {
      setValor("Fuera de Servicio");
    }
  }, [value]);

  return (
    <div className={styles.containerVe}>
      <p>{text}</p>
      <select
        value={valor}
        className={`${styles.selectVe} ${validar ? styles.validarVe : ""}`}
        onChange={(e) => onSelect(e.target.value)}
        style={{ borderColor: validar ? "red" : "" }}
      >
        {data.map((d) => (
          <option key={d.id} value={d.nombre}>
            {d.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoVehiculo() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [edicion, setEdicion] = useState(false);
  const [editarObservaciones, setEditarObservaciones] = useState(false);
  const [editarSeguro, setEditarSeguro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nuevaObservacion, setNuevaObservacion] = useState("");
  const [validarNuevaObservacion, setValidarNuevaObservacion] = useState(false);
  const [nuevoNombreSeguro, setNuevoNombreSeguro] = useState("");
  const [validarNombreSeguro, setValidarNombreSeguro] = useState(false);
  const [nuevoMontoSeguro, setNuevoMontoSeguro] = useState("");
  const [validarNuevoMontoSeguro, setValidarNuevoMontoSeguro] = useState(false);
  const [nuevaVigenciaSeguro, setNuevaVigenciaSeguro] = useState("");
  const [ValidarVigenciaSeguro, setValidarVigenciaSeguro] = useState("");

  const [veAgencia, setVeAgencia] = useState("");
  const [validarVeAgencia, setValidarVeAgencia] = useState(false);
  const [veCapacidad, setVeCapacidad] = useState("");
  const [validarVeCapacidad, setValidarVeCapacidad] = useState(false);
  const [vePropietario, setVePropietario] = useState("");
  const [validarVePropietario, setValidarVePropietario] = useState(false);
  const [veEntidad, setVeEntidad] = useState("");
  const [validarVeEntidad, setValidarVeEntidad] = useState(false);
  const [vePlacas, setVePlacas] = useState("");
  const [validarVePlacas, setValidarVePlacas] = useState(false);
  const [veEstado, setVeEstado] = useState("");
  const [veEstadoValidar, setVeEstadoValidar] = useState(false);

  const [seguro, setSeguro] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    if (session.user.role === "Administrador") {
      fetch(`/api/vehiculos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVehiculo(data);
          setVeAgencia(data.ve_agencia);
          setVeCapacidad(data.ve_capacidad);
          setVePropietario(data.ve_propietario);
          setVeEntidad(data.ve_entidad);
          setVePlacas(data.ve_placas);
          setVeEstado(data.ve_estatus_gen);
          setNuevaObservacion(data.ve_observaciones);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      fetch(`/api/vehiculos/seguro/${id}`)
        .then((response) => {
          if (!response.ok) {
            return;
          }
          return response.json();
        })
        .then((data) => {
          setSeguro(data);
          data ? setNuevoNombreSeguro(data.segu_nombre) : "";
          data ? setNuevoMontoSeguro(data.segu_monto_pago) : "";
          data ? setNuevaVigenciaSeguro(ajsutarFecha(data.segu_vigencia)) : "";
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);

  const ajsutarFecha = (date) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + newDate.getTimezoneOffset() / 60);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const onPressObservacionesEditarMenu = () => {
    setEditarObservaciones(!editarObservaciones);
  };

  const onPressObservacionesEditar = () => {
    if (nuevaObservacion == "") {
      setValidarNuevaObservacion(true);
      return;
    }
    setValidarNuevaObservacion(false);
    fetch(`/api/vehiculos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ve_observaciones: nuevaObservacion,
      }),
    });
    setEditarObservaciones(false);
    console.log(nuevaObservacion);
  };

  const onPressSeguroEditarMenu = () => {
    setEditarSeguro(!editarSeguro);
  };

  const onPressSeguroEditar = () => {
    if (nuevoNombreSeguro == "") {
      setValidarNombreSeguro(true);
    }
    if (nuevoMontoSeguro <= 0) {
      setValidarNuevoMontoSeguro(true);
    }
    if (nuevaVigenciaSeguro == "") {
      setValidarVigenciaSeguro(true);
    } else if (nuevoNombreSeguro != "" && nuevoMontoSeguro != "") {
      setValidarNombreSeguro(false);
      setValidarNuevoMontoSeguro(false);
      setValidarVigenciaSeguro(false);
      const data = {
        ve_id: id,
        segu_nombre: nuevoNombreSeguro,
        segu_monto_pago: nuevoMontoSeguro,
        segu_vigencia: nuevaVigenciaSeguro,
      };
      if (!seguro) {
        console.log("no existe seguro");
        fetch("/api/vehiculos/seguro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        console.log("?");
        fetch(`/api/vehiculos/seguro/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      window.location.reload();
    }
  };

  const validarInformacion = () => {
    if (veAgencia == "") {
      setValidarVeAgencia(true);
    }
    if (veCapacidad <= 0 || veCapacidad == "") {
      setValidarVeCapacidad(true);
    }
    if (vePropietario == "") {
      setValidarVePropietario(true);
    }
    if (veEntidad == "") {
      setValidarVeEntidad(true);
    }
    if (vePlacas == "") {
      setValidarVePlacas(true);
    } else {
      fetch(`/api/vehiculos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ve_agencia: veAgencia,
          ve_capacidad: veCapacidad,
          ve_entidad: veEntidad,
          ve_propietario: vePropietario,
          ve_placas: vePlacas,
          ve_estatus_gen: veEstado,
        }),
      });
      setEdicion(!edicion);
    }
  };

  if (loading)
    return (
      <div className={styles.loadingScreen}>
        <LoadingScreen />
      </div>
    );
  if (error)
    return (
      <div className={styles.error}>
        <div className={styles.errorContent}>
          <IonIcon
            className={styles.textIcon}
            name="cloud-offline-outline"
          ></IonIcon>
          <p className={styles.textError}>No hay Conexión</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/vehiculos" className={styles.link}>
            Vehiculos
          </Link>{" "}
          \ Información
        </h4>
      </div>
      {vehiculo ? (
        <div className={styles.container}>
          <div className={styles.subConteiner1}>
            <div className={styles.vehiculo}>
              <img
                className={styles.imagen}
                src={vehiculo.ve_imagen}
                alt="imagen del vehiculo"
              />
              <h3 className={styles.titulo}>
                {vehiculo.ve_marca} {vehiculo.ve_modelo} {vehiculo.ve_ano}
              </h3>
            </div>
            <div className={styles.banner}>
              <h3>Observaciones</h3>
            </div>
            <div className={styles.observaciones}>
              {!editarObservaciones ? (
                <div className={styles.observacionesContenido}>
                  <p>{nuevaObservacion}</p>
                </div>
              ) : (
                <div className={styles.observacionesContenido}>
                  <Input
                    placeholder={"Editar Observaciones"}
                    value={nuevaObservacion}
                    onChange={(nuevo) => {
                      setNuevaObservacion(nuevo);
                    }}
                    type={"text"}
                    validation={validarNuevaObservacion}
                  />
                  <Button
                    text={"Aceptar"}
                    type={"aceptar"}
                    onPress={onPressObservacionesEditar}
                  />
                </div>
              )}
              <Button
                text={`${!editarObservaciones ? "Editar" : "Cancelar"}`}
                type={"aceptar"}
                onPress={onPressObservacionesEditarMenu}
              />
            </div>
            <div className={styles.banner}>
              <h3>Seguro</h3>
            </div>
            <div className={styles.seguro}>
              <div className={styles.seguroContenido}>
                {!editarSeguro ? (
                  <div>
                    {seguro ? (
                      <div>
                        <p>
                          <span className={styles.text}> Nombre: </span>
                          {seguro.segu_nombre}
                        </p>
                        <p>
                          <span className={styles.text}> Monto: </span>$
                          {seguro.segu_monto_pago}
                        </p>
                        <p>
                          <span className={styles.text}> Vigencia: </span>
                          {ajsutarFecha(seguro.segu_vigencia)}
                        </p>
                      </div>
                    ) : (
                      <div className={styles.sinSeguro}>
                        <p>No hay seguro</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Input
                      type={"text"}
                      placeholder={"Nombre"}
                      value={nuevoNombreSeguro}
                      onChange={(nombre) => {
                        setNuevoNombreSeguro(nombre);
                      }}
                      validation={validarNombreSeguro}
                    />
                    <Input
                      type={"number"}
                      placeholder={"Monto"}
                      value={nuevoMontoSeguro}
                      onChange={(monto) => {
                        setNuevoMontoSeguro(monto);
                      }}
                      validation={validarNuevoMontoSeguro}
                    />
                    <DatePick
                      text={"Vigencia: "}
                      value={nuevaVigenciaSeguro}
                      onChange={(vigencia) => {
                        setNuevaVigenciaSeguro(vigencia);
                      }}
                      validation={ValidarVigenciaSeguro}
                    />
                    <Button
                      text={"Aceptar"}
                      type={"aceptar"}
                      onPress={onPressSeguroEditar}
                    />
                  </div>
                )}
              </div>
              <Button
                text={!editarSeguro ? "Editar" : "Cancelar"}
                type={"aceptar"}
                onPress={onPressSeguroEditarMenu}
              />
            </div>
          </div>
          <div className={styles.subConteiner2}>
            <div className={styles.banner}>
              <h3>Información</h3>
            </div>
            <div className={styles.informacion}>
              <h3 className={styles.titulo}>
                {vehiculo.ve_marca} {vehiculo.ve_modelo} {vehiculo.ve_ano}
              </h3>
              <div className={styles.infoContainer}>
                <div className={styles.infoTexto}>
                  <p className={styles.separacion}>
                    <span className={styles.text}>Agencia:</span> {veAgencia}
                  </p>
                  <p className={styles.separacion}>
                    <span className={styles.text}>Capacidad: </span>
                    {veCapacidad} Kg
                  </p>
                  <p className={styles.separacion}>
                    <span className={styles.text}>Propietario: </span>
                    {vePropietario}
                  </p>
                  <p className={styles.separacion}>
                    <span className={styles.text}>Entidad: </span>
                    {veEntidad}
                  </p>
                  <p className={styles.separacion}>
                    <span className={styles.text}>Placa: </span>
                    {vePlacas}
                  </p>
                  <p className={styles.separacion}>
                    <span className={styles.text}>Estado: </span>
                    {veEstado}
                  </p>
                </div>
                <div className={styles.infoEdicion}>
                  {edicion && (
                    <div>
                      <Input
                        placeholder={"Agencia"}
                        type={"text"}
                        value={veAgencia}
                        onChange={(agencia) => {
                          setVeAgencia(agencia);
                        }}
                        validation={validarVeAgencia}
                      />
                      <Input
                        placeholder={"Capacidad"}
                        type={"text"}
                        value={veCapacidad}
                        onChange={(capacidad) => {
                          setVeCapacidad(capacidad);
                        }}
                        validation={validarVeCapacidad}
                      />
                      <Input
                        placeholder={"Propietarios"}
                        type={"text"}
                        value={vePropietario}
                        onChange={(propietario) => {
                          setVePropietario(propietario);
                        }}
                        validation={validarVePropietario}
                      />
                      <Input
                        placeholder={"Entidad"}
                        type={"text"}
                        value={veEntidad}
                        onChange={(entidad) => {
                          setVeEntidad(entidad);
                        }}
                        validation={validarVeEntidad}
                      />
                      <Input
                        placeholder={"Placa"}
                        type={"text"}
                        value={vePlacas}
                        onChange={(placas) => {
                          setVePlacas(placas);
                        }}
                        validation={validarVePlacas}
                      />
                      <SelectEstado
                        data={[
                          { id: 1, nombre: "Optimo" },
                          { id: 2, nombre: "Revisión" },
                          { id: 3, nombre: "Fuera de Servicio" },
                        ]}
                        onSelect={(e) => setVeEstado(e)}
                        validar={veEstadoValidar}
                        text={"Estado: "}
                        value={veEstado}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.infoBotones} ${
                    !edicion ? styles.noEdicion : styles.enEdicion
                  }`}
                >
                  {!edicion ? (
                    <Button
                      text={"Editar"}
                      type={"aceptar"}
                      onPress={() => {
                        setEdicion(!edicion);
                      }}
                    />
                  ) : (
                    <>
                      <div className={styles.empySpace} />
                      <div className={styles.botonesEdicion}>
                        <Button
                          text={"Cancelar"}
                          type={"aceptar"}
                          onPress={() => {
                            setEdicion(!edicion);
                          }}
                        />
                        <Button
                          text={"Guardar Cambios"}
                          type={"aceptar"}
                          onPress={validarInformacion}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Servicios id={id} />
          </div>
        </div>
      ) : (
        <div className={styles.carga}>
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}

export default InfoVehiculo;
