"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Input,
  Search,
  Button,
  CheckBox,
  Modal,
} from "@/components/input/InputComponents";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";

function FilaProducto({ producto, addProductList, deleteProductList, changeValue, incialiced }) {
  const existe = incialiced.find((item) => item.produc_id == producto.produc_id);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (existe) {
      setCantidad(existe.produc_pa_cantidad);
    }
  }, [existe]);

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
          onChange={(num) => {
            setCantidad(num.target.value);
            changeValue(producto.produc_id, num.target.value);
          }}
        />
      </div>
      <span className={styles.checkbox}>
        <CheckBox
          value={producto.produc_id}
          onSelect={() => {
            addProductList(producto.produc_id);
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

function EditarPaquete() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [validarNombre, setValidarNombre] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [validarDescripcion, setValidarDescripcion] = useState(false);
  const [precio, setPrecio] = useState("");
  const [validarPrecio, setvalidarPrecio] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState(null);
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`/api/paquetes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNombre(data.pa_nombre);
        setDescripcion(data.pa_descripcion);
        setPrecio(data.pa_precio);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });

    fetch("/api/productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });

    fetch(`/api/paquetes/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setListaProductos(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    } else {
      router.push("/paquetes");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);

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
    if (nombre != "" && descripcion != "" && precio > 0 && listaProductos.length != 0) {
      setValidarNombre(false);
      setValidarDescripcion(false);
      setvalidarPrecio(false);
      setShowModal(true);
    }
  };
  const addProductList = (produc_id, cant) => {
    console.log(produc_id, cant);
    const newObjet = { pa_id: id, produc_id: produc_id, produc_pa_cantidad: cant };
    setListaProductos([...listaProductos, newObjet]);
  };
  const deleteProductList = (produc_id) => {
    console.log(produc_id);
    const nuevaLista = listaProductos.filter(
      (item) => item.produc_id !== produc_id
    );
    setListaProductos(nuevaLista);
  };
  const editProductLisr = async () => {
    try {
      const response = await fetch(`/api/paquetes/productos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("No se borro");
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

      await fetch(`/api/paquetes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pa_nombre: nombre,
          pa_descripcion: descripcion,
          pa_precio: precio,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
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

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/paquetes" className={styles.link}>
            Paquetes
          </Link>{" "}
          \ Editar
        </h4>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.formulario}>
          <div>
            <h3>Informacion del paquete</h3>
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
                      addProductList={(prod, cant) => addProductList(prod, cant)}
                      deleteProductList={(prd) => deleteProductList(prd)}
                      changeValue={changeValue}
                      incialiced={listaProductos}
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
        title={"Editar el Paquete"}
        message={"¿Quieres editar el contenido del paquete?"}
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAccept={() => {
          editProductLisr();
        }}
      />
    </div>
  );
}

export default EditarPaquete;
