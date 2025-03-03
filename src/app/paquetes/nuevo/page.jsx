"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Search,
  CheckBox,
  Modal,
} from "@/components/input/InputComponents";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";
import LoadingData from "@/components/LoadingData";

function FilaProducto({ producto, addProductList, deleteProductList, changeValue, incialiced }) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className={styles.tablaContenido} key={producto.produc_id}>
      <p className={styles.celda}>{producto.produc_nombre}</p>
      <p className={styles.celda}>${producto.produc_precio_venta}</p>
      <div className={styles.celda}>
        <input
          type="number"
          min={1}
          className={styles.input}
          value={cantidad}
          onChange={(num) => {setCantidad(num.target.value); changeValue(producto.produc_id, num.target.value);}}
        />
      </div>
      <span className={styles.checkbox}>
        <CheckBox
          value={producto.produc_id}
          onSelect={() => {
            addProductList(producto.produc_id, cantidad);
          }}
          onUnselect={() => {
            deleteProductList(producto.produc_id);
          }}
          inicialiced={incialiced}
        />
      </span>
    </div>
  );
}

function NuevoPaquete() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [paID, setPaID] = useState(null);
  const [nombre, setNombre] = useState("");
  const [validarNombre, setValidarNombre] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [validarDescripcion, setValidarDescripcion] = useState(false);
  const [precio, setPrecio] = useState("");
  const [validarPrecio, setvalidarPrecio] = useState(false);
  const [comision, setComision] = useState("");
  const [validarComision, setValidarComision] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState(null);
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch("/api/productos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProductos(data);
          generateNewID();
          console.log(data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const generateNewID = () => {
    const newID = Math.floor(1000000 + Math.random() * 90000000);
    setPaID(newID);
  };
  const addProductList = (id, cantidad) => {
    console.log(id);
    const newObjet = { pa_id: paID, produc_id: id, produc_pa_cantidad: cantidad };
    setListaProductos([...listaProductos, newObjet]);
  };
  const deleteProductList = (id) => {
    console.log(id);
    const nuevaLista = listaProductos.filter((item) => item.produc_id !== id);
    setListaProductos(nuevaLista);
  };
  const changeValue = (id, cantidad) => {
    console.log(id, cantidad);
    const newLista = listaProductos.map((item) => {
      if (item.produc_id === id) {
        item.produc_pa_cantidad = cantidad;
      }
      return item;
    });
    setListaProductos(newLista);
  };
  const validateForm = () => {
    if (nombre == "") {
      setValidarNombre(true);
    } else {
      setValidarNombre(false);
    }
    if (descripcion == "") {
      setValidarDescripcion(true);
    } else {
      setValidarDescripcion(false);
    }
    if (precio <= 0) {
      setvalidarPrecio(true);
    } else {
      setvalidarPrecio(false);
    }
    if (comision <= 0) {
      setValidarComision(true);
    } else {
      setValidarComision(false);
    }
    if (nombre != "" && descripcion != "" && precio > 0 && listaProductos.length != 0 && comision > 0) {
      setValidarNombre(false);
      setValidarDescripcion(false);
      setvalidarPrecio(false);
      setShowModal(true);
    }
  };
  const createNewPacket = async () => {
    try {
      const response = await fetch("/api/paquetes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pa_id: paID,
          pa_nombre: nombre,
          pa_descripcion: descripcion,
          pa_precio: precio,
          pa_comision: comision,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetch("/api/paquetes/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listaProductos),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setShowModal(false);
        router.push("/paquetes");
        return response.json();
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/paquetes" className={styles.link}>
            Paquetes
          </Link>{" "}
          \ Nuevo
        </h4>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.formulario}>
          <div>
            <h3>Información del paquete</h3>
          </div>
          <div>
            <Input
              placeholder={"Nombre"}
              value={nombre}
              type={"text"}
              onChange={(nombre) => {
                setNombre(nombre);
              }}
              validation={validarNombre}
            />
            <Input
              placeholder={"Descripción"}
              value={descripcion}
              type={"text"}
              onChange={(descripcion) => {
                setDescripcion(descripcion);
              }}
              validation={validarDescripcion}
            />
            <Input
              placeholder={"Precio"}
              value={precio}
              type={"number"}
              onChange={(precio) => {
                setPrecio(precio);
              }}
              validation={validarPrecio}
            />
            <Input
              placeholder={"Comisión"}
              value={comision}
              type={"number"}
              onChange={(comision) => {
                setComision(comision);
              }}
              validation={validarComision}
            />
          </div>
        </div>
        <div className={styles.herramientas}>
          <Search
            placeholder={"Buscar producto"}
            onSearch={(data) => {
              setBusqueda(data);
            }}
          />
          <Button text={"Aceptar"} type={"cancelar"} onPress={validateForm} />
        </div>
        <div className={styles.tabla}>
          <div className={styles.tablaEncabezado}>
            <h3 className={styles.celda}>Nombre</h3>
            <h3 className={styles.celda}>Precio</h3>
            <h3 className={styles.celda}>Cantidad</h3>
            <h3 className={styles.checkbox}>Elegir</h3>
          </div>
          {productos && (
            <>
              {productos.map((producto, idKey) => (
                <div key={idKey}>
                  {producto.produc_nombre
                    .toLowerCase()
                    .includes(busqueda.toLowerCase()) && (
                    <FilaProducto
                      producto={producto}
                      addProductList={(prd, cnt) => addProductList( prd, cnt)}
                      deleteProductList={(prd) => deleteProductList(prd)}
                      incialiced={listaProductos}
                      changeValue={(prd, cnt) => changeValue(prd, cnt)}
                    />
                  )}
                </div>
              ))}
            </>
          )}
          <div className={styles.tablaPiedePagina} />
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Agregar nuevo paquete"}
        message={
          "¿Deseas agregar el nuevo paquete y todos sus productos seleccionados?"
        }
        handleAccept={() => {createNewPacket(); setLoadingData(true);}}
        handleClose={() => {
          setShowModal(false);
        }}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default NuevoPaquete;
