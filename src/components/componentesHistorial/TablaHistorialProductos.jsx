import { useState, useEffect, use } from "react";
import styles from "./module/TablaHistorialProductos.module.css";
import { formatNumber, obtenerHoraActual } from "@/functions/utilsFormat";
import TablaHistorial from "./TablaHistorial";
import TablaProveedores from "./TablaProveedores";
import { Button, Modal, Select } from "../input/InputComponents";
import LoadingData from "../LoadingData";

function InfoProducto({ producto }) {
  const [desplegar, setDesplegar] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const buscarHistorial = () => {
    fetch(`/api/historial/inventario/${producto.produc_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar historial");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHistorial(data.historial);
        setProveedores(data.proveedores);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historial.slice(indexOfFirstItem, indexOfLastItem);
  // Número total de páginas
  const totalPages = Math.ceil(historial.length / itemsPerPage);

  return (
    <>
      <div
        className={`
          ${styles.container} 
          ${desplegar ? styles.desplegado : ""}
        `}
        onClick={() => {
          setDesplegar(!desplegar);
          if (!desplegar && historial.length == 0) {
            buscarHistorial();
          }
        }}
      >
        <div className={styles.nombre}>
          {desplegar ? (
            <h3>{producto.produc_nombre}</h3>
          ) : (
            <p>{producto.produc_nombre}</p>
          )}
        </div>
        <div className={styles.cantidad}>
          {desplegar ? (
            <h3>{producto.produc_existencias}</h3>
          ) : (
            <p>{producto.produc_existencias}</p>
          )}
        </div>
        <div className={styles.precio}>
          {desplegar ? (
            <h3>{formatNumber(producto.produc_precio_venta)}</h3>
          ) : (
            <p>{formatNumber(producto.produc_precio_venta)}</p>
          )}
        </div>
        <div className={styles.participacion}>
          {desplegar ? (
            <h3>{formatNumber(producto.produc_parti_fun)}</h3>
          ) : (
            <p>{formatNumber(producto.produc_parti_fun)}</p>
          )}
        </div>
        <div className={styles.participacion}>
          {desplegar ? (
            <h3>{formatNumber(producto.produc_parti_enlace)}</h3>
          ) : (
            <p>{formatNumber(producto.produc_parti_enlace)}</p>
          )}
        </div>

        {desplegar && (
          <div className={styles.contenedorHistorial}>
            <TablaHistorial historial={historial} />
            {[...Array(totalPages).keys()].map((number) => (
              <button
                className={`${styles.button} ${
                  number + 1 === currentPage ? styles.disabled : styles.enabled
                }`}
                key={number}
                onClick={() => handlePageChange(number + 1)}
                disabled={number + 1 === currentPage}
              >
                {number + 1}
              </button>
            ))}
            <TablaProveedores proveedores={proveedores} />
          </div>
        )}
      </div>
    </>
  );
}

function TablaHistorialProductos() {
  const [productos, setProductos] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(0);
  const [productoSelecionado, setProductoSelecionado] = useState(0);
  const [maximo, setMaximo] = useState(0);
  const [cantidad, setCantidad] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [productoModificado, setProductoModificado] = useState(false);

  useEffect(() => {
    fetch("/api/productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productoModificado]);

  const removerInventario = async () => {
    const now = new Date();
    const producto = productos.find(
      (producto) => producto.produc_id == productoSelecionado
    );
    const nuevaCantidad = producto.produc_existencias - cantidad;
    await fetch(`/api/productos/${productoSelecionado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produc_existencias: nuevaCantidad,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error al actualizar producto");
      }
      return response.json();
    }).catch((error) => {
      console.log(error);
    });
    //generar historial
    await fetch(`/api/inventario/historial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produc_id: productoSelecionado,
        hist_estado: "salida",
        hist_cantidad: cantidad,
        hist_precio_ent_sal: producto.produc_precio_venta,
        hist_motivo: opcionSeleccionada == 1 ? "venta individual" : opcionSeleccionada == 2 ? "dañado" : opcionSeleccionada == 3 ? "no encontrado" : "garantía",
        hist_dia: now.toISOString().split("T")[0],
        hist_hora: obtenerHoraActual(),
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error al generar historial");
      }
      return response.json();
    }).catch((error) => {
      console.log(error);
    });
    setOpcionSeleccionada(0);
    setProductoSelecionado(0);
    setCantidad(0);
    setShowModal(false);
    setLoadingData(false);
    setProductoModificado(!productoModificado);
  }

  return (
    <div>
      <div className={styles.herramientas}>
        <div>
          <label>Seleccionar opción: </label>
          <select
            className={styles.select}
            value={opcionSeleccionada}
            onChange={(event) => {
              setOpcionSeleccionada(event.target.value);
              console.log(event.target.value);
            }}
          >
            <option value={0}>--Seleccionar--</option>
            <option value={1}>venta individual</option>
            <option value={2}>dañado</option>
            <option value={3}>no encontrado</option>
            <option value={4}>garantía</option>
          </select>
          <label>Seleccionar producto: </label>
          <select
            className={styles.select}
            value={productoSelecionado}
            onChange={(event) => {
              setProductoSelecionado(event.target.value);
              setMaximo(
                productos.find(
                  (producto) => producto.produc_id == event.target.value
                ).produc_existencias
              );
            }}
          >
            <option value={0}>--Seleccionar--</option>
            {productos.map((producto, index) => (
              <option key={index} value={producto.produc_id}>
                {producto.produc_nombre}
              </option>
            ))}
          </select>
          <input
            className={styles.input}
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(event) => {
              setCantidad(event.target.value);
            }}
            min={0}
            max={maximo}
            disabled={productoSelecionado == 0 ? true : false}
          />
        </div>
        <div>
          <Button
            text={"Aceptar"}
            disabled={
              opcionSeleccionada == 0 ||
              productoSelecionado == 0 ||
              cantidad == 0
                ? true
                : false
            }
            type={
              opcionSeleccionada == 0 ||
              productoSelecionado == 0 ||
              cantidad == 0
                ? ""
                : "cancelar"
            }
            onPress={() => {
              setShowModal(true);
            }}
          />
        </div>
      </div>
      <div className={styles.header}>
        <h3>Historial de productos</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.cantidad}>Cantidad</h4>
        <h4 className={styles.precio}>Precio</h4>
        <h4 className={styles.participacion}>Participación Fundación</h4>
        <h4 className={styles.participacion}>Participación Enlace</h4>
      </div>
      {productos.length != 0 && (
        <>
          {productos.map((producto, index) => (
            <InfoProducto key={index} producto={producto} />
          ))}
        </>
      )}
      <div className={styles.fooder} />
      <Modal
        title={"Ejecutar Acción"}
        message={
          "¿Quieres ejecutar la acción?, Se retirara la cantida de productos del inventario y no se podra deshacer la acción"
        }
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAccept={() => {
          setLoadingData(true);
          removerInventario();
        }}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default TablaHistorialProductos;
