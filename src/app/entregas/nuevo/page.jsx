"use client";
import { useState, useEffect, use } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AgregarMunicipio,
  AgregarEncargado,
  TablaSeleccionProductos,
  TablaSeleccionPaquetes,
} from "@/components/componentesEntrega/nuevo/nuevaEntrega";
import { Alert, Button, Modal } from "@/components/input/InputComponents";
import VisualizarContenidoDeEntrega from "@/components/componentesEntrega/visualizar/VisualizarContenidoDeEntrega";
import { useSession } from "next-auth/react";
import LoadingData from "@/components/LoadingData";

function NuevaEntrega() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [incProductos, setIncProductos] = useState(0);
  const [incPaquetes, setIncPaquetes] = useState(0);

  const [listaProductos, setListaProductos] = useState([]);
  const [validarListaProductos, setValidarListaProductos] = useState(false);
  const [listaPaquetes, setListaPaquetes] = useState([]);
  const [validarListaPaquetes, setValidarListaPaquetes] = useState(false);

  const [municipio, setMunicipio] = useState(null);
  const [validarMunicipio, setValidarMunicipio] = useState(false);
  const [encargado, setEncargado] = useState(null);
  const [validarEncargado, setValidarEncargado] = useState(false);

  const [entregaId, setEntregaId] = useState(null);
  const [date, setDate] = useState(null);

  //deuda
  const [abono, setAbono] = useState(0);
  const [deudaProductos, setDeudaProductos] = useState(0);
  const [deudaPaquetes, setDeudaPaquetes] = useState(0);
  const [deudaComisionFunjal, setDeudaComisionFunjal] = useState(0);
  const [deudaComisionEnlace, setDeudaComisionEnlace] = useState(0);
  //vista
  const [mostrarSeleccion, setMostrarSeleccion] = useState(true);
  const [mostrarListado, setMostrarListado] = useState(false);
  //alerta
  const [showAlert, setShowAlert] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const generateNewID = () => {
    const newID = Math.floor(1000000 + Math.random() * 90000000);
    setEntregaId(newID);
  };
  const formatNumber = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === "Encargado") {
      generateNewID();
    fetch("/api/datetime/date")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDate(data.fecha_actual);
      });
    } else {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
      for (let y = 0; y < listaPaquetes.length; y++) {
        deuFunjal =
          deuFunjal +
          listaPaquetes[y].pa_comision * listaPaquetes[y].en_pa_cantidad;
        deuEnlace =
          deuEnlace +
          listaPaquetes[y].pa_comision * listaPaquetes[y].en_pa_cantidad        
      }
      setDeudaComisionFunjal(deuFunjal);
      setDeudaComisionEnlace(deuEnlace);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deudaProductos, listaPaquetes, listaProductos]);

  

  const validarInformacion = () => {
    if (encargado == null) {
      setValidarEncargado(true);
    } else {
      setValidarEncargado(false);
    }
    if (municipio == null) {
      setValidarMunicipio(true);
    } else {
      setValidarMunicipio(false);
    }
    if (
      encargado != null &&
      municipio != null &&
      (abono < Number(deudaProductos) + Number(deudaPaquetes) || abono == 0)
    ) {
      setShowModal(true);
    } else {
      setShowAlert(true);
      setMessageTitle("Error de validación");
      setMessageBody(
        "Debe seleccionar un encargado, un municipio y el abono debe ser menor o igual a la deuda"
      );
    }
  };

  const terminado = async () => {
    try {
      const response = await fetch("/api/entregas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          en_id: entregaId,
          emp_id: encargado,
          cli_id: municipio,
          en_incremento_producto: Number(incProductos),
          en_incremento_paquete: Number(incPaquetes),
          en_dia_pedido: date,
          en_dia_entrega: null,
          en_hora_salida: null,
          en_hora_entrega: null,
          en_estado: "por confirmar",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (listaProductos != null && listaProductos.length != 0) {
        await fetch("/api/entregas/productos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listaProductos),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Error al intentar agregar los productos");
          }
          return response.json();
        });
      }

      if (listaPaquetes != null && listaPaquetes.length != 0) {
        const listaPaquetesDesc = listaPaquetes.map((paquete) => ({
          ...paquete,
          en_pa_desc: incPaquetes,
        }));
        console.log(listaPaquetesDesc);
        await fetch("/api/entregas/paquetes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listaPaquetesDesc),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Error al intentar agregar los paquetes");
          }
        });
      }

      const responseDeudas = await fetch("/api/entregas/deudas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          en_id: entregaId,
          deu_abono: abono,
          deu_estado: "a procesar",
          deu_deuda:
            Number(deudaProductos) + Number(deudaPaquetes),
          deu_deuda_pendiente: Number(deudaProductos) + Number(deudaPaquetes) - Number(abono),
          deu_comision_funjal: Number(deudaComisionFunjal),
          deu_comision_enlace: Number(deudaComisionEnlace),
        }),
      });
      if (!responseDeudas.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error.message);
    }
    router.push("/entregas");
  };

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/entregas" className={styles.link}>
            Entregas
          </Link>{" "}
          \ Nuevo
        </h4>
      </div>
      <div className={styles.herramientas}>
        <div>
          <label>Incremento para los productos: </label>
          <input
            type="number"
            className={styles.input}
            min={0}
            value={incProductos}
            onChange={(data) => {
              setIncProductos(data.target.value);
              setMostrarSeleccion(true);
              setMostrarListado(false);
            }}
          />
        </div>
        <div>
          <label>Incremento para los paquetes: </label>
          <input
            type="number"
            className={styles.input}
            min={0}
            value={incPaquetes}
            onChange={(data) => {
              setIncPaquetes(data.target.value);
              setMostrarSeleccion(true);
              setMostrarListado(false);
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
            }}
          />
        </div>
        <div>
          <p>
            Deuda:{" "}
            <b>
              {formatNumber(
                Number(deudaProductos) + Number(deudaPaquetes) - Number(abono)
              )}
            </b>
          </p>
        </div>
        <Button
          text={"Terminado"}
          type={"cancelar"}
          onPress={() => {
            validarInformacion();
          }}
        />
      </div>
      <div className={styles.contenido}>
        <div className={styles.subContenedor1}>
          <div className={styles.herramientasContenido}>
            <Button
              text={"Seleccionar Productos"}
              type={mostrarSeleccion ? "" : "cancelar"}
              onPress={() => {
                setMostrarSeleccion(true);
                setMostrarListado(false);
              }}
            />
            <Button
              text={"Total Lista de Productos"}
              type={mostrarListado ? "" : "cancelar"}
              onPress={() => {
                setMostrarSeleccion(false);
                setMostrarListado(true);
              }}
            />
          </div>
          {mostrarSeleccion && (
            <div className={styles.scrollable}>
              <TablaSeleccionProductos
                listaProductos={listaProductos}
                modificarLista={(lista) => {
                  setListaProductos(lista);
                }}
                idEntrega={entregaId}
                modificador={incProductos}
                validar={validarListaProductos}
              />
              <TablaSeleccionPaquetes
                listaPaquetes={listaPaquetes}
                modificarLista={(lista) => {
                  setListaPaquetes(lista);
                }}
                idEntrega={entregaId}
                modificador={incPaquetes}
                validar={validarListaPaquetes}
              />
            </div>
          )}
          {mostrarListado && (
            <div className={styles.scrollable}>
              <VisualizarContenidoDeEntrega
                productos={listaProductos}
                paquetes={listaPaquetes}
                totalAPagar={() => {}}
              />
            </div>
          )}
        </div>
        <div className={styles.subContenedor2}>
          <AgregarMunicipio
            datosCliente={(data) => {
              setMunicipio(data);
            }}
            validar={validarMunicipio}
          />
          <AgregarEncargado
            enlace={(enlace) => {
              setEncargado(enlace);
            }}
            validar={validarEncargado}
          />
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Agregar Nueva Entrega"}
        message={
          "Se agregara una nueva entrega con los datos previamente selecciónados"
        }
        handleAccept={() => {
          setLoadingData(true);
          terminado();
        }}
        handleClose={() => setShowModal(false)}
      />
      <Alert
        show={showAlert}
        handleAccept={() => setShowAlert(false)}
        title={messageTitle}
        message={messageBody}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default NuevaEntrega;
