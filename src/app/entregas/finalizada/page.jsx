"use client";
import { Alert, Button, Modal } from "@/components/input/InputComponents";
import styles from "./page.module.css";
import LoadingScreen from "@/components/LoadingScreen";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  formatNumber,
  formatTimeWithoutSeconds,
  getDayOfWeek,
} from "@/functions/utilsFormat";
import InfoMunicipio from "@/components/componentesEntrega/edicion/InfoMunicipio";
import VisualizarEmpleadosEntrega from "@/components/componentesEntrega/visualizar/VisualizarEmpleadosEntrega";
import VisualizarVehiculosEntrega from "@/components/componentesEntrega/visualizar/VisualizarVehiculosEntrega";
import CardPago from "@/components/componentesEntrega/visualizar/CardPago";
import VisualizarContenidoDeEntrega from "@/components/componentesEntrega/visualizar/VisualizarContenidoDeEntrega";
import VisualizarVentasIndividuales from "@/components/componentesEntrega/visualizar/VisualizarVentasIndividuales";
import TablaEstadosEntrega from "@/components/componentesEntrega/edicion/TablaEstadosEntrega";
import VisualizarTotalProductos from "@/components/componentesEntrega/visualizar/VisualizarTotalProductos";
import { useSession } from "next-auth/react";

