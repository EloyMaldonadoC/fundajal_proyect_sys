import { useEffect, useState } from "react";
import styles from "./module/TablaEditarProductos.module.css";
import { Button, Search } from "@/components/input/InputComponents";
import InputNumber from "./InputNumber";
import InputAddCost from "./InputAddCost";
import { formatNumber } from "@/functions/utilsFormat";

function TablaEditarProductos({
  idEntrega,
  lista,
  seleccionados,
  update,
  incrementoPrede,
  produc
}) {
  const [productos, setProductos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [mostrarTotal, setMostrarTotal] = useState(false);

  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setListaProductos(lista);
    setProductos(produc);
  }, [lista, produc]);

  const addOrUpdateProduct = (producto, nuevaCantidad) => {
    const existingProduct = listaProductos.find(
      (item) => item.produc_id === producto.produc_id
    );

    if (nuevaCantidad === "" || nuevaCantidad === "0") {
      // Eliminar el producto existente si newProduct está vacío
      const updatedList = listaProductos.filter(
        (item) => item.produc_id !== producto.produc_id
      );
      setListaProductos(updatedList);
      seleccionados(updatedList);
    } else if (existingProduct) {
      // Actualizar el producto existente
      const updatedList = listaProductos.map((item) =>
        item.produc_id === producto.produc_id
          ? {
              ...item,
              ...{
                en_id: Number(idEntrega),
                produc_id: Number(producto.produc_id),
                en_produc_cantidad: Number(nuevaCantidad),
              },
            }
          : item
      );
      setListaProductos(updatedList);
      seleccionados(updatedList);
    } else {
      // Añadir un nuevo producto a la lista
      const newObject = {
        ...producto,
        en_id: Number(idEntrega),
        en_produc_cantidad: Number(nuevaCantidad),
        en_produc_estado: "en entrega",
        en_produc_oferta: incrementoPrede,
        en_produc_precio: producto.produc_precio_venta,
      };
      setListaProductos([...listaProductos, newObject]);
      seleccionados([...listaProductos, newObject]);
    }
  };

  const updateCost = (producto, nuevaCantidad) => {
    // Actualizar el producto existente
    const updatedList = listaProductos.map((item) =>
      item.produc_id === producto.produc_id
        ? {
            ...item,
            ...{
              en_produc_oferta: Number(nuevaCantidad),
            },
          }
        : item
    );
    setListaProductos(updatedList);
    seleccionados(updatedList);
    update(0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos
    .filter((producto) =>
      producto.produc_nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  // Número total de páginas
  const totalPages = Math.ceil(
    productos.filter((producto) =>
      producto.produc_nombre.toLowerCase().includes(busqueda.toLowerCase())
    ).length / itemsPerPage
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.header}>
        {!mostrarTotal ? (
          <h3>Productos</h3>
        ) : (
          <h3>Productos Totales</h3>
        )}
        {!mostrarTotal && (
          <Search
            type={"light"}
            placeholder={"Buscar producto"}
            onSearch={(text) => setBusqueda(text)}
          />
        )}
        <Button text={"Lista"} type={"aceptar"} onPress={() => {setMostrarTotal(!mostrarTotal)}}/>
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
      {productos.length != 0 ? (
        <>
          {productos.length != 0 ? (
            <>
              {!mostrarTotal ? (
                <>
                  {currentItems.map((producto, index) => (
                    <div key={index}>
                      {producto.produc_nombre
                        .toLowerCase()
                        .includes(busqueda.toLowerCase()) && (
                        <div className={styles.container}>
                          <div className={styles.nombre}>
                            {producto.produc_nombre}
                          </div>
                          <div className={styles.precio}>
                            {formatNumber(producto.produc_precio_venta)}
                          </div>
                          <div className={styles.cantidad}>
                            <InputNumber
                              inicialiced={listaProductos}
                              id={producto.produc_id}
                              onChange={(val) =>
                                addOrUpdateProduct(producto, val)
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
                  {listaProductos.map((producto, index) => (
                    <div className={styles.container} key={index}>
                      <div className={styles.nombreTotal}>
                        {producto.produc_nombre}
                      </div>
                      <div className={styles.precioTotal}>
                        ${Number(producto.produc_precio_venta) + Number(producto.en_produc_oferta)}
                      </div>
                      <div className={styles.modificadorTotal}>
                        <InputAddCost
                          inicialiced={listaProductos}
                          id={producto.produc_id}
                          onChange={(val) => {
                            updateCost(producto, val);
                          }}
                        />
                      </div>
                      <div className={styles.cantidadTotal}>
                        {producto.en_produc_cantidad}
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

export default TablaEditarProductos;
