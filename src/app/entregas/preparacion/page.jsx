"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Link from "next/link";
import InfoMunicipio from "@/components/componentesEntrega/edicion/InfoMunicipio";
import SeleccionarEmpleados from "@/components/componentesEntrega/edicion/SeleccionarEmpleados";
import TablaVisualizarProductos from "@/components/componentesEntrega/edicion/TablaVisualizarProductos";
import SeleccionarVehiculos from "@/components/componentesEntrega/edicion/SeleccionarVehiculos";
import { Alert, Button, Modal } from "@/components/input/InputComponents";
import IonIcon from "@reacticons/ionicons";
import { useSession } from "next-auth/react";
import LoadingData from "@/components/LoadingData";
import { obtenerDiaActual, obtenerHoraActual } from "@/functions/utilsFormat";

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
function Preparacion() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = searchParams.get("id");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [message, setMessage] = useState("Aún no se termina de cargar");

  const [entrega, setEntrega] = useState(null);
  const [listaProductos, setListaProductos] = useState([]);
  const [listaPaquetes, setListaPaquetes] = useState([]);
  const [totalProductos, setTotalProductos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [validarVehiculos, setValidarVehiculos] = useState(false);

  const [ocultarSeccion, setOcultarSeccion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //estados de modificacion
  const [isSaved, setIsSaved] = useState(true);
  const [isSavedVehiculos, setIsSavedVehiculos] = useState(true);
  const [isSavedProductos, setIsSavedProductos] = useState(true);
  const [isSavedEmpleados, setIsSavedEmpleados] = useState(true);

  useEffect(() => {
    if (
      session.user.role === "Administrador" ||
      session.user.role === "Oficina"
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
          if (data.en_estado != "preparación") {
            router.push("/entregas");
          } else {
            setEntrega(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error);
        });
      //Buscar estado de los productos
      fetch(`/api/entregas/productos/status/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTotalProductos(data);
          setLoading(false);
        });
      //Buscar productos
      fetch(`/api/entregas/productos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is  not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setListaProductos(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      //buscar los productos de los paquetes
      fetch(`/api/entregas/paquetes/productos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is  not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setListaPaquetes(data);
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
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
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
          setLoading(false);
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

  const guardado = async () => {
    if (!isSaved) {
      setLoadingData(true);
      try {
        console.log("Guardando...");
        /*Si los vehiculos no fueron manupulados no hacer modificaciones*/
        if (!isSavedVehiculos) {
          //Eliminar vehiculos y agregar
          const responseVehiculos = await fetch(
            `/api/entregas/vehiculos/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseVehiculos.ok) {
            console.log("No se borraron vehiculos");
          }
          if (vehiculos.length != 0) {
            const listaVehiculos = vehiculos.map((vehiculo) => ({
              ve_id: Number(vehiculo.ve_id),
              en_id: Number(id),
            }));
            const vehiculosResponse = await fetch("/api/entregas/vehiculos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(listaVehiculos),
            });
            if (!vehiculosResponse.ok) {
              throw new Error("Response is not ok");
            }
            await vehiculosResponse.json();
          }
        }
        /*Si los productos no se manipularon no hacer modificaciones*/
        if (!isSavedProductos) {
          //Eliminar y guardar productos
          const responseProductos = await fetch(
            `/api/entregas/productos/status/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseProductos.ok) {
            console.log("No se borraron los productos");
          }
          if (totalProductos.length != 0) {
            const nuevaListaProductos = totalProductos.map((producto) => ({
              en_id: Number(id),
              produc_id: Number(producto.produc_id),
              en_es_produc_estado: producto.en_es_produc_estado,
              en_es_produc_cant: Number(producto.en_es_produc_cant),
            }));
            const productosResponse = await fetch(
              "/api/entregas/productos/status",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevaListaProductos),
              }
            );
            if (!productosResponse.ok) {
              throw new Error("Response is not ok");
            }
            await productosResponse.json();
          }
        }
        /*Si los empleados no se manipularon no hacer modificaciones*/
        if (!isSavedEmpleados) {
          //Eliminar empleados y agregar
          const responseEmpleados = await fetch(
            `/api/entregas/empleados/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseEmpleados.ok) {
            console.log("No se borraron los empleados");
          }
          if (empleados.length != 0) {
            const nuevaListaEmpleados = empleados.map((empleado) => ({
              en_id: Number(id),
              emp_id: Number(empleado.emp_id),
            }));

            const empleadosResponse = await fetch("/api/entregas/empleados", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(nuevaListaEmpleados),
            });
            if (!empleadosResponse.ok) {
              throw new Error("Response is not ok");
            }
            await empleadosResponse.json();
          }
        }
        setIsSaved(true);
        setLoadingData(false);
        console.log("Guardado");
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  };
  const validar = () => {
    if (
      empleados.length != 0 &&
      vehiculos.length != 0 &&
      totalProductos.length != 0
    ) {
      if (
        totalProductos.some(
          (producto) => producto.en_es_produc_estado === "en edición"
        )
      ) {
        setMessage("Aún no se termina de cargar");
        return false;
      } else {
        return true;
      }
    } else {
      switch (true) {
        case empleados.length === 0:
          setMessage("No se agregaron empleados");
          break;
        case vehiculos.length === 0:
          setMessage("No se agregaron vehiculos");
          break;
        case totalProductos.length === 0:
          setMessage("Aún no se termina de cargar");
          break;
      }
      return false;
    }
  };
  const terminado = () => {
    const resultado = validar();
    if (resultado === true) {
      setShowModal(true);
    } else {
      setShowAlert(true);
    }
  };
  const terminarCarga = async () => {
    if (isSaved) {
      //Historial de salida
      const historial = totalProductos.map((producto) => {
        return {
          produc_id: producto.produc_id,
          hist_estado: "salida",
          hist_cantidad: producto.en_es_produc_cant,
          hist_precio_ent_sal: producto.produc_precio_venta,
          hist_hora: obtenerHoraActual(),
          hist_dia: obtenerDiaActual(),
          hist_motivo: "entrega",
        };
      });
      const responseHistorial = await fetch(`/api/inventario/historial/lista`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historial),
      })
      if (!responseHistorial.ok) {
          throw new Error("Response post historia is not ok");
        }
      
      //editar estado de los productos
      const responseProductos = await fetch(`/api/entregas/productos/removeInventary`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(totalProductos),
      });

      if (!responseProductos.ok) {
        throw new Error("Response is not ok");
      }
      
      //editar estado de la entrega
      const responseEstado = await fetch(`/api/entregas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ en_estado: "recibir" }),
      });
      if (!responseEstado.ok) {
        throw new Error("Response is not ok");
      }

      router.push(`/entregas`);
    }
  };
  const handleEdit = async () => {
    await fetch(`/api/entregas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ en_estado: "en edición" }),
    })
    await fetch(`/api/entregas/productos/status/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ en_id: id }),
    })
    router.push(`/entregas/entrega?id=${id}`);
  }

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
          \ Preparación \{" "}
          {entrega
            ? `${entrega.cli_municipio}, ${entrega.cli_estado}.`
            : "Cargando..."}
        </h4>
      </div>
      <div className={styles.herramientas}>
        {entrega && (
          <p>
            Entrega programada para el día{" "}
            <b>{getDayOfWeek(entrega.en_dia_entrega)}</b> a las{" "}
            <b>{formatTimeWithoutSeconds(entrega.en_hora_entrega)} hrs</b>
          </p>
        )}
        <div>
          {session.user.role === "Administrador" && (
            <Button
              text={"Editar"}
              type={"contenido-dark"}
              onPress={() => handleEdit()}
            />
          )}
          <Button
            text={"Terminado"}
            type={""}
            onPress={() => {
              terminado();
              guardado();
            }}
          />
          <Button
            text={isSaved ? "Guardado" : "Guardar"}
            type={"cancelar"}
            onPress={() => {
              guardado();
            }}
          />
        </div>
      </div>
      <div className={styles.contenido}>
        <div className={styles.subContenedor1}>
          <TablaVisualizarProductos
            id={id}
            productos={listaProductos}
            paquetes={listaPaquetes}
            total={(data) => {
              {
                setTotalProductos(data);
                setIsSaved(false);
                setIsSavedProductos(false);
              }
            }}
            productoEstado={totalProductos}
          />
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
              <SeleccionarEmpleados
                id={id}
                encargado={entrega}
                empleados={empleados}
                seleccionados={(data) => {
                  setEmpleados(data);
                  setIsSaved(false);
                  setIsSavedEmpleados(false);
                }}
              />
              <SeleccionarVehiculos
                lista={vehiculos}
                id={id}
                vehiculosSeleccionados={(data) => {
                  setVehiculos(data);
                  setIsSaved(false);
                  setIsSavedVehiculos(false);
                }}
                validar={validarVehiculos}
              />
            </>
          )}
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Todo Listo"}
        message={`La entrega se marcara como "recibir", una vez recibida el encargado entregara y validara los datos`}
        handleClose={() => setShowModal(false)}
        handleAccept={() => {
          guardado();
          setLoadingData(true);
          terminarCarga();
        }}
      />
      <Alert
        show={showAlert}
        title={"Faltan datos"}
        message={message}
        handleAccept={() => setShowAlert(false)}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default Preparacion;
