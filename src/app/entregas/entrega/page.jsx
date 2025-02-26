"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import LoadingScreen from "@/components/LoadingScreen";
import { Button, Modal } from "@/components/input/InputComponents";
import SeleccionarEmpleados from "@/components/componentesEntrega/edicion/SeleccionarEmpleados";
import InfoMunicipio from "@/components/componentesEntrega/edicion/InfoMunicipio";
import TablaEditarProductos from "@/components/componentesEntrega/edicion/TablaEditarProductos";
import TablaEditarPaquetes from "@/components/componentesEntrega/edicion/TablaEditarPaquetes";
import SeleccionarFecha from "@/components/componentesEntrega/edicion/SeleccionarFecha";
import IonIcon from "@reacticons/ionicons";
import { formatNumber } from "@/functions/utilsFormat";
import { TablaSeleccionProductos } from "@/components/componentesEntrega/nuevo/nuevaEntrega";
import VisualizarContenidoDeEntrega from "@/components/componentesEntrega/visualizar/VisualizarContenidoDeEntrega";
import { useSession } from "next-auth/react";
import LoadingData from "@/components/LoadingData";

function Entrega() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCancelarEntrega, setShowCancelarEntrega] = useState(false);
  const [saved, setSaved] = useState(true);
  const [ocultarSeccion, setOcultarSeccion] = useState(false);

  //estados de guardado
  const [modificoEntrega, setModificoEntrega] = useState(false);
  const [modificoProductos, setModificoProductos] = useState(false);
  const [modificoPaquetes, setModificoPaquetes] = useState(false);
  const [modificoAbono, setModificoAbono] = useState(false);

  const [entrega, setEntrega] = useState(null);
  const [deuda, setDeuda] = useState(0);
  const [abono, setAbono] = useState(0);
  const [encargado, setEncargado] = useState(0);

  const [fechaEntrega, setfechaEntrega] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [horaEntrega, setHoraEntrega] = useState("");
  const [validarHorarios, setValidarHorarios] = useState(false);

  const [listaProductos, setListaProductos] = useState([]);
  const [listaPaquetes, setListaPaquetes] = useState([]);
  const [validarProductos, setValidarProductos] = useState(false);

  const [incrementoProductos, setIncrementoProductos] = useState(0);
  const [incrementoPaquetes, setIncrementoPaquetes] = useState(0);

  //visualizar
  const [mostrarSeleccion, setMostrarSeleccion] = useState(true);
  const [mostararListado, setMostrarListado] = useState(false);

  //deudas
  const [deudaProductos, setDeudaProductos] = useState(0);
  const [deudaPaquetes, setDeudaPaquetes] = useState(0);
  const [deudaComisionFunjal, setDeudaComisionFunjal] = useState(0);
  const [deudaComisionEnlace, setDeudaComisionEnlace] = useState(0);

  useEffect(() => {
    //bucaca la entrega
    {
      fetch(`/api/entregas/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Entrega no encontrada");
          }
          return response.json();
        })
        .then((data) => {
          if (
            session.user.role === "Administrador" ||
            data.emp_id === session.user.id
          ) {
            setEntrega(data);
            setEncargado(data.emp_id);
            setIncrementoProductos(data.en_incremento_producto);
            setIncrementoPaquetes(data.en_incremento_paquete);
            setfechaEntrega(
              data.en_dia_entrega ? data.en_dia_entrega.split("T")[0] : ""
            );
            setFechaSalida(
              data.en_dia_salida ? data.en_dia_salida.split("T")[0] : ""
            );
            setHoraEntrega(data.en_hora_entrega ? data.en_hora_entrega : "");
            setHoraSalida(data.en_hora_salida ? data.en_hora_salida : "");
            if (
              data.en_estado == "en edición" ||
              data.en_estado == "por confirmar"
            ) {
              setLoading(false);
            } else {
              router.push("/entregas");
            }
          } else {
            router.push("/");
          }
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    //busca los productos de la entrega
    {
      fetch(`/api/entregas/productos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is  not ok");
          }
          return response.json();
        })
        .then((data) => {
          setListaProductos(data);
        })
        .catch((error) => {
          setError(error);
        });
    }
    //busca todos los paquestes de la entrega
    {
      fetch(`/api/entregas/paquetes/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al encontrar los paquetes");
          }
          return response.json();
        })
        .then((data) => {
          setListaPaquetes(data);
          if (data.length != 0 && data[0].en_pa_desc != null) {
            setIncrementoPaquetes(Number(data[0].en_pa_desc));
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);

  useEffect(() => {
    //Busca si existe una deuda
    fetch(`/api/entregas/deudas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAbono(data.deu_abono);
        setDeuda(data.deu_deuda);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  useEffect(() => {
    if (listaProductos.length != 0) {
      let deudaProduc = 0;
      for (let i = 0; i < listaProductos.length; i++) {
        deudaProduc =
          deudaProduc +
          listaProductos[i].en_produc_cantidad *
            (listaProductos[i].produc_precio_venta +
              listaProductos[i].en_produc_oferta);
      }
      setDeudaProductos(deudaProduc);
    } else {
      setDeudaProductos(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listaProductos]);

  useEffect(() => {
    if (listaPaquetes.length != 0) {
      let deudaPaq = 0;
      for (let i = 0; i < listaPaquetes.length; i++) {
        deudaPaq =
          deudaPaq +
          listaPaquetes[i].en_pa_cantidad *
            (listaPaquetes[i].pa_precio + listaPaquetes[i].en_pa_desc);
      }
      setDeudaPaquetes(deudaPaq);
    } else {
      setDeudaPaquetes(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listaPaquetes]);

  useEffect(() => {
    if (listaProductos.length != 0) {
      let deuFunjal = 0;
      let deuEnlace = 0;
      for (let i = 0; i < listaProductos.length; i++) {
        deuFunjal =
          deuFunjal +
          listaProductos[i].produc_parti_fun * listaProductos[i].en_produc_cantidad;
        deuEnlace =
          deuEnlace +
          listaProductos[i].produc_parti_enlace * listaProductos[i].en_produc_cantidad;
      }
      for (let i = 0; i < listaPaquetes.length; i++) {
        deuFunjal =
          deuFunjal +
          listaPaquetes[i].pa_comision * listaPaquetes[i].en_pa_cantidad;
        deuEnlace =
          deuEnlace +
          listaPaquetes[i].pa_comision * listaPaquetes[i].en_pa_cantidad;
      }
      setDeudaComisionFunjal(deuFunjal);
      setDeudaComisionEnlace(deuEnlace);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deudaProductos, listaPaquetes, listaProductos]);

  useEffect(() => {
    setDeuda(deudaProductos + deudaPaquetes);
  }, [deudaProductos, deudaPaquetes]);

  const handlePressSave = async () => {
    if (!saved) {
      setLoadingData(true);
      try {
        //si hubieron modificaciones en la entrega guardar las modificaciones
        if (modificoEntrega) {
          await fetch(`/api/entregas/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              en_dia_entrega: new Date(fechaEntrega),
              en_hora_entrega: horaEntrega != "" ? horaEntrega : null,
              en_dia_salida: new Date(fechaSalida),
              en_hora_salida: horaSalida != "" ? horaSalida : null,
              en_incremento_producto: incrementoProductos,
              en_incremento_paquete: incrementoPaquetes,
              en_estado: horaEntrega != "" ? "en edición" : "por confirmar",
            }),
          });
        }
        //Si hubieron modificaciones en los productos guardar modificaciones
        if (modificoProductos) {
          const responseProducto = await fetch(
            `/api/entregas/productos/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseProducto.ok) {
            console.log("No se borraron productos");
          }
          console.log(responseProducto.status);
          if (
            responseProducto.status == 200 ||
            responseProducto.status == 404
          ) {
            console.log("post");
            await fetch("/api/entregas/productos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(listaProductos),
            }).then((response) => {
              if (!response.ok) {
                throw new Error("Response is not ok");
              }
              return response.json();
            });
          }
        }
        //si hubieron modificaciones en los paquetes guardar modificaciones
        if (modificoPaquetes) {
          const responsePaquetes = await fetch(`/api/entregas/paquetes/${id}`, {
            method: "DELETE",
          });
          if (!responsePaquetes.ok) {
            console.log("No se borraron paquetes");
          }

          if (
            responsePaquetes.status == 200 ||
            responsePaquetes.status == 404
          ) {
            await fetch("/api/entregas/paquetes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(listaPaquetes),
            }).then((response) => {
              if (!response.ok) {
                throw new Error("Response is not ok");
              }
              return response.json();
            });
          }
        }
        //Si hubo modificaciones en la deuda entonces modificar deuda
        if (modificoProductos || modificoPaquetes || modificoAbono) {
          const responseDeudas = await fetch(`/api/entregas/deudas/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              deu_abono: abono,
              deu_estado: "a procesar",
              deu_deuda: deuda,
              deu_deuda_pendiente: deuda - abono,
              deu_comision_funjal: Number(deudaComisionFunjal),
              deu_comision_enlace: Number(deudaComisionEnlace),
            }),
          });
          if (!responseDeudas.ok) {
            throw new Error("Network response was not ok");
          }
        }
        setLoadingData(false);
      } catch (error) {
        setError(error.message);
      }
      setSaved(true);
    }
  };
  const validarCampos = () => {
    if (
      fechaEntrega == "" ||
      fechaSalida == "" ||
      horaEntrega == "" ||
      horaSalida == ""
    ) {
      setValidarHorarios(true);
      console.log("Validado");
    } else {
      setValidarHorarios(false);
    }
    if (listaProductos.length == 0 && listaPaquetes.length == 0) {
      setValidarProductos(true);
    } else {
      setValidarProductos(false);
    }
    if (
      fechaEntrega != "" &&
      fechaSalida != "" &&
      horaEntrega != "" &&
      horaSalida != "" &&
      (listaProductos.length != 0 || listaPaquetes.length != 0)
    ) {
      setShowModal(true);
    } else {
      console.log("No entro");
    }
  };
  const finalizarEdicion = () => {
    //editar estado de la entrega
    fetch(`/api/entregas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        en_estado: "preparación",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
      });
    
    router.push(`/entregas`);
  };
  const cambiarModificadorProducto = (value) => {
    const listaModificada = listaProductos.map((producto) => {
      return { ...producto, en_produc_oferta: value };
    });
    setListaProductos(listaModificada);
  };
  const cambiarModificadorPaquete = (value) => {
    const listaModificada = listaPaquetes.map((paquete) => {
      return { ...paquete, en_pa_desc: value };
    });
    setListaPaquetes(listaModificada);
  };
  const cancelarEntrega = () => {
    fetch(`/api/entregas/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Response is not ok");
      }
      router.push("/entregas");
    });
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
          \ Entrega \{" "}
          {entrega
            ? `${entrega.cli_municipio}, ${entrega.cli_estado}.`
            : "Cargando..."}
        </h4>
      </div>
      <div className={styles.herramientas}>
        <div>
          <label>Incremento productos: </label>
          <input
            type="number"
            className={styles.input}
            min={0}
            value={incrementoProductos}
            onChange={(data) => {
              setIncrementoProductos(data.target.value),
                setSaved(false),
                setModificoEntrega(true);
              cambiarModificadorProducto(Number(data.target.value));
            }}
          />
        </div>
        <div>
          <label>Incremento paquetes: </label>
          <input
            type="number"
            className={styles.input}
            min={0}
            value={incrementoPaquetes}
            onChange={(data) => {
              setIncrementoPaquetes(data.target.value),
                setSaved(false),
                setModificoEntrega(true);
              cambiarModificadorPaquete(Number(data.target.value));
            }}
          />
        </div>
        <div>
          <label>Abono: </label>
          <input
            type="number"
            className={styles.input}
            min={0}
            value={abono}
            onChange={(data) => {
              setAbono(data.target.value);
              setModificoAbono(true);
              setSaved(false);
            }}
          />
        </div>
        <div>
          <p>
            Deuda: <b>{formatNumber(deudaProductos + deudaPaquetes - abono)}</b>
          </p>
        </div>
        <div>
          <Button
            text={"Cancelar Entrega"}
            type={"cancelar"}
            onPress={() => setShowCancelarEntrega(true)}
          />
          <Button
            text={"Finalizar Edición"}
            onPress={() => {
              validarCampos();
              handlePressSave();
            }}
          />
          <Button
            text={saved ? "Guardado" : "Guardar"}
            type={"cancelar"}
            onPress={() => handlePressSave()}
          />
        </div>
      </div>
      <div className={styles.contenido}>
        <div className={styles.subContenedor1}>
          <div className={styles.herramientasTabla}>
            <Button
              text={mostrarSeleccion ? "Listado" : "Seleccionar"}
              type={mostararListado ? "" : "cancelar"}
              onPress={() => {
                setMostrarListado(!mostararListado);
                setMostrarSeleccion(!mostrarSeleccion);
              }}
            />
          </div>
          {validarProductos && (
            <div className={styles.validarProductos}>
              <h4>No se han agregado productos</h4>
            </div>
          )}
          {mostrarSeleccion && (
            <>
              <TablaEditarProductos
                idEntrega={id}
                lista={listaProductos}
                seleccionados={(data) => {
                  setListaProductos(data);
                  setSaved(false);
                  setModificoProductos(true);
                }}
                update={(data) => setIncrementoProductos(data)}
                incrementoPrede={incrementoProductos}
              />
              <TablaEditarPaquetes
                idEntrega={id}
                lista={listaPaquetes}
                seleccionados={(data) => {
                  setListaPaquetes(data);
                  setSaved(false);
                  setModificoPaquetes(true);
                }}
                update={(data) => setIncrementoPaquetes(data)}
                incrementoPrede={incrementoPaquetes}
              />
            </>
          )}
          {mostararListado && (
            <VisualizarContenidoDeEntrega
              paquetes={listaPaquetes}
              productos={listaProductos}
              totalAPagar={() => {}}
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
              <SeleccionarEmpleados id={id} encargado={entrega} />
              <SeleccionarFecha
                fechaEntrega={fechaEntrega}
                onChangeDate={(date) => {
                  setModificoEntrega(true);
                  setfechaEntrega(date), setSaved(false);
                }}
                fechaSalida={fechaSalida}
                onChangeExit={(date) => {
                  setModificoEntrega(true);
                  setFechaSalida(date), setSaved(false);
                }}
                horaSalida={horaSalida}
                onChangeHoraSalida={(hour) => {
                  setModificoEntrega(true);
                  setHoraSalida(hour), setSaved(false);
                }}
                horaEntrega={horaEntrega}
                onChangeHoraEntrega={(hour) => {
                  setModificoEntrega(true);
                  setHoraEntrega(hour), setSaved(false);
                }}
                validar={validarHorarios}
              />
            </>
          )}
        </div>
      </div>
      <Modal
        title={"Finalizar Edición"}
        message={`
          El modo de edición finalizara, se marcará la entrega como "preparada" 
          y no se podran hacer más modificaciones. ¿Desea continuar?
        `}
        show={showModal}
        handleAccept={() => {finalizarEdicion(); setLoadingData(true)}}
        handleClose={() => setShowModal(false)}
      />
      <Modal
        title={"Cancelar Entrega"}
        message={`
          Al cancelar la entrega se eliminará de la base de datos y no podrá ser recuperada. 
          ¿Desea continuar?
        `}
        show={showCancelarEntrega}
        handleAccept={() => cancelarEntrega()}
        handleClose={() => setShowCancelarEntrega(false)}
      />
      <LoadingData show={loadingData}/>
    </div>
  );
}

export default Entrega;