function Finalizada() {
  const router = useRouter();
  const seachParams = useSearchParams();
  const id = seachParams.get("id");
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stateForm, setStateForm] = useState(false);
  const [deudaSaldada, setDeudaSaldada] = useState(false);
  const [showModalPagos, setShowModalPagos] = useState(false);
  const [showAlertPagos, setShowAlertPagos] = useState(false);

  const [ocultarSeccion, setOcultarSeccion] = useState(false);
  const [mostrarInformacion, setMostrarInformacion] = useState(true);
  const [mostrarPagos, setMostrarPagos] = useState(false);
  //secciones
  const [mostrarEntrega, setMostrarEntrega] = useState(true);
  const [mostrarVentaIndividual, setMostrarVentaIndividual] = useState(false);
  const [mostrarContenido, setMostrarContenido] = useState(false);
  //deudas
  const [deuId, setDeuId] = useState(null);
  const [deuda, setDeuda] = useState(0);
  const [pendiente, setPendiente] = useState(0);
  const [abono, setAbono] = useState(0);
  //pagos
  const [pagos, setPagos] = useState([]);
  const [verFormulario, setVerFormulario] = useState(false);
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState("");
  const [metodo, setMetodo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  //entrega
  const [entrega, setEntrega] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [encargado, setEncargado] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  //productos
  const [productos, setProductos] = useState([]);
  const [productosDevueltos, setProductosDevueltos] = useState([]);
  const [productosPaquete, setProductosPaquete] = useState([]);
  //paquetes
  const [paquetes, setPaquetes] = useState([]);
  const [paquetesDevueltos, setPaquetesDevueltos] = useState([]);
  //estados de los productos
  const [listaProductos, setListaProductos] = useState([]);
  const [listaDañado, setListaDañado] = useState([]);
  const [listaExtraviado, setListaExtraviado] = useState([]);
  const [listaNoEncontrado, setListaNoEncontrado] = useState([]);
  const [listaDevueltos, setListaDevueltos] = useState([]);
  const [listaVentaIndividual, setListaVentaIndividual] = useState([]);

  const calSaldo = () => {
    const total = pagos.reduce((acc, pago) => acc + pago.pag_monto, 0);
    const deudaTotal = deuda - abono - total;
    if (deudaTotal <= 0) {
      setDeudaSaldada(true);
      console.log("deuda saldada");
    }
    return deudaTotal;
  };

  //Busca informacion de la entrega
  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === "Encargado" || session.user.role === 'Oficina') {
      fetch(`/api/entregas/obtener/entrega/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la llamada");
        }
        return response.json();
      })
      .then((data) => {
        if (data.entrega.en_estado === `finalizada`) {
          setEntrega(data.entrega);
          setCliente(data.cliente);
          setEncargado(data.encargado);
          setEmpleados(data.empleados);
          setVehiculos(data.vehiculos);
          //filtrar productos
          if (data.productos.length != 0) {
            const entregados = data.productos.filter(
              (producto) => producto.en_produc_estado == "en entrega"
            );
            const devueltos = data.productos.filter(
              (producto) => producto.en_produc_estado == "devuelto"
            );
            setProductos(entregados);
            setProductosDevueltos(devueltos);
          }
          //filtrar paquetes
          if (data.paquetes.length != 0) {
            const entregados = data.paquetes.filter(
              (paquete) => paquete.en_pa_estado == "en entrega"
            );
            const devueltos = data.paquetes.filter(
              (paquete) => paquete.en_pa_estado == "devuelto"
            );
            setPaquetes(entregados);
            setPaquetesDevueltos(devueltos);
          }
          setProductosPaquete(data.productos_paquete);
          //estados de los productos
          if (data.producto_estado.length != 0) {
            const total = data.producto_estado.filter(
              (producto) =>
                producto.en_es_produc_estado == "cargado" ||
                producto.en_es_produc_estado == "recibido"
            );
            const dañado = data.producto_estado.filter(
              (producto) => producto.en_es_produc_estado == "dañado"
            );
            const extraviado = data.producto_estado.filter(
              (producto) => producto.en_es_produc_estado == "extraviado"
            );
            const noEncontrado = data.producto_estado.filter(
              (producto) => producto.en_es_produc_estado == "no encontrado"
            );
            const devueltos = data.producto_estado.filter(
              (producto) => producto.en_es_produc_estado == "devuelto"
            );
            const ventaIndividual = data.producto_estado.filter(
              (producto) => producto.en_es_produc_estado == "vendido individual"
            );
            setListaProductos(total);
            setListaDañado(dañado);
            setListaExtraviado(extraviado);
            setListaNoEncontrado(noEncontrado);
            setListaDevueltos(devueltos);
            setListaVentaIndividual(ventaIndividual);
          }
          setLoading(false);
        } else {
          router.push(`/entregas`);
        }
      })
      .catch((error) => {
        setError(error);
      });
    } else {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);
  //Buscar deuda
  useEffect(() => {
    //buscar deuda
    fetch(`/api/entregas/deudas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDeuId(data.deu_id);
        setDeuda(data.deu_deuda);
        setAbono(data.deu_abono);
        setPendiente(data.deu_deuda_pendiente);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, stateForm]);
  //Buscar pagos
  useEffect(() => {
    if (deuId) {
      //buscar pagos
      fetch(`/api/entregas/deudas/pagos/${deuId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setPagos(data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [deuId, stateForm]);

  const validarFormulario = () => {
    console.log("monto", monto);
    console.log("fecha", fecha);
    console.log("metodo", metodo);
    console.log("descripcion", descripcion);
    if (monto > 0 && fecha != "" && metodo != "" && descripcion != "") {
      setShowModalPagos(true);
    } else {
      setShowAlertPagos(true);
    }
  };
  const addNewPay = async () => {
    try {
      const responseDeuda = await fetch(`/api/entregas/deudas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deu_estado: Number(pendiente) - Number(monto) <= 0 ? "saldada" : "pendiente",
          deu_deuda_pendiente: Number(pendiente) - Number(monto) <= 0 ? 0 : Number(pendiente) - Number(monto),
        }),
      });
      if (!responseDeuda.ok) {
        throw new Error("Response is not ok");
      }
      const responsePagos = await fetch(`/api/entregas/deudas/pagos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deu_id: deuId,
          pag_monto: monto,
          pag_metodo: metodo,
          pag_desc: descripcion,
          pag_fecha_transac: fecha,
        }),
      });
      if (responsePagos.ok) {
        setStateForm(!stateForm);
        setVerFormulario(false);
        setMonto(0);
        setFecha("");
        setMetodo("");
        setDescripcion("");
      }
      setShowModalPagos(false);
    } catch (error) {
      setError(error);
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
          \ Finalizada \{" "}
          {entrega.length != 0
            ? `${cliente.cli_municipio}, ${cliente.cli_estado}.`
            : "Cargando..."}
        </h4>
      </div>
      <div className={styles.herramientas}>
        {entrega.length != 0 && (
          <p>
            Entrega realizada el día{" "}
            <b>{getDayOfWeek(entrega.en_dia_entrega)}</b> a las{" "}
            <b>{formatTimeWithoutSeconds(entrega.en_hora_entrega)} hrs</b>
          </p>
        )}
      </div>
      <div className={styles.contenido}>
        <div className={styles.subContenedor1}>
          <div className={styles.herramientasContenido}>
            <Button
              text={"Entrgados"}
              type={mostrarEntrega ? "" : "cancelar"}
              onPress={() => {
                setMostrarEntrega(true);
                setMostrarVentaIndividual(false);
                setMostrarContenido(false);
              }}
            />
            {listaVentaIndividual.length != 0 && (
              <Button
                text={"Venta Individual"}
                type={mostrarVentaIndividual ? "" : "cancelar"}
                onPress={() => {
                  setMostrarEntrega(false);
                  setMostrarVentaIndividual(true);
                  setMostrarContenido(false);
                }}
              />
            )}
            <Button
              text={"Contenido"}
              type={mostrarContenido ? "" : "cancelar"}
              onPress={() => {
                setMostrarEntrega(false);
                setMostrarVentaIndividual(false);
                setMostrarContenido(true);
              }}
            />
          </div>
          {mostrarEntrega && (
            <VisualizarContenidoDeEntrega
              paquetes={paquetes}
              productos={productos}
              totalAPagar={() => {}}
            />
          )}
          {mostrarVentaIndividual && (
            <VisualizarVentasIndividuales
              listaVentasIndividuales={listaVentaIndividual}
            />
          )}
          {mostrarContenido && (
            <div>
              <VisualizarTotalProductos productos={listaProductos} />
              {listaDevueltos.length != 0 && (
                <TablaEstadosEntrega
                  titulo={"Productos Devueltos"}
                  listaProductos={listaDevueltos}
                />
              )}
              {listaDañado.length != 0 && (
                <TablaEstadosEntrega
                  titulo={"Productos dañados"}
                  listaProductos={listaDañado}
                  alterButton={"repuesto"}
                  onDelete={(data) => {
                    eliminarDeListaDañado(data);
                    setIsSaved(false);
                  }}
                />
              )}
              {listaExtraviado.length != 0 && (
                <TablaEstadosEntrega
                  titulo={"Productos extraviados"}
                  listaProductos={listaExtraviado}
                  alterButton={"repuesto"}
                  onDelete={(data) => {
                    eliminarDeListaExtraviado(data);
                    setIsSaved(false);
                  }}
                />
              )}
              {listaNoEncontrado.length != 0 && (
                <TablaEstadosEntrega
                  titulo={"Productos no encontrados"}
                  listaProductos={listaNoEncontrado}
                  alterButton={"repuesto"}
                  onDelete={(data) => {
                    eliminarDeListaNoEncontrado(data);
                    setIsSaved(false);
                  }}
                />
              )}
            </div>
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
            <Button
              text={"información"}
              type={mostrarInformacion ? "" : "cancelar"}
              onPress={() => {
                setMostrarInformacion(true);
                setMostrarPagos(false);
              }}
            />
            <Button
              text={"Pagos"}
              type={mostrarPagos ? "" : "cancelar"}
              onPress={() => {
                setMostrarInformacion(false);
                setMostrarPagos(true);
              }}
            />
          </div>
          {!ocultarSeccion && (
            <>
              {mostrarInformacion && (
                <div className={styles.scrollable}>
                  <InfoMunicipio municipio={cliente} />
                  <VisualizarEmpleadosEntrega
                    empleados={empleados}
                    encargado={encargado}
                  />
                  <VisualizarVehiculosEntrega vehiculos={vehiculos} />
                </div>
              )}
              {mostrarPagos && (
                <div>
                  <div className={styles.menuPagos}>
                    <div>
                      <p>
                        <b>Deuda: </b>
                        {formatNumber(deuda)}
                      </p>
                      <p>
                        <b>Abono: </b>
                        {formatNumber(abono)}
                      </p>
                      <p>
                        <b>Saldo Restante:</b>{" "}
                        {!deudaSaldada
                          ? formatNumber(calSaldo())
                          : "Cuenta saldada"}
                      </p>
                    </div>
                    {!deudaSaldada && (
                      <Button
                        text={verFormulario ? "Contraer" : "Nuevo pago"}
                        type={verFormulario ? "" : "cancelar"}
                        onPress={() => setVerFormulario(!verFormulario)}
                      />
                    )}
                    {verFormulario && (
                      <div className={styles.formulario}>
                        <form>
                          <label>Monto:</label>
                          <input
                            type="number"
                            min={0}
                            className={styles.input}
                            value={monto}
                            onChange={(value) => setMonto(value.target.value)}
                          />
                          <label>Fecha:</label>
                          <input
                            type="date"
                            className={styles.date}
                            value={fecha}
                            onChange={(value) => setFecha(value.target.value)}
                          />
                          <label>Método de pago:</label>
                          <select
                            className={styles.select}
                            value={metodo}
                            onChange={(value) => setMetodo(value.target.value)}
                          >
                            <option value="">-Seleccione método-</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="transferencia">Transferencia</option>
                          </select>
                          <section className={styles.sectionTextarea}>
                            <label>Comentario:</label>
                            <textarea
                              className={styles.textarea}
                              value={descripcion}
                              onChange={(data) =>
                                setDescripcion(data.target.value)
                              }
                            />
                          </section>
                        </form>
                        <Button
                          text={"Guardar"}
                          type={"cancelar"}
                          onPress={() => validarFormulario()}
                        />
                      </div>
                    )}
                  </div>

                  {pagos.length != 0 ? (
                    <div className={styles.scrollablePagos}>
                      {pagos.map((pago) => (
                        <CardPago key={pago.pag_id} pago={pago} />
                      ))}
                    </div>
                  ) : (
                    <div className={styles.errorContent}>
                      <p className={styles.textNoFound}>No hay pagos</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        title={"Nuevo Pago"}
        show={showModalPagos}
        message={"¿Desea agregar el nuevo pago?"}
        handleAccept={() => {
          addNewPay();
        }}
        handleClose={() => setShowModalPagos(false)}
      />
      <Alert
        title={"Datos del pago invalidos"}
        message={
          "Por favor, complete todos los campos o introdusca un monto valido"
        }
        show={showAlertPagos}
        handleAccept={() => setShowAlertPagos(false)}
      />
    </div>
  );
}

export default Finalizada;
