"use client"
import { useEffect, useState } from "react";
import styles from "./module/TablaVisualizarProductos.module.css";
import CheckBoxCargado from "./CheckBoxCargado";
import { sumarProductos } from "@/functions/utilsFormat";

function TablaVisualizarProductos({
  id,
  productos,
  paquetes,
  total,
  productoEstado,
}) {
  const [global, setGlobal] = useState([]);
  const [filtrado, setFiltrado] = useState([]);

  useEffect(() => {
    if (productoEstado.length == 0) {
      const listado = [];

      for (let x = 0; x < paquetes.length; x++) {
        const paquete = paquetes[x];

        const productosPaquete = paquetes.filter(
          (producto) => producto.produc_id == paquete.produc_id
        );
        console.log("productosPaquete", productosPaquete);
        const existe = listado.find(
          (producto) => productosPaquete[0].produc_id == producto.produc_id
        );
        if (!existe) {
          listado.push({
            en_id: Number(id),
            produc_id: Number(productosPaquete[0].produc_id),
            produc_nombre: productosPaquete[0].produc_nombre,
            produc_existencias: productosPaquete[0].produc_existencias,
            en_es_produc_cant: productosPaquete.reduce((acc, curr) => acc + (Number(curr.produc_pa_cantidad) * Number(curr.en_pa_cantidad)), 0),
            en_es_produc_estado: "preparación",
          });
        }
      }
      for (let y = 0; y < productos.length; y++) {
        const producto = productos[y];
        
        const existe = listado.find(
          (product) => product.produc_id == producto.produc_id
        );
        if (!existe) {
          listado.push({
            en_id: Number(id),
            produc_id: Number(producto.produc_id),
            produc_nombre: producto.produc_nombre,
            produc_existencias: Number(producto.produc_existencias),
            en_es_produc_cant: Number(producto.en_produc_cantidad),
            en_es_produc_estado: "preparación",
          });
        } else {
          listado.forEach((produc) => {
            if (produc.produc_id == producto.produc_id) {
              produc.en_es_produc_cant = Number(producto.en_produc_cantidad) + Number(produc.en_es_produc_cant);
            }
          });
        }
      }
      setGlobal(listado);
      setFiltrado(listado);
    } else {
      setGlobal(productoEstado);
      setFiltrado(productoEstado);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productoEstado]);

  const onSelect = (value) => {
    const nuevo = filtrado.map((producto) =>
      producto.produc_id == value
        ? { ...producto, en_es_produc_estado: "cargado" }
        : producto
    );
    setFiltrado(nuevo);
    total(nuevo);
  };

  const onUnSelect = (value) => {
    const nuevo = filtrado.map((producto) =>
      producto.produc_id == value
        ? { ...producto, en_es_produc_estado: "en edición" }
        : producto
    );
    setFiltrado(nuevo);
    total(nuevo);
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>{sumarProductos(global)} Productos Listados</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.existencia}>Existencia</h4>
        <h4 className={styles.cantidad}>cantidad</h4>
        <h4 className={styles.checkBox}>Listo</h4>
      </div>

      {global.length != 0 ? (
        <>
          {global.map((producto, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{producto.produc_nombre}</div>
              <div
                className={`${styles.existencia} ${
                  producto.produc_existencias <
                    (producto.en_es_produc_cant ||
                      producto.en_produc_cantidad ||
                      producto.en_pa_cantidad) && styles.rojo
                }`}
              >
                {producto.produc_existencias}
              </div>
              <div className={styles.cantidad}>
                {producto.en_es_produc_cant}
              </div>
              <div className={styles.checkBox}>
                <CheckBoxCargado
                  estado={producto.en_es_produc_estado}
                  value={producto.produc_id}
                  onSelect={(value) => onSelect(value)}
                  onUnselect={(value) => onUnSelect(value)}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={styles.container}>
          <p>Cargando...</p>
        </div>
      )}

      <div className={styles.fooder} />
    </div>
  );
}

export default TablaVisualizarProductos;
