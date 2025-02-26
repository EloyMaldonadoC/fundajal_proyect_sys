"use client";
import { useState, useEffect } from "react";
import styles from "./module/TablaSeleccionProductos.module.css";
import { Search } from "@/components/input/InputComponents";
import LoadingScreen from "@/components/LoadingScreen";
import InputNumber from "./InputNumber";

function TablaSeleccionProductos({ listaProductos, idEntrega, validar, modificador, modificarLista }) {
  const [buscar, setBuscar] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const listaProductosModific = listaProductos.map((producto) => ({
      ...producto,
      en_produc_oferta: Number(modificador),
    }));
    modificarLista(listaProductosModific);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modificador]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addOrUpdateProduct = (id, newProduct) => {
    const existingProduct = listaProductos.find(
      (item) => item.produc_id === id
    );

    if (newProduct === "" || newProduct === "0") {
      // Eliminar el producto existente si newProduct está vacío
      const updatedList = listaProductos.filter(
        (item) => item.produc_id !== id
      );
      modificarLista(updatedList);
    } else if (existingProduct) {
      // Actualizar el producto existente
      const updatedList = listaProductos.map((item) =>
        item.produc_id === id
          ? {
              ...item,
              ...{
                en_id: Number(idEntrega),
                produc_id: Number(id),
                en_produc_cantidad: Number(newProduct),
              },
            }
          : item
      );
      modificarLista(updatedList);
    } else {
      // Añadir un nuevo producto a la lista
      const produc = productos.find((producto) => producto.produc_id == id);
      const newObject = {
        ...produc,
        en_id: Number(idEntrega),
        produc_id: Number(id),
        en_produc_cantidad: Number(newProduct),
        en_produc_estado: "en entrega",
        en_produc_oferta: Number(modificador),
        en_produc_precio: produc.produc_precio_venta,
      };
      modificarLista([...listaProductos, newObject]);
    }
  };

  // Calcular los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos
    .filter((producto) =>
      producto.produc_nombre.toLowerCase().includes(buscar.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  // Número total de páginas
  const totalPages = Math.ceil(
    productos.filter((producto) =>
      producto.produc_nombre.toLowerCase().includes(buscar.toLowerCase())
    ).length / itemsPerPage
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`${validar ? styles.validar : ""}`}>
      <div className={styles.containerNav}>
        <h3>Productos</h3>
        <Search
          type={"light"}
          placeholder={"Buscar Producto"}
          onSearch={(buscar) => {
            setBuscar(buscar);
          }}
        />
      </div>
      <div className={styles.title}>
        <div className={styles.nombre}>
          <h4>Nombre</h4>
        </div>
        <div className={styles.precio}>
          <h4>Precio</h4>
        </div>
        <div className={styles.cantidad}>
          <h4>cantidad</h4>
        </div>
      </div>
      {productos && (
        <>
          {currentItems.map((producto, key) => (
            <div key={key}>
              {producto.produc_nombre
                .toLowerCase()
                .includes(buscar.toLowerCase()) && (
                <div className={styles.container}>
                  <div className={styles.nombre}>{producto.produc_nombre}</div>
                  <div className={styles.precio}>
                    ${producto.produc_precio_venta}
                  </div>
                  <div className={styles.cantidad}>
                    <InputNumber
                      inicialiced={listaProductos}
                      id={producto.produc_id}
                      onChange={(val) =>
                        addOrUpdateProduct(producto.produc_id, val)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      <div className={styles.footer}>
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
      </div>
    </div>
  );
}

export default TablaSeleccionProductos;
