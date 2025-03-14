"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
//componentes
import LoadingScreen from "@/components/LoadingScreen";
import { Button, Input, Modal } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { obtenerHoraActual } from "@/functions/utilsFormat";
import LoadingData from "@/components/LoadingData";

const generateID = () => {
  return Math.floor(1000000 + Math.random() * 90000000);
};

function NewProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  //vista
  const [verProveedor, setVerProveedor] = useState(true);
  const [verProducto, setVerProducto] = useState(false);
  const [verFinalizar, setVerFinalizar] = useState(false);
  //Estados
  const [existeProveedor, setExisteProveedor] = useState(false);
  const [existeProducto, setExisteProducto] = useState(false);
  const [existeRelacion, setExisteRelacion] = useState(false);
  const [productoExistente, setProductoExistente] = useState(false);
  //Validaciones
  const [provReadOnly, setProvReadOnly] = useState(false);
  const [producReadOnly, setProducReadOnly] = useState(false);
  const [validarProv, setValidarProv] = useState(false);
  const [validarProduc, setValidarProduc] = useState(false);
  //Recursos
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  //Proveedor
  const [provId, setProvId] = useState(generateID());
  const [provNombre, setProvNombre] = useState("");
  const [provDireccion, setProvDireccion] = useState("");
  const [provContacto, setProvContacto] = useState("");
  const [provMunicipio, setProvMunicipio] = useState("");
  const [provEstado, setProvEstado] = useState("");
  const [provRFC, setProvRFC] = useState("");
  //Producto
  const [producId, setProducId] = useState(generateID());
  const [producNombre, setProducNombre] = useState("");
  const [producPrecio, setProducPrecio] = useState("");
  const [producComisionFundacion, setProducComisionFundacion] = useState("");
  const [producComisionEnlace, setProducComisionEnlace] = useState("");
  //historial
  const [histPrecio, setHistPrecio] = useState("");
  const [histCantidad, setHistCantidad] = useState("");
  //modales
  const [showModalProv, setShowModalProv] = useState(false);
  const [showModalFinaly, setShowModalFinaly] = useState(false);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`/api/proveedores`)
        .then((respose) => {
          if (!respose.ok) {
            throw new Error("Network response was not ok");
          }
          return respose.json();
        })
        .then((data) => {
          setProveedores(data);
          setLoading(false);

          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      fetch(`/api/productos`)
        .then((respose) => {
          if (!respose.ok) {
            throw new Error("Network response was not ok");
          }
          return respose.json();
        })
        .then((data) => {
          setProductos(data);
          setLoading(false);

          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarProductosRelacionados = (id) => {
    fetch(`/api/inventario/proveedores/${id}`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProductosRelacionados(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const proveedorSelecionado = (e) => {
    const proveedorSel = proveedores.find((item) => item.prov_id == e);
    if (e > 0) {
      setProvId(proveedorSel.prov_id);
      setProvNombre(proveedorSel.prov_nombre);
      setProvDireccion(proveedorSel.prov_direccion);
      setProvContacto(proveedorSel.prov_numero_cont);
      setProvMunicipio(proveedorSel.prov_municipio);
      setProvEstado(proveedorSel.prov_estado);
      setProvRFC(proveedorSel.prov_rfc);
      buscarProductosRelacionados(proveedorSel.prov_id);
      setProvReadOnly(true);
    } else {
      setProvId(generateID());
      setProvNombre("");
      setProvDireccion("");
      setProvContacto("");
      setProvMunicipio("");
      setProvEstado("");
      setProvRFC("");
      setProvReadOnly(false);
    }
    setValidarProv(false);
  };
  const productoSelecionado = (e) => {
    const productoSel = productos.find((item) => item.produc_id == e);
    if (e > 0) {
      setProducId(productoSel.produc_id);
      setProducNombre(productoSel.produc_nombre);
      setProducPrecio(productoSel.produc_precio_venta);
      setProducComisionFundacion(productoSel.produc_parti_fun);
      setProducComisionEnlace(productoSel.produc_parti_enlace);
      setProducReadOnly(true);
      setProductoSeleccionado(productoSel);
    } else {
      setProducId(generateID());
      setProducNombre("");
      setProducPrecio(0);
      setProducComisionFundacion(0);
      setProducComisionEnlace(0);
      setProducReadOnly(false);
    }
  };
  const handleValidarProv = () => {
    console.log("validar");
    if (
      provNombre != "" &&
      provDireccion != "" &&
      provContacto != "" &&
      provMunicipio != "" &&
      provEstado != "" &&
      provRFC != ""
    ) {
      setValidarProv(false);
      setVerProducto(true);
      setVerProveedor(false);
    } else {
      setValidarProv(true);
    }
  };
  const handleValidarProduc = () => {
    if (
      producNombre != "" &&
      histPrecio != 0 &&
      producPrecio != 0 &&
      histCantidad != 0
    ) {
      setValidarProduc(false);
      setVerProducto(false);
      setVerFinalizar(true);
    } else {
      setValidarProduc(true);
    }
  };
  const finalizarRegistro = async () => {
    setLoadingData(true);
    //Agregar proveedor
    if (!existeProveedor) {
      const proveedor = {
        prov_id: provId,
        prov_nombre: provNombre,
        prov_direccion: provDireccion,
        prov_numero_cont: provContacto,
        prov_municipio: provMunicipio,
        prov_estado: provEstado,
        prov_rfc: provRFC,
      };
      const response = await fetch(`/api/proveedores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedor),
      });
      if (response.ok) {
        console.log("Proveedor agregado");
      } else {
        console.log("Error al agregar proveedor");
      }
    }
    //Agregar producto
    if (!existeProducto) {
      const producto = {
        produc_id: producId,
        produc_nombre: producNombre,
        produc_precio_venta: producPrecio,
        produc_existencias: histCantidad,
        produc_parti_fun: producComisionFundacion == "" ? 0 : producComisionFundacion,
        produc_parti_enlace: producComisionEnlace == "" ? 0 : producComisionEnlace,
      };
      const response = await fetch(`/api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (response.ok) {
        console.log("Producto agregado");
      } else {
        console.log("Error al agregar producto");
      }
    } else {
      const response = await fetch(`/api/productos/${producId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produc_existencias: Number(productoSeleccionado.produc_existencias) + Number(histCantidad),
        }),
      });
      if (response.ok) {
        console.log("Producto actualizado");
      } else {
        console.log("Error al actualizar producto");
      }
    }
    //Agregar proveedor producto
    if (!existeRelacion) {
      const provProduc = {
        prov_id: provId,
        produc_id: producId,
      };
      const responseProvProduc = await fetch(`/api/inventario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(provProduc),
      });
      if (responseProvProduc.ok) {
        console.log("Proveedor Producto agregado");
      } else {
        console.log("Error al agregar proveedor producto");
      }
    }
    try {
      //Agregar inventario
      const now = new Date();
      const historial = {
        produc_id: producId,
        hist_estado: "Entrada",
        hist_cantidad: histCantidad,
        hist_motivo: "Adquisición",
        hist_precio_ent_sal: histPrecio,
        hist_hora: obtenerHoraActual(),
        hist_dia: now.toISOString().split("T")[0],
      };
      const response = await fetch("/api/inventario/historial", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(historial)
      })
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setError(error);
    }
    window.location.reload();
  };

  return (
    <div>
      <div className={styles.navigationBar}>
        <h4>
          <Link href="/inventario" className={styles.link}>
            Inventario
          </Link>{" "}
          \{" "}
          <Link href="/inventario/nuevo" className={styles.link}>
            {" "}
            Nuevo{" "}
          </Link>
        </h4>
      </div>
      {verProveedor && (
        <div className={styles.selectProv}>
          <label>Selecciona un Proveedor Existente: </label>
          <select
            className={styles.select}
            onChange={(e) => {
              if (e.target.value === 0) {
                setExisteProveedor(false);
              } else {
                setExisteProveedor(true);
                proveedorSelecionado(e.target.value);
              }
            }}
          >
            <option value={0}>--Ninguno--</option>
            {proveedores.map((item, index) => (
              <option key={index} value={item.prov_id}>
                {item.prov_nombre}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={styles.containerProv}>
        {verProveedor ? (
          <div>
            <h3>Datos del Proveedor</h3>
            <div>
              <Input
                placeholder={"Nombre del Proveedor"}
                value={provNombre}
                onChange={(nombre) => setProvNombre(nombre)}
                validation={validarProv}
                readOnly={provReadOnly}
                type={"text"}
              />
              <Input
                placeholder={"Dirección"}
                value={provDireccion}
                onChange={(direccion) => setProvDireccion(direccion)}
                validation={validarProv}
                readOnly={provReadOnly}
                type={"text"}
              />
              <Input
                placeholder={"Teléfono"}
                value={provContacto}
                onChange={(contacto) => setProvContacto(contacto)}
                validation={validarProv}
                readOnly={provReadOnly}
                type={"number"}
              />
              <Input
                placeholder={"Municipio"}
                value={provMunicipio}
                onChange={(municipio) => setProvMunicipio(municipio)}
                validation={validarProv}
                readOnly={provReadOnly}
                type={"text"}
              />
              <Input
                placeholder={"Estado"}
                value={provEstado}
                onChange={(estado) => setProvEstado(estado)}
                validation={validarProv}
                readOnly={provReadOnly}
                type={"text"}
              />
              <Input
                placeholder={"RFC"}
                value={provRFC}
                onChange={(rfc) => setProvRFC(rfc)}
                validation={validarProv}
                readOnly={provReadOnly}
                type={"text"}
              />
              <Button
                text={"Aceptar"}
                type={"aceptar"}
                onPress={() => {
                  handleValidarProv();
                }}
              />
            </div>
            <Modal
              title={"Advertencia verificar información"}
              message={`Se creara el Nuevo Proveedor: ${provNombre}, ${provDireccion}, ${provMunicipio}, ${provEstado}. Con RFC: ${provRFC}`}
              show={showModalProv}
              handleAccept={() => {}}
              handleClose={() => {
                setShowModalProv(false);
              }}
            />
          </div>
        ) : (
          <div className={styles.overViewProv}>
            <p>
              {provNombre} a RFC: {provRFC}, Tel. {provContacto}, Dirección:{" "}
              {provDireccion}, {provMunicipio}, {provEstado}.{" "}
            </p>
            <Button
              text={"Cambiar"}
              type={"aceptar"}
              onPress={() => {
                setVerProducto(false);
                setVerProveedor(true);
              }}
            />
          </div>
        )}
      </div>
      {verProducto ? (
        <div className={styles.selectProv}>
          <label>Seleccionar producto relacionado: </label>
          <select
            className={styles.select}
            onChange={(e) => {
              productoSelecionado(e.target.value);
              if (e.target.value != 0) {
                setExisteProducto(true);
                setExisteRelacion(true);
              } else {
                setExisteProducto(false);
                setExisteRelacion(false);
              }
            }}
            disabled={productoExistente}
          >
            <option value={0}>--Ninguno--</option>
            {productosRelacionados.map((item, index) => (
              <option key={index} value={item.produc_id}>
                {item.produc_nombre}
              </option>
            ))}
          </select>
          <label>Seleccionar producto existente: </label>
          <select
            className={styles.select}
            onChange={(e) => {
              productoSelecionado(e.target.value);
              if (e.target.value != 0) {
                setProductoExistente(true);
                setExisteProducto(true);
              } else {
                setExisteProducto(false);
                setProductoExistente(false);
              }
            }}
            disabled={existeRelacion}
          >
            <option value={0}>--Ninguno--</option>
            {productos.map((item, index) => (
              <option key={index} value={item.produc_id}>
                {item.produc_nombre}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          {!verProveedor ? (
            <div className={styles.overViewProduc}>
              <p>
                Pedido de {histCantidad} {producNombre} comprado a {histPrecio}{" "}
                para vender a {producPrecio}
              </p>
              <Button
                text={"Cambiar"}
                type={"aceptar"}
                onPress={() => {
                  setVerProducto(true);
                  setVerFinalizar(false);
                }}
              />
            </div>
          ) : (
            <div className={styles.selectProduc}>
              <p>Seleccionar un Proveedor primero</p>
            </div>
          )}
        </>
      )}
      {verProducto && (
        <div className={styles.formProduct}>
          <div>
            <h3>Datos del Producto</h3>
            <Input
              placeholder={"Nombre del Producto"}
              value={producNombre}
              onChange={(nombre) => {
                setProducNombre(nombre);
              }}
              type={"text"}
              validation={validarProduc}
              readOnly={producReadOnly}
            />
            <Input
              placeholder={"Participacion Municipio"}
              value={producComisionEnlace}
              onChange={(participacion) => {
                setProducComisionEnlace(Number(participacion));
              }}
              type={"number"}
              validation={validarProduc}
              readOnly={producReadOnly}
            />
          </div>
          <div>
            <h3>Datos de adquicicion</h3>
            <Input
              placeholder={"Precio de Compra"}
              value={histPrecio}
              onChange={(compra) => {
                setHistPrecio(Number(compra));
              }}
              type={"number"}
              validation={validarProduc}
            />
            <Input
              placeholder={"Precio de Venta a Publico"}
              value={producPrecio}
              onChange={(venta) => {
                setProducPrecio(Number(venta));
              }}
              type={"number"}
              validation={validarProduc}
              readOnly={producReadOnly}
            />
            <Input
              placeholder={"Cantidad Suministrada"}
              value={histCantidad}
              onChange={(suministro) => {
                setHistCantidad(Number(suministro));
              }}
              type={"number"}
              validation={validarProduc}
            />
          </div>
          <Button
            text={"Aceptar"}
            type={"aceptar"}
            onPress={() => {
              handleValidarProduc();
            }}
          />
        </div>
      )}
      {verFinalizar && (
        <div className={styles.formComplete}>
          <p>Listo para agregar una nueva entrada al inventario</p>
          <Button
            text={"Aceptar"}
            type={"cancelar"}
            onPress={() => {
              setShowModalFinaly(true);
            }}
          />
        </div>
      )}
      <Modal
        show={showModalFinaly}
        title={"Nuevo Producto"}
        message={"Se creara un nuevo producto"}
        handleClose={() => {
          setShowModalFinaly(false);
        }}
        handleAccept={() => {
          finalizarRegistro();
        }}
      />
      <LoadingData show={loadingData} />
    </div>
  );
}

export default NewProduct;
