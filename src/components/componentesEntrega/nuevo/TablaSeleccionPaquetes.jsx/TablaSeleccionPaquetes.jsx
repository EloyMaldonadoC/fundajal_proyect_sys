"use client";
import { useEffect, useState } from "react";
import styles from "./module/TablaSeleccionPaquetes.module.css";
import { Search } from "@/components/input/InputComponents";
import LoadingScreen from "@/components/LoadingScreen";
import InputNumber from "./InputNumber";

function TablaSeleccionPaquetes({
  listaPaquetes,
  modificarLista,
  idEntrega,
  validar,
  modificador,
  paque,
}) {
  const [buscar, setBuscar] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    setPaquetes(paque);
    setLoading(false);
  }, [paque]);

  useEffect(() => {
    const listaPaquetesModific = listaPaquetes.map((paquete) => ({
      ...paquete,
      en_pa_desc: Number(modificador),
    }));
    modificarLista(listaPaquetesModific);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modificador]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addOrUpdateProduct = (id, newPacket) => {
    const existingPacket = listaPaquetes.find((item) => item.pa_id === id);

    if (newPacket === "" || newPacket === "0") {
      // Eliminar el paquete existente si newProduct está vacío
      const updatedList = listaPaquetes.filter((item) => item.pa_id !== id);
      modificarLista(updatedList);
    } else if (existingPacket) {
      // Actualizar el paquete existente
      const updatedList = listaPaquetes.map((item) =>
        item.pa_id === id
          ? {
              ...item,
              ...{
                en_id: Number(idEntrega),
                pa_id: Number(id),
                en_pa_cantidad: Number(newPacket),
              },
            }
          : item
      );
      modificarLista(updatedList);
    } else {
      // Añadir un nuevo paquete a la lista
      const pack = paquetes.find((item) => item.pa_id == id);
      const newObject = {
        ...pack,
        en_id: Number(idEntrega),
        pa_id: Number(id),
        en_pa_cantidad: Number(newPacket),
        en_pa_estado: "en entrega",
        en_pa_desc: Number(modificador),
        en_pa_precio: pack.pa_precio,
      };
      modificarLista([...listaPaquetes, newObject]);
    }
  };

  // Calcular los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paquetes
    .filter((paquete) =>
      paquete.pa_nombre.toLowerCase().includes(buscar.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  // Número total de páginas
  const totalPages = Math.ceil(
    paquetes.filter((paquete) =>
      paquete.pa_nombre.toLowerCase().includes(buscar.toLowerCase())
    ).length / itemsPerPage
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`${styles.container} ${validar ? styles.validar : ""}`}>
      <div className={styles.menu}>
        <h3>Paquetes</h3>
        <Search
          type={"light"}
          placeholder={"Buscar Producto"}
          onSearch={(data) => {
            setBuscar(data);
          }}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.nombre}>
          <h3>Nombre</h3>
        </div>
        <div className={styles.precio}>
          <h3>Precio</h3>
        </div>
        <div className={styles.cantidad}>
          <h3>Cantidad</h3>
        </div>
      </div>
      {paquetes.length != 0 && (
        <>
          {currentItems.map((paquete, key) => (
            <div key={key}>
              {paquete.pa_nombre
                .toLowerCase()
                .includes(buscar.toLowerCase()) && (
                <div className={styles.content}>
                  <div className={styles.nombre}>{paquete.pa_nombre}</div>
                  <div className={styles.precio}>${paquete.pa_precio}</div>
                  <div className={styles.cantidad}>
                    <InputNumber
                      id={paquete.pa_id}
                      onChange={(val) => addOrUpdateProduct(paquete.pa_id, val)}
                      inicialiced={listaPaquetes}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      <div className={styles.footer}>
        <div className={styles.buttonsContainer}>
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
    </div>
  );
}

export default TablaSeleccionPaquetes;
