"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import IonIcon from "@reacticons/ionicons";
import { Alert, Button, Modal } from "@/components/input/InputComponents";
import InfoMunicipio from "@/components/componentesEntrega/edicion/InfoMunicipio";
import VisualizarEmpleadosEntrega from "@/components/componentesEntrega/visualizar/VisualizarEmpleadosEntrega";
import VisualizarVehiculosEntrega from "@/components/componentesEntrega/visualizar/VisualizarVehiculosEntrega";
import TablaRecibirEntrega from "@/components/componentesEntrega/edicion/TablaRecibirEntrega";
import TablaEstadosEntrega from "@/components/componentesEntrega/edicion/TablaEstadosEntrega";
import { useSession } from "next-auth/react";
import LoadingData from "@/components/LoadingData";

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

const formatTimeWithoutSeconds = (timeString) => {
  if (timeString != null) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  } else {
    return "Hora no especificada";
  }
};

function Recibir() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [isSaved, setIsSaved] = useState(true);
  const [ocultarSeccion, setOcultarSeccion] = useState(false);

  const [max, setMax] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);

  const [entrega, setEntrega] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [listaExtraviado, setListaExtraviado] = useState([]);
  const [listaDañado, setListaDañado] = useState([]);
  const [listaNoEncontrado, setListaNoEncontrado] = useState([]);

  useEffect(() => {
    if (
      session.user.role === "Administrador" ||
      session.user.role === "Encargado" ||
      session.user.role === "Oficina" ||
      session.user.role === "Chofer"
    ) {
      //busca entrega
      fetch(`/api/entregas/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.en_estado != "recibir") {
            router.push("/entregas");
          } else {
            setEntrega(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error);
        });
      //buscar empleados relacionados con la entrega
      fetch(`/api/entregas/empleados/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmpleados(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      //busca todos los vehiculos en la entrega
      fetch(`/api/entregas/vehiculos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVehiculos(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      //buscar los productos de los paquetes
      fetch(`/api/entregas/productos/status/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is  not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length != 0) {
            const total = data.filter(
              (producto) =>
                producto.en_es_produc_estado == "cargado" ||
                producto.en_es_produc_estado == "recibido"
            );
            const dañado = data.filter(
              (producto) => producto.en_es_produc_estado == "dañado"
            );
            const extraviado = data.filter(
              (producto) => producto.en_es_produc_estado == "extraviado"
            );
            const noEncontrado = data.filter(
              (producto) => producto.en_es_produc_estado == "no encontrado"
            );
            setListaProductos(total);
            setListaDañado(dañado);
            setListaExtraviado(extraviado);
            setListaNoEncontrado(noEncontrado);
          }
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
  const intercambiarEstado = () => {
    if (
      productoSeleccionado != 0 &&
      estadoSeleccionado != "" &&
      cantidadSeleccionada != 0
    ) {
      const nuevo = listaProductos.find(
        (producto) => producto.produc_id == productoSeleccionado
      );
      const objeto = {
        ...nuevo,
        en_es_produc_cant: Number(cantidadSeleccionada),
        en_es_produc_estado: estadoSeleccionado,
      };
      //Si su estado es regresado agregar o actualizar
      if (estadoSeleccionado == "dañado") {
        const exist = listaDañado.find(
          (producto) => producto.produc_id == productoSeleccionado
        );
        console.log(exist);
        if (exist) {
          const actualizarLista = listaDañado.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant: Number(cantidadSeleccionada),
                    en_es_produc_estado: estadoSeleccionado,
                  },
                }
              : producto
          );
          setListaDañado(actualizarLista);
          const actua = listaProductos.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) +
                      Number(exist.en_es_produc_cant) -
                      Number(cantidadSeleccionada),
                  },
                }
              : producto
          );
          setListaProductos(actua);
        } else {
          const actualizarProductos = listaProductos.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) -
                      Number(cantidadSeleccionada),
                  },
                }
              : producto
          );
          setListaProductos(actualizarProductos);
          setListaDañado([...listaDañado, objeto]);
        }
      } else if (estadoSeleccionado == "extraviado") {
        const exist = listaExtraviado.find(
          (producto) => producto.produc_id == productoSeleccionado
        );
        if (exist) {
          const actualizarLista = listaExtraviado.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant: Number(cantidadSeleccionada),
                    en_es_produc_estado: estadoSeleccionado,
                  },
                }
              : producto
          );
          setListaExtraviado(actualizarLista);
          const actua = listaProductos.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) +
                      Number(exist.en_es_produc_cant) -
                      Number(cantidadSeleccionada),
                  },
                }
              : producto
          );
          setListaProductos(actua);
        } else {
          const actualizarProductos = listaProductos.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) -
                      Number(cantidadSeleccionada),
                  },
                }
              : producto
          );
          setListaProductos(actualizarProductos);
          setListaExtraviado([...listaExtraviado, objeto]);
        }
      } else if (estadoSeleccionado == "no encontrado") {
        const exist = listaNoEncontrado.find(
          (producto) => producto.produc_id == productoSeleccionado
        );
        if (exist) {
          const actualizarLista = listaNoEncontrado.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant: Number(cantidadSeleccionada),
                    en_es_produc_estado: estadoSeleccionado,
                  },
                }
              : producto
          );
          setListaNoEncontrado(actualizarLista);
          const actua = listaProductos.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) +
                      Number(exist.en_es_produc_cant) -
                      Number(cantidadSeleccionada),
                  },
                }
              : producto
          );
          setListaProductos(actua);
        } else {
          const actualizarProductos = listaProductos.map((producto) =>
            producto.produc_id == productoSeleccionado
              ? {
                  ...producto,
                  ...{
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) -
                      Number(cantidadSeleccionada),
                  },
                }
              : producto
          );
          setListaProductos(actualizarProductos);
          setListaNoEncontrado([...listaNoEncontrado, objeto]);
        }
      }
      setCantidadSeleccionada(0);
      setEstadoSeleccionado(0);
      setProductoSeleccionado(0);
    }
  };
  const handleSelectProducto = (value) => {
    const selec = listaProductos.find(
      (producto) => producto.produc_id == value
    );
    setProductoSeleccionado(value);
    setMax(selec.en_es_produc_cant);
  };
  const eliminarDeListaExtraviado = (value) => {
    //buscar en la lista
    const seleccionado = listaExtraviado.find(
      (producto) => producto.produc_id == value
    );
    //filtrar la lista de extraviados
    const nuevaLista = listaExtraviado.filter(
      (producto) => producto.produc_id != value
    );
    setListaExtraviado(nuevaLista);
    //buscar si existe en la lista de productos
    setListaProductos(
      listaProductos.map((producto) =>
        producto.produc_id == value
          ? {
              ...producto,
              en_es_produc_cant:
                Number(producto.en_es_produc_cant) +
                Number(seleccionado.en_es_produc_cant),
            }
          : producto
      )
    );
  };
  const eliminarDeListaDañado = (value) => {
    //buscar en la lista
    const seleccionado = listaDañado.find(
      (producto) => producto.produc_id == value
    );

    //filtrar la lista de dañados
    const nuevaLista = listaDañado.filter(
      (producto) => producto.produc_id != value
    );
    setListaDañado(nuevaLista);
    //buscar si existe en la lista de productos
    setListaProductos(
      listaProductos.map((producto) =>
        producto.produc_id == value
          ? {
              ...producto,
              en_es_produc_cant:
                Number(producto.en_es_produc_cant) +
                Number(seleccionado.en_es_produc_cant),
            }
          : producto
      )
    );
  };
  const eliminarDeListaNoEncontrado = (value) => {
    //buscar en la lista
    const seleccionado = listaNoEncontrado.find(
      (producto) => producto.produc_id == value
    );
    //filtrar la lista de no encontrados
    const nuevaLista = listaNoEncontrado.filter(
      (producto) => producto.produc_id != value
    );
    setListaNoEncontrado(nuevaLista);
    //buscar si existe en la lista de productos
    setListaProductos(
      listaProductos.map((producto) =>
        producto.produc_id == value
          ? {
              ...producto,
              en_es_produc_cant:
                Number(producto.en_es_produc_cant) +
                Number(seleccionado.en_es_produc_cant),
            }
          : producto
      )
    );
  };
  const handleGuardar = async () => {
    if (!isSaved) {
      setLoadingData(true);
      try {
        const lista = [
          ...listaProductos,
          ...listaDañado,
          ...listaExtraviado,
          ...listaNoEncontrado,
        ];
        console.log(lista);
        const responseDelete = await fetch(
          `/api/entregas/productos/status/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!responseDelete.ok) {
          throw new Error("Response is not ok");
        }
        const response = await fetch("/api/entregas/productos/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lista),
        });
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        setIsSaved(true);
      } catch (error) {
        setError(error);
      }
      setLoadingData(false);
    }
  };
  const validar = () => {
    if (
      listaProductos.some(
        (producto) => producto.en_es_produc_estado == "cargado"
      )
    ) {
      setShowAlert(true);
    } else {
      setShowModal(true);
    }
  };
  const terminado = async () => {
    if (isSaved) {
      try {
        await fetch(`/api/entregas/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            en_estado: "recibido",
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Response is not ok");
            }
            return response.json();
          })
          .catch((error) => {
            setError(error);
          });
      } catch (error) {
        setError(error);
      }

      router.push(`/entregas/recibido?id=${id}`);
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
          <Link href="/entregas" className={styles.link}>
            Entregas
          </Link>{" "}
          \ Recibir \{" "}
          {entrega.length != 0
            ? `${entrega.cli_municipio}, ${entrega.cli_estado}.`
            : "Cargando..."}
        </h4>
      </div>
      <div className={styles.herramientas}>
        {entrega.length != 0 && (
          <p>
            Entrega programada para el día{" "}
            <b>{getDayOfWeek(entrega.en_dia_entrega)}</b> a las{" "}
            <b>{formatTimeWithoutSeconds(entrega.en_hora_entrega)} hrs</b>
          </p>
        )}
        <div>
          <Button
            text={"Terminado"}
            onPress={() => {
              validar(), handleGuardar();
            }}
          />
          <Button
            text={isSaved ? "Guardado" : "Guardar"}
            type={"cancelar"}
            onPress={() => handleGuardar()}
          />
        </div>
      </div>
      <div className={styles.contenido}>
        <div className={styles.subContenedor1}>
          <div className={styles.cambiarEstado}>
            <select
              className={styles.select}
              onChange={(data) => {
                handleSelectProducto(data.target.value);
              }}
              value={productoSeleccionado}
            >
              <option value={0}>-Seleccionar producto-</option>
              {listaProductos.map((producto, index) => (
                <option key={index} value={producto.produc_id}>
                  {producto.produc_nombre}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              onChange={(data) => setEstadoSeleccionado(data.target.value)}
              value={estadoSeleccionado}
            >
              <option className={styles.option} value={0}>
                -Seleccionar estado-
              </option>
              <option className={styles.option} value={"extraviado"}>
                Extraviado
              </option>
              <option className={styles.option} value={"dañado"}>
                Dañado
              </option>
              <option className={styles.option} value={"no encontrado"}>
                No encontrado
              </option>
            </select>

            <div className={styles.inputNumberContainer}>
              <label>Cantidad: </label>
              <input
                className={styles.inputNumber}
                type="number"
                min={0}
                max={max}
                value={cantidadSeleccionada}
                onChange={(number) =>
                  setCantidadSeleccionada(number.target.value)
                }
              />
            </div>

            <Button
              text={"Aceptar"}
              type={"cancelar"}
              onPress={() => {
                intercambiarEstado(), setIsSaved(false);
              }}
            />
          </div>
          <TablaRecibirEntrega
            listaProductos={listaProductos}
            salida={(data) => {
              setListaProductos(data), setIsSaved(false);
            }}
          />
          {listaExtraviado.length != 0 && (
            <TablaEstadosEntrega
              titulo={"Productos Extraviados"}
              listaProductos={listaExtraviado}
              onDelete={(data) => {
                eliminarDeListaExtraviado(data), setIsSaved(false);
              }}
            />
          )}
          {listaNoEncontrado.length != 0 && (
            <TablaEstadosEntrega
              titulo={"Productos No encontrados"}
              listaProductos={listaNoEncontrado}
              onDelete={(data) => {
                eliminarDeListaNoEncontrado(data), setIsSaved(false);
              }}
            />
          )}
          {listaDañado.length != 0 && (
            <TablaEstadosEntrega
              titulo={"Productos Dañados"}
              listaProductos={listaDañado}
              onDelete={(data) => {
                eliminarDeListaDañado(data), setIsSaved(false);
              }}
            />
          )}
        </div>
        <div className={styles.subContenedor2}>
          <div className={styles.herramientasInfo}>
            <Button
              text={
                !ocultarSeccion ? (
                  <>
                    <p>Ocultar</p>
                    <IonIcon className={styles.icon} name="eye-off-outline" />
                  </>
                ) : (
                  <>
                    <p>Visualizar</p>
                    <IonIcon className={styles.icon} name="eye-outline" />
                  </>
                )
              }
              type={!ocultarSeccion ? "contenido-dark" : "contenido-light"}
              onPress={() => setOcultarSeccion(!ocultarSeccion)}
            />
          </div>
          {!ocultarSeccion && (
            <>
              <InfoMunicipio municipio={entrega} />
              <VisualizarEmpleadosEntrega
                encargado={entrega}
                empleados={empleados}
              />
              <VisualizarVehiculosEntrega vehiculos={vehiculos} />
            </>
          )}
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Productos recibidos"}
        message={"¿Todos los productos han sido recibidos?"}
        handleClose={() => setShowModal(false)}
        handleAccept={() => {
          terminado();
          setLoadingData(true);
        }}
      />
      <Alert
        show={showAlert}
        title={"Falta verificación"}
        message={"No se han verificato todos los productos"}
        handleAccept={() => setShowAlert(false)}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default Recibir;
