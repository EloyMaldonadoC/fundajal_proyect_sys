import { useEffect, useState } from "react";
import styles from "./module/TablaEditarPaquetes.module.css";
import { Button, Search } from "@/components/input/InputComponents";
import InputNumber from "./InputNumber";
import InputAddCost from "./InputAddCost";

function TablaEditarPaquetes({
  idEntrega,
  lista,
  seleccionados,
  update,
  incrementoPrede
}) {
  const [paquetes, setPaquetes] = useState([]);
  const [listaPaquetes, setListaPaquetes] = useState([]);
  const [mostrarTotal, setMostrarTotal] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/paquetes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPaquetes(data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    setListaPaquetes(lista);
  }, [lista]);

  const updateCost = (paquete, nuevaCantidad) => {
    // Actualizar el producto existente
    const updatedList = listaPaquetes.map((item) =>
      item.pa_id === paquete.pa_id
        ? {
            ...item,
            ...{
              en_pa_desc: Number(nuevaCantidad),
            },
          }
        : item
    );
    setListaPaquetes(updatedList);
    seleccionados(updatedList);
    update(0);
  };

  const addOrUpdateProduct = (paquetes, nuevaCantidad) => {
    const existingPacket = listaPaquetes.find(
      (item) => item.pa_id === paquetes.pa_id
    );

    if (nuevaCantidad === "" || nuevaCantidad === "0") {
      // Eliminar el producto existente si newProduct está vacío
      const updatedList = listaPaquetes.filter(
        (item) => item.pa_id !== paquetes.pa_id
      );
      setListaPaquetes(updatedList);
      seleccionados(updatedList);
    } else if (existingPacket) {
      // Actualizar el producto existente
      const updatedList = listaPaquetes.map((item) =>
        item.pa_id === paquetes.pa_id
          ? {
              ...item,
              ...{
                en_id: Number(idEntrega),
                pa_id: Number(paquetes.pa_id),
                en_pa_cantidad: Number(nuevaCantidad),
              },
            }
          : item
      );
      setListaPaquetes(updatedList);
      seleccionados(updatedList);
    } else {
      // Añadir un nuevo producto a la lista
      const newObject = {
        ...paquetes,
        en_id: Number(idEntrega),
        en_pa_desc: incrementoPrede,
        en_pa_estado: "en entrega",
        en_pa_precio: paquetes.pa_precio,
        en_pa_cantidad: Number(nuevaCantidad),
      };
      setListaPaquetes([...listaPaquetes, newObject]);
      seleccionados([...listaPaquetes, newObject]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paquetes
    .filter((paquete) =>
      paquete.pa_nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  // Número total de páginas
  const totalPages = Math.ceil(
    paquetes.filter((paquete) =>
      paquete.pa_nombre.toLowerCase().includes(busqueda.toLowerCase())
    ).length / itemsPerPage
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.header}>
        {!mostrarTotal ? <h3>Paquetes</h3> : <h3>Paquetes Totales</h3>}
        {!mostrarTotal && (
          <Search
            type={"light"}
            placeholder={"Buscar producto"}
            onSearch={(text) => setBusqueda(text)}
          />
        )}
        <Button
          text={"Lista"}
          type={"aceptar"}
          onPress={() => setMostrarTotal(!mostrarTotal)}
        />
      </div>
      <div className={styles.titulo}>
        {!mostrarTotal ? (
          <>
            <h4 className={styles.nombre}>Producto</h4>
            <h4 className={styles.precio}>precio</h4>
            <h4 className={styles.cantidad}>cantidad</h4>
          </>
        ) : (
          <>
            <h4 className={styles.nombreTotal}>Producto</h4>
            <h4 className={styles.precioTotal}>precio</h4>
            <h4 className={styles.modificadorTotal}>modificador</h4>
            <h4 className={styles.cantidadTotal}>cantidad</h4>
          </>
        )}
      </div>
      {!cargando ? (
        <>
          {paquetes.length != 0 ? (
            <>
              {!mostrarTotal ? (
                <>
                  {currentItems.map((paquete, index) => (
                    <div key={index}>
                      {paquete.pa_nombre
                        .toLowerCase()
                        .includes(busqueda.toLowerCase()) && (
                        <div className={styles.container}>
                          <div className={styles.nombre}>
                            {paquete.pa_nombre}
                          </div>
                          <div className={styles.precio}>
                            ${paquete.pa_precio}
                          </div>
                          <div className={styles.cantidad}>
                            <InputNumber
                              inicialiced={listaPaquetes}
                              id={paquete.pa_id}
                              onChange={(val) =>
                                addOrUpdateProduct(paquete, val)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  {listaPaquetes.map((paquete, index) => (
                    <div className={styles.container} key={index}>
                      <div className={styles.nombreTotal}>
                        {paquete.pa_nombre}
                      </div>
                      <div className={styles.precioTotal}>
                        $
                        {Number(paquete.pa_precio) + Number(paquete.en_pa_desc)}
                      </div>
                      <div className={styles.modificadorTotal}>
                        <InputAddCost
                          inicialiced={listaPaquetes}
                          id={paquete.pa_id}
                          onChange={(val) => {
                            updateCost(paquete, val);
                          }}
                        />
                      </div>
                      <div className={styles.cantidadTotal}>
                        {paquete.en_pa_cantidad}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.container}>
              <p>Aun no hay productos</p>
            </div>
          )}
        </>
      ) : (
        <div className={styles.container}>Cargando...</div>
      )}
      <div className={styles.fooder} />
      {!mostrarTotal && (
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
      )}
    </div>
  );
}

export default TablaEditarPaquetes;
