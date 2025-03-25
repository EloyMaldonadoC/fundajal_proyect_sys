"use client";
import styles from "./page.module.css";
import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import { Alert, Button, Modal } from "@/components/input/InputComponents";
import VisualizarTotalProductos from "@/components/componentesEntrega/visualizar/VisualizarTotalProductos";
import InfoMunicipio from "@/components/componentesEntrega/edicion/InfoMunicipio";
import VisualizarEmpleadosEntrega from "@/components/componentesEntrega/visualizar/VisualizarEmpleadosEntrega";
import VisualizarVehiculosEntrega from "@/components/componentesEntrega/visualizar/VisualizarVehiculosEntrega";
import VisualizarContenidoDeEntrega from "@/components/componentesEntrega/visualizar/VisualizarContenidoDeEntrega";
import CardPago from "@/components/componentesEntrega/visualizar/CardPago";
import TablaEstadosEntrega from "@/components/componentesEntrega/edicion/TablaEstadosEntrega";
import VisualizarDevueltos from "@/components/componentesEntrega/visualizar/VisualizarDevueltos";
import { buscarProductosDeUnPaquete } from "@/functions/manageProducts";
import VentaIndividual from "@/components/componentesEntrega/edicion/VentaIndividual";
import VisualizarVentasIndividuales from "@/components/componentesEntrega/visualizar/VisualizarVentasIndividuales";
import { obtenerHoraActual } from "@/functions/utilsFormat";
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
const formatNumber = (number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function unificarLista(listas) {
  const lista = [...listas];
  for (let X = 0; X < lista.length; X++) {
    const element = lista[X];
    for (let Y = 0; Y < lista.length; Y++) {
      const element2 = lista[Y];
      if (element.produc_id == element2.produc_id && X != Y) {
        lista[X].en_es_produc_cant =
          Number(lista[X].en_es_produc_cant) +
          Number(element2.en_es_produc_cant);
        lista.splice(Y, 1);
      }
    }
  }
  console.log(lista);
}

function Recibido() {
  //Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: session, status } = useSession();

  //logic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isSavedProductosDevolucion, setIsSavedProductosDevolucion] =
    useState(true);
  const [isSavedPaquetesDevolucion, setIsSavedPaquetesDevolucion] =
    useState(true);
  const [cambioListaEstados, setCambioListaEstados] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  //vista de UI
  const [ocultarSeccion, setOcultarSeccion] = useState(false);
  const [mostrarTotalProductos, setMostrarTotalProductos] = useState(false);
  const [mostrarProductosIndividuales, setMostrarProductosIndividuales] =
    useState(true);
  const [mostrarInformacion, setMostrarInformacion] = useState(true);
  const [mostrarPagos, setMostrarPagos] = useState(false);
  const [mostrarVentasIndividuales, setMostrarVentasIndividuales] =
    useState(false);

  //entrega
  const [entrega, setEntrega] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [encargado, setEncargado] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [productosPaquete, setProductosPaquete] = useState([]);

  //listados productos globales
  const [listaProductos, setListaProductos] = useState([]);
  const [listaExtraviado, setListaExtraviado] = useState([]);
  const [listaDañado, setListaDañado] = useState([]);
  const [listaNoEncontrado, setListaNoEncontrado] = useState([]);
  const [listaDevueltos, setListaDevueltos] = useState([]);
  const [listaVentaIndividual, setListaVentaIndividual] = useState([]);

  //deudas
  const [deudaSaldada, setDeudaSaldada] = useState(false);
  const [verFormulario, setVerFormulario] = useState(false);
  const [deuda, setDeuda] = useState(0);
  const [comisionFundajal, setComisionFundajal] = useState(0);
  const [comisionEnlace, setComisionEnlace] = useState(0);
  const [pendiente, setPendiente] = useState(0);
  const [deuId, setDeuId] = useState(null);
  const [abono, setAbono] = useState(0);
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState("");
  const [metodo, setMetodo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pagos, setPagos] = useState([]);
  const [stateForm, setStateForm] = useState(false);
  const [showModalPagos, setShowModalPagos] = useState(false);
  const [showAlertPagos, setShowAlertPagos] = useState(false);
  const [showAlertFinalizar, setShowAlertFinalizar] = useState(false);
  const [showModalDevolver, setShowModalDevolver] = useState(false);

  //devuluciones
  const [productosDevueltos, setProductosDevueltos] = useState([]);
  const [paquetesDevueltos, setPaquetesDevueltos] = useState([]);
  const [mostrarDevoluciones, setMostrarDevoluciones] = useState(false);
  const [tipo, setTipo] = useState("producto");
  const [devolverProducto, setDevolverProducto] = useState(null);
  const [devolverPaquete, setDevolverPaquete] = useState(null);
  const [max, setMax] = useState(0);
  const [cant, setCant] = useState(0);

  useEffect(() => {
    if (
      session.user.role === "Administrador" ||
      session.user.role === "Encargado"
    ) {
      fetch(`/api/entregas/obtener/entrega/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la llamada");
          }
          return response.json();
        })
        .then((data) => {
          if (data.entrega.en_estado === `recibido`) {
            console.log(data);
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
                (producto) =>
                  producto.en_es_produc_estado == "vendido individual"
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
      router.push(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);

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
        setDeuId(data.deu_id);
        setDeuda(data.deu_deuda);
        setAbono(data.deu_abono);
        setPendiente(data.deu_deuda_pendiente);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, stateForm]);

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
          setPagos(data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [deuId, stateForm]);

  useEffect(() => {
    //recalcular la deuda
    let total = 0;
    let comFun = 0;
    let comEnl = 0;
    paquetes.forEach(
      (paquete) =>
        (total =
          total +
          (paquete.pa_precio + paquete.en_pa_desc) * paquete.en_pa_cantidad)
    );
    productos.forEach(
      (producto) =>
        (total =
          total +
          (producto.produc_precio_venta + producto.en_produc_oferta) *
            producto.en_produc_cantidad)
    );
    productos.forEach(
      (producto) => (comFun = comFun + producto.produc_parti_fun * producto.en_produc_cantidad)
    )
    productos.forEach(
      (producto) => (comEnl = comEnl + producto.produc_parti_enlace * producto.en_produc_cantidad)
    )
    paquetes.forEach(
      (paquete) => (comFun = comFun + paquete.pa_comision * paquete.en_pa_cantidad)
    )
    paquetes.forEach(
      (paquete) => (comEnl = comEnl + paquete.pa_comision * paquete.en_pa_cantidad)
    )
    setDeuda(total);
    setComisionFundajal(comFun);
    setComisionEnlace(comEnl);
  }, [productos, paquetes]);

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
    setCambioListaEstados(true);
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
    setCambioListaEstados(true);
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
    setCambioListaEstados(true);
  };
  const calSaldo = () => {
    const total = pagos.reduce((acc, pago) => acc + pago.pag_monto, 0);

    const deudaTotal = deuda - abono - total;
    if (deudaTotal <= 0) {
      setDeudaSaldada(true);
      console.log("deuda saldada");
    }
    return deudaTotal;
  };
  const addNewPay = async () => {
    handleGuardar();
    try {
      setLoadingData(true);
      const responseDeuda = await fetch(`/api/entregas/deudas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deu_estado: Number(pendiente) - Number(monto) <= 0 ? "saldada" : "pendiente",
          deu_deuda_pendiente: Number(pendiente) - Number(monto) <= 0 ? 0 : Number(pendiente) - Number(monto),
          deu_comision_funjal: comisionFundajal,
          deu_comision_enlace: comisionEnlace
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
      setLoadingData(false);
      setShowModalPagos(false);
    } catch (error) {
      setError(error);
    }
  };
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
  const finalizarEntrega = async () => {
    if (isSaved) {
      try {
        await fetch(`/api/entregas/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            en_estado: "finalizada",
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        });
        //Si hay productos devueltos se agregan al inventario y se registra en el historial
        if (listaDevueltos.length != 0) {
          await fetch("/api/entregas/productos/addInventary", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(listaDevueltos),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Response put products is not ok");
            }
            return response.json();
          });
          const historialDevueltos = listaDevueltos.map((producto) => {
            const now = new Date();
            return {
              produc_id: producto.produc_id,
              hist_estado: "entrada",
              hist_cantidad: producto.en_es_produc_cant,
              hist_precio_ent_sal: producto.produc_precio_venta,
              hist_hora: obtenerHoraActual(),
              hist_dia: now.toISOString().split("T")[0],
              hist_motivo: "devolucion"
            };
          });
          //historial de devoluciones
          await fetch(`/api/inventario/historial/lista`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(historialDevueltos),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Response post historia is not ok");
            }
            return response.json();
          });
        }
        //Si hay productos vendidos individualmente se agregan al inventario y se registra en el historial
        if (listaVentaIndividual.length != 0) {
          const historialDevoluciones = listaVentaIndividual.map(
            (producto) => {
              const now = new Date();
              return {
                produc_id: producto.produc_id,
                hist_estado: "entrada",
                hist_cantidad: producto.en_es_produc_cant,
                hist_precio_ent_sal: producto.produc_precio_venta,
                hist_hora: obtenerHoraActual(),
                hist_dia: now.toISOString().split("T")[0],
                hist_motivo: "devolucion"
              };
            }
          );
          //historial de devoluciones
          await fetch(`/api/inventario/historial/lista`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(historialDevoluciones),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Response post historia is not ok");
            }
            return response.json();
          });
          const historialVentaIndividual = listaVentaIndividual.map(
            (producto) => {
              const now = new Date();
              return {
                produc_id: producto.produc_id,
                hist_estado: "salida",
                hist_cantidad: producto.en_es_produc_cant,
                hist_precio_ent_sal: producto.produc_precio_venta,
                hist_hora: obtenerHoraActual(),
                hist_dia: now.toISOString().split("T")[0],
                hist_motivo: "venta individual"
              };
            }
          );
          //historial de devoluciones
          await fetch(`/api/inventario/historial/lista`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(historialVentaIndividual),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Response post historia is not ok");
            }
            return response.json();
          });
        }
      } catch (error) {
        setError(error);
      }
      router.push("/entregas");
    }
  };
  //devoluciones
  const handleChangeSelectProduc = (value) => {
    if (value == 0) {
      setMax(0);
      setDevolverProducto(null);
      setCant(0);
    } else {
      setCant(0);
      const select = productos.find((producto) => producto.produc_id == value);
      setMax(select.en_produc_cantidad);
      setDevolverProducto(select);
      console.log(select);
    }
  };
  const handleChangeSelectPaq = (value) => {
    if (value == 0) {
      setMax(0);
      setDevolverPaquete(null);
      setCant(0);
    } else {
      setCant(0);
      const select = paquetes.find((paquete) => paquete.pa_id == value);
      setMax(select.en_pa_cantidad);
      setDevolverPaquete(select);
      console.log(select);
    }
  };
  const handleGuardar = async () => {
    if (!isSaved) {
      try {
        setLoadingData(true);
        const listaEstados = [
          ...listaProductos,
          ...listaDañado,
          ...listaExtraviado,
          ...listaNoEncontrado,
          ...listaDevueltos,
          ...listaVentaIndividual,
        ];
        const listaProductosEntrega = [...productos, ...productosDevueltos];
        const listaPaquetesEntrega = [...paquetes, ...paquetesDevueltos];

        /*Cambiar estados de los productos*/
        if (cambioListaEstados) {
          //eliminar los estados anteriores
          const responseDeleteEstados = await fetch(
            `/api/entregas/productos/status/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseDeleteEstados.ok) {
            throw new Error("Response detele states is not ok");
          }
          //guardar los nuevos estados
          const responseEstados = await fetch(
            "/api/entregas/productos/status",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(listaEstados),
            }
          );
          if (!responseEstados.ok) {
            throw new Error("Response post states is not ok");
          }
        }
        /*Modificaciones a la lista de productos*/
        if (!isSavedProductosDevolucion) {
          //Eliminar los productos de la entrega
          const responseDeleteProductos = await fetch(
            `/api/entregas/productos/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseDeleteProductos.ok) {
            throw new Error("Response delete products is not ok");
          }
          //Guardar productos
          if (
            responseDeleteProductos.status == 200 ||
            responseDeleteProductos.status == 204
          ) {
            const responseProductosDevueltos = await fetch(
              `/api/entregas/productos`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(listaProductosEntrega),
              }
            );
            if (!responseProductosDevueltos.ok) {
              throw new Error("Response post products is not ok");
            }
          }
        }
        /*Modificaciones a la lista de paquetes*/
        if (!isSavedPaquetesDevolucion) {
          //Eliminar los paquetes de la entrega
          const responseDeletePaquetes = await fetch(
            `/api/entregas/paquetes/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!responseDeletePaquetes.ok) {
            throw new Error("Response delete paquetes is not ok");
          }
          //Guardar paquetes
          const responsePaquetesDevueltos = await fetch(
            `/api/entregas/paquetes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(listaPaquetesEntrega),
            }
          );
          if (!responsePaquetesDevueltos.ok) {
            throw new Error("Response post paquetes is not ok");
          }
        }
        /*Modificaciones a la deuda*/
        if (!isSavedProductosDevolucion || !isSavedPaquetesDevolucion) {
          await fetch(`/api/entregas/deudas/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              deu_deuda: deuda,
              deu_deuda_pendiente: calSaldo(),
              deu_comision_funjal: comisionFundajal,
              deu_comision_enlace: comisionEnlace
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Response put deuda is not ok");
              }
            })
            .catch((error) => {
              setError(error);
            });
        }
        setIsSaved(true);
        setLoadingData(false);
      } catch (error) {
        setError(error);
      }
    }
  };
  const onPressDevolver = async () => {
    if (max != 0 && (devolverProducto || devolverPaquete) && cant != 0) {
      if (devolverProducto) {
        const exist = productosDevueltos.filter(
          (producto) => producto.produc_id == devolverProducto.produc_id
        );
        //si existe no hay
        if (exist.length == 0) {
          //si es el maximo de productos eliminar
          //si no es el maximo solo eliminar la cantidad seleccionada
          if (max == Number(cant)) {
            const newArrayList = productos.filter(
              (producto) => producto.produc_id != devolverProducto.produc_id
            );
            setProductosDevueltos([
              ...productosDevueltos,
              {
                en_id: devolverProducto.en_id,
                produc_id: Number(devolverProducto.produc_id),
                produc_nombre: devolverProducto.produc_nombre,
                produc_precio_venta: Number(
                  devolverProducto.produc_precio_venta
                ),
                en_produc_cantidad: Number(cant),
                en_produc_estado: "devuelto",
                en_produc_oferta: 0,
              },
            ]);
            setProductos(newArrayList);
          } else {
            console.log("No es igual");
            setProductos(
              productos.map((producto) =>
                producto.produc_id == devolverProducto.produc_id
                  ? {
                      ...producto,
                      en_produc_cantidad:
                        Number(producto.en_produc_cantidad) - cant,
                    }
                  : producto
              )
            );
            setProductosDevueltos([
              ...productosDevueltos,
              {
                ...devolverProducto,
                en_produc_cantidad: Number(cant),
                en_produc_estado: "devuelto",
              },
            ]);
          }
        } else {
          //existe el producto en la lista de devoluciones, entonces
          //se suma en la lista de devoluciones y se resta de los productos
          setProductosDevueltos(
            productosDevueltos.map((producto) =>
              producto.produc_id == devolverProducto.produc_id
                ? {
                    ...producto,
                    en_produc_cantidad:
                      Number(producto.en_produc_cantidad) + Number(cant),
                  }
                : producto
            )
          );
          if (max == Number(cant)) {
            const newArray = productos.filter(
              (producto) => producto.produc_id != devolverProducto.produc_id
            );
            setProductos(newArray);
          } else {
            setProductos(
              productos.map((producto) =>
                producto.produc_id == devolverProducto.produc_id
                  ? {
                      ...producto,
                      en_produc_cantidad:
                        Number(producto.en_produc_cantidad) - Number(cant),
                    }
                  : producto
              )
            );
          }
        }

        //movimientos de la lista
        const devu = listaProductos.find(
          (producto) => producto.produc_id == devolverProducto.produc_id
        );
        const existInList = listaDevueltos.find(
          (producto) => producto.produc_id == devolverProducto.produc_id
        );
        console.log("lista de productos", devu);
        console.log("lista", existInList);
        setListaProductos(
          listaProductos.map((producto) =>
            producto.produc_id == devolverProducto.produc_id
              ? {
                  ...producto,
                  en_es_produc_cant:
                    Number(producto.en_es_produc_cant) - Number(cant),
                }
              : producto
          )
        );
        if (existInList) {
          //Si existe
          setListaDevueltos(
            listaDevueltos.map((producto) =>
              producto.produc_id == existInList.produc_id
                ? {
                    ...producto,
                    en_es_produc_cant:
                      Number(producto.en_es_produc_cant) + Number(cant),
                  }
                : producto
            )
          );
        } else {
          //Si no existe
          setListaDevueltos([
            ...listaDevueltos,
            {
              ...devu,
              en_es_produc_cant: Number(cant),
              en_es_produc_estado: "devuelto",
            },
          ]);
        }
        setIsSavedProductosDevolucion(false);
      }
      if (devolverPaquete) {
        //buscar si el producto existe
        const exist = paquetesDevueltos.filter(
          (paquete) => paquete.pa_id == devolverPaquete.pa_id
        );
        console.log(exist);
        //si no existe
        if (exist.length == 0) {
          console.log("no existe");
          //si se selecciona el maximo de la cantidad
          if (max == Number(cant)) {
            const newArray = paquetes.filter(
              (paquete) => paquete.pa_id != devolverPaquete.pa_id
            );
            setPaquetes(newArray);
            setPaquetesDevueltos([
              ...paquetesDevueltos,
              {
                pa_id: devolverPaquete.pa_id,
                en_id: devolverPaquete.en_id,
                en_pa_cantidad: cant,
                en_pa_estado: "devuelto",
                en_pa_desc: 0,
                pa_nombre: devolverPaquete.pa_nombre,
                pa_precio: devolverPaquete.pa_precio,
              },
            ]);
            const arrayProducSelec = productosPaquete.filter(
              (producto) => producto.pa_id == devolverPaquete.pa_id
            );
            console.log(arrayProducSelec);
          } else {
            console.log("No es igual");
            setPaquetes(
              paquetes.map((paquete) =>
                paquete.pa_id == devolverPaquete.pa_id
                  ? {
                      ...paquete,
                      en_pa_cantidad: Number(paquete.en_pa_cantidad) - cant,
                    }
                  : paquete
              )
            );
            setPaquetesDevueltos([
              ...paquetesDevueltos,
              {
                ...devolverPaquete,
                en_pa_cantidad: Number(cant),
                en_pa_estado: "devuelto",
              },
            ]);
          }
        } else {
          //si existe el producto, se sumaran las cantidades al producto ya existente
          setPaquetesDevueltos(
            paquetesDevueltos.map((paquete) =>
              paquete.pa_id == devolverPaquete.pa_id
                ? {
                    ...paquete,
                    en_pa_cantidad:
                      Number(paquete.en_pa_cantidad) + Number(cant),
                  }
                : paquete
            )
          );
          //si la cantidad que se selecciono es la maxima, elimina el producto de la lista
          if (max == Number(cant)) {
            const newArray = paquetes.filter(
              (paquete) => paquete.pa_id != devolverPaquete.pa_id
            );
            setPaquetes(newArray);
          } else {
            setPaquetes(
              paquetes.map((paquete) =>
                paquete.pa_id == devolverPaquete.pa_id
                  ? {
                      ...paquete,
                      en_pa_cantidad:
                        Number(paquete.en_pa_cantidad) - Number(cant),
                    }
                  : paquete
              )
            );
          }
        }

        //Mover lista productos
        //buscar que productos hay en el paquete
        const productosDelPaquete = productosPaquete.filter(
          (producto) => producto.pa_id == devolverPaquete.pa_id
        );
        const nuevaListaDevueltos = [...listaDevueltos];

        for (let X = 0; X < productosDelPaquete.length; X++) {
          const producto = productosDelPaquete[X];
          const existe = listaDevueltos.find(
            (produc) => produc.produc_id == producto.produc_id
          );
          console.log("producto", producto, X);
          console.log("existe", existe);

          //si existe el producto en la lista de devoluciones editarlo
          //si no existe agregarlo
          if (existe) {
            console.log("existe este producto en la lista");
            for (let Y = 0; Y < nuevaListaDevueltos.length; Y++) {
              const productoListado = nuevaListaDevueltos[Y];
              console.log("producto listado", productoListado);
              if (producto.produc_id == productoListado.produc_id) {
                //sumarlo a la lista de devoluciones
                nuevaListaDevueltos[Y] = {
                  ...productoListado,
                  en_es_produc_cant:
                    Number(productoListado.en_es_produc_cant) +
                    Number(producto.produc_pa_cantidad) * Number(cant),
                };
              }
            }
          } else {
            console.log("no existe este producto en la lista");
            //agregarlo como nuevo a la lista de devoluciones
            nuevaListaDevueltos.push({
              produc_id: Number(producto.produc_id),
              en_id: Number(producto.en_id),
              produc_nombre: producto.produc_nombre,
              produc_precio_venta: Number(producto.produc_precio_venta),
              en_es_produc_cant:
                Number(producto.produc_pa_cantidad) * Number(cant),
              en_es_produc_estado: "devuelto",
            });
            console.log("Se añadido", producto.produc_nombre);
          }
          //actualiza la lista de devoluciones
          setListaDevueltos(nuevaListaDevueltos);
          //restar de la lista de productos
          const nuevaListaProductos = listaProductos.map((produc) =>
            productosDelPaquete.find(
              (producto) => producto.produc_id == produc.produc_id
            )
              ? {
                  ...produc,
                  en_es_produc_cant:
                    Number(produc.en_es_produc_cant) -
                    Number(producto.produc_pa_cantidad) * Number(cant),
                }
              : produc
          );
          setListaProductos(nuevaListaProductos);
        }
        setIsSavedPaquetesDevolucion(false);
      }
    }
    setCambioListaEstados(true);
    setIsSaved(false);
    setTipo("producto");
    setMostrarDevoluciones(false);
    setDevolverProducto(null);
    setDevolverPaquete(null);
    setCant(0);
    setMax(0);
  };
  const deshacerDevolucion = (value) => {
    if (value.produc_id) {
      console.log("es un producto");
      const exist = productos.find(
        (producto) => producto.produc_id == value.produc_id
      );
      const existInList = productosDevueltos.find(
        (producto) => producto.produc_id == value.produc_id
      );
      const productoExiste = listaDevueltos.find(
        (producto) => producto.produc_id == value.produc_id
      );
      console.log("existe producto", exist);
      console.log("producto devuelto", existInList);
      console.log("producto de la lista devueltos", productoExiste);
      //si existe en la lista
      if (exist) {
        setProductos(
          productos.map((producto) =>
            producto.produc_id == value.produc_id
              ? {
                  ...producto,
                  en_produc_cantidad:
                    producto.en_produc_cantidad + value.en_produc_cantidad,
                }
              : producto
          )
        );
        setProductosDevueltos(
          productosDevueltos.filter(
            (producto) => producto.produc_id != value.produc_id
          )
        );
      } else {
        //si no existe en la lista
        setProductos([
          ...productos,
          { ...value, en_produc_estado: "en entrega" },
        ]);
        setProductosDevueltos(
          productosDevueltos.filter(
            (producto) => producto.produc_id != value.produc_id
          )
        );
      }
      //movimientos de la lista Producto
      setListaProductos(
        listaProductos.map((producto) =>
          producto.produc_id == value.produc_id
            ? {
                ...producto,
                en_es_produc_cant:
                  Number(producto.en_es_produc_cant) +
                  Number(existInList.en_produc_cantidad),
              }
            : producto
        )
      );
      if (existInList.en_produc_cantidad == productoExiste.en_es_produc_cant) {
        setListaDevueltos(
          listaProductos.filter(
            (producto) => producto.produc_id != value.produc_id
          )
        );
      } else {
        setListaDevueltos(
          listaDevueltos.map((producto) =>
            producto.produc_id == value.produc_id
              ? {
                  ...producto,
                  en_es_produc_cant:
                    Number(producto.en_es_produc_cant) -
                    Number(existInList.en_produc_cantidad),
                }
              : producto
          )
        );
      }
    } else {
      console.log("es un paquete");
      //existe en los paquetes
      const exist = paquetes.find((paquete) => paquete.pa_id == value.pa_id);
      //productos que conforman el paquete
      const productosDelPaquete = productosPaquete.filter(
        (producto) => producto.pa_id == value.pa_id
      );
      if (exist) {
        setPaquetes(
          paquetes.map((paquete) =>
            paquete.pa_id == value.pa_id
              ? {
                  ...paquete,
                  en_pa_cantidad: paquete.en_pa_cantidad + value.en_pa_cantidad,
                }
              : paquete
          )
        );
        setPaquetesDevueltos(
          paquetesDevueltos.filter((paquete) => paquete.pa_id != value.pa_id)
        );
      } else {
        setPaquetes([...paquetes, { ...value, en_pa_estado: "en entrega" }]);
        setPaquetesDevueltos(
          paquetesDevueltos.filter((paquete) => paquete.pa_id != value.pa_id)
        );
      }

      //Movimienntos en listaProductos y listaDevueltos
      const paqueteDevuelto = paquetesDevueltos.find(
        (paquete) => paquete.pa_id == value.pa_id
      );
      let nuevaListaDevueltos = [...listaDevueltos];

      for (let X = 0; X < productosDelPaquete.length; X++) {
        //producto listado del paquete
        const productoListado = productosDelPaquete[X];
        //buscar si el producto existe en la lista de devueltos
        const productoListaDevueltos = listaDevueltos.find(
          (producto) => producto.produc_id == productoListado.produc_id
        );
        console.log("producto listado", productoListado, X);
        console.log("producto devuelto", productoListaDevueltos, X);
        //si existe en la lista de devueltos
        if (
          paqueteDevuelto.en_pa_cantidad * productoListado.produc_pa_cantidad ==
          productoListaDevueltos.en_es_produc_cant
        ) {
          console.log("es igual");
          //si son iguales eliminar el producto de la lista de devueltos
          nuevaListaDevueltos = nuevaListaDevueltos.filter(
            (producto) => producto.produc_id != productoListado.produc_id
          );
        } else {
          console.log("no es igual");
          nuevaListaDevueltos = nuevaListaDevueltos.map((producto) =>
            producto.produc_id == productoListado.produc_id
              ? {
                  ...producto,
                  en_es_produc_cant:
                    Number(producto.en_es_produc_cant) -
                    Number(
                      paqueteDevuelto.en_pa_cantidad *
                        productoListado.produc_pa_cantidad
                    ),
                }
              : producto
          );
        }
        //sumar a la lista de productos
        for (let Y = 0; Y < listaProductos.length; Y++) {
          const productoExistenteLista = listaProductos[Y];

          if (productoExistenteLista.produc_id == productoListado.produc_id) {
            productoExistenteLista.en_es_produc_cant =
              Number(productoExistenteLista.en_es_produc_cant) +
              Number(
                paqueteDevuelto.en_pa_cantidad *
                  productoListado.produc_pa_cantidad
              );
            console.log(
              "resgesado a la lista de productos ",
              productoListado.produc_nombre
            );
          }
        }
      }
      setListaDevueltos(nuevaListaDevueltos);
    }
    setIsSaved(false);
    setCambioListaEstados(true);
  };
  const productoVendido = (producto, cantidad) => {
    console.log("cantidad", cantidad);
    console.log("producto", producto);

    //busca en la lista de devueltos
    const devuelto = listaDevueltos.find(
      (produc) => produc.produc_id == producto
    );
    //Existe en la lista de ventas individuales
    const exist = listaVentaIndividual.find(
      (produc) => produc.produc_id == producto
    );
    //Si existe en la lista de ventas individuales
    if (exist) {
      //Si la cantidad seleccionada es igual a la cantidad existente
      if (cantidad == devuelto.en_es_produc_cant) {
        setListaDevueltos(
          listaDevueltos.filter((produc) => produc.produc_id != producto)
        );
      } else {
        //si no es igual solo resta la cantidad
        setListaDevueltos(
          listaDevueltos.map((produc) =>
            produc.produc_id == producto
              ? {
                  ...produc,
                  en_es_produc_cant:
                    Number(produc.en_es_produc_cant) - cantidad,
                }
              : produc
          )
        );
      }
      //modificar lista venatas individuales
      setListaVentaIndividual(
        listaVentaIndividual.map((produc) =>
          produc.produc_id == producto
            ? {
                ...produc,
                en_es_produc_cant: Number(produc.en_es_produc_cant) + cantidad,
              }
            : produc
        )
      );
    } else {
      if (cantidad == devuelto.en_es_produc_cant) {
        setListaDevueltos(
          listaDevueltos.filter((produc) => produc.produc_id != producto)
        );
      } else {
        setListaDevueltos(
          listaDevueltos.map((produc) =>
            produc.produc_id == producto
              ? {
                  ...produc,
                  en_es_produc_cant:
                    Number(produc.en_es_produc_cant) - cantidad,
                }
              : produc
          )
        );
      }
      //modificar lista venatas individuales
      setListaVentaIndividual([
        ...listaVentaIndividual,
        {
          ...devuelto,
          en_es_produc_cant: cantidad,
          en_es_produc_estado: "vendido individual",
        },
      ]);
    }
    setIsSaved(false);
    setCambioListaEstados(true);
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
          <p className={styles.textError}>{error.message}</p>
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
          \ Recibido \{" "}
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
        <div>
          <Button
            text={"Finalizar Entrega"}
            type={""}
            onPress={() => setShowModal(true)}
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
          <div className={styles.herramientasContenido}>
            <div className={styles.menuContenidoEntrega}>
              <Button
                text={"Contenido de la entrega"}
                type={mostrarProductosIndividuales ? "" : "cancelar"}
                onPress={() => {
                  setMostrarTotalProductos(false);
                  setMostrarProductosIndividuales(true);
                  setMostrarDevoluciones(false);
                  setMostrarVentasIndividuales(false);
                }}
              />
              {mostrarProductosIndividuales && (
                <Button
                  text={"Devolver Productos"}
                  type={mostrarDevoluciones ? "" : "cancelar"}
                  onPress={() => {
                    setMostrarDevoluciones(!mostrarDevoluciones);
                  }}
                />
              )}
            </div>
            {(listaDevueltos.length != 0 ||
              listaVentaIndividual.length != 0) && (
              <Button
                text={"venta individual"}
                type={mostrarVentasIndividuales ? "" : "cancelar"}
                onPress={() => {
                  setMostrarVentasIndividuales(true);
                  setMostrarProductosIndividuales(false);
                  setMostrarTotalProductos(false);
                }}
              />
            )}
            <Button
              text={"Total de Productos"}
              type={mostrarTotalProductos ? "" : "cancelar"}
              onPress={() => {
                setMostrarTotalProductos(true);
                setMostrarProductosIndividuales(false);
                setMostrarDevoluciones(false);
                setMostrarVentasIndividuales(false);
              }}
            />
          </div>
          {mostrarVentasIndividuales && (
            <div>
              {listaDevueltos.length != 0 && (
                <VentaIndividual
                  listaDevueltos={listaDevueltos}
                  vendidos={(prod, num) => productoVendido(prod, num)}
                />
              )}
              {listaVentaIndividual.length != 0 && (
                <VisualizarVentasIndividuales
                  listaVentasIndividuales={listaVentaIndividual}
                />
              )}
            </div>
          )}
          {mostrarProductosIndividuales && (
            <div>
              {mostrarDevoluciones && (
                <div className={styles.menuDevolucion}>
                  <div>
                    <label>Seleccionar a devolver: </label>
                    <select
                      onChange={(value) => {
                        setTipo(value.target.value);
                        setDevolverProducto(null);
                        setDevolverPaquete(null);
                        setCant(0);
                        setMax(0);
                      }}
                      className={`${styles.selecDevolver} ${styles.selecIzq}`}
                    >
                      <option value={"producto"}>producto</option>
                      <option value={"paquete"}>paquete</option>
                    </select>
                    {tipo == "producto" && (
                      <select
                        onChange={(data) =>
                          handleChangeSelectProduc(data.target.value)
                        }
                        className={styles.selecDevolver}
                      >
                        <option value={0}>--seleccionar--</option>
                        {productos.length != 0 && (
                          <>
                            {productos.map((producto, index) => (
                              <option value={producto.produc_id} key={index}>
                                {producto.produc_nombre}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    )}
                    {tipo == "paquete" && (
                      <select
                        onChange={(data) =>
                          handleChangeSelectPaq(data.target.value)
                        }
                        className={styles.selecDevolver}
                      >
                        <option value={0}>--seleccionar--</option>
                        {paquetes.length != 0 && (
                          <>
                            {paquetes.map((paquete, index) => (
                              <option value={paquete.pa_id} key={index}>
                                {paquete.pa_nombre}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    )}
                    <input
                      type="number"
                      min={0}
                      max={max}
                      value={cant}
                      onChange={(data) => {
                        setCant(data.target.value);
                      }}
                      className={styles.inputDevolver}
                    />
                    <Button
                      text={"Aceptar"}
                      type={"cancelar"}
                      onPress={() => {
                        setShowModalDevolver(true);
                      }}
                      disabled={cant != 0 ? false : true}
                    />
                  </div>
                </div>
              )}
              <VisualizarContenidoDeEntrega
                paquetes={paquetes}
                productos={productos}
                totalAPagar={(data) => {}}
              />
              {(productosDevueltos.length != 0 || paquetesDevueltos.length) !=
                0 && (
                <VisualizarDevueltos
                  paquetes={paquetesDevueltos}
                  productos={productosDevueltos}
                  edicion={false}
                  deshacer={(data) => deshacerDevolucion(data)}
                />
              )}
            </div>
          )}
          {mostrarTotalProductos && (
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
        title={"Finalizar Entrega"}
        show={showModal}
        message={"¿Desea finalizar la entrega?"}
        handleAccept={() => {
          handleGuardar();
          setLoadingData(true);
          finalizarEntrega();
        }}
        handleClose={() => setShowModal(false)}
      />
      <Modal
        title={"Nuevo Pago"}
        show={showModalPagos}
        message={"¿Desea agregar el nuevo pago?"}
        handleAccept={() => {
          addNewPay();
        }}
        handleClose={() => setShowModalPagos(false)}
      />
      <Modal
        show={showModalDevolver}
        title={"Devolver Producto"}
        message={
          "Si devuelves un producto no podras deshacer la acción, ¿Deseas Continuar?"
        }
        handleClose={() => setShowModalDevolver(false)}
        handleAccept={() => {
          setShowModalDevolver(false);
          onPressDevolver();
        }}
      />
      <Alert
        title={"Datos del pago invalidos"}
        message={
          "Por favor, complete todos los campos o introdusca un monto valido"
        }
        show={showAlertPagos}
        handleAccept={() => setShowAlertPagos(false)}
      />
      <Alert
        title={"Falta saldo por paga"}
        message={
          "Aún queda saldo por cubrir y puede que algunos productos no se hagan repuesto o entregado"
        }
        show={showAlertFinalizar}
        handleAccept={() => setShowAlertFinalizar(false)}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default Recibido;
