import React from "react";
import styles from "./module/VisualizarVentasIndividuales.module.css";
import { formatNumber } from "@/functions/utilsFormat";

function VisualizarVentasIndividuales({ listaVentasIndividuales }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Vendidos</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Nombre</h4>
        <h4 className={styles.cantidad}>Cantidad</h4>
        <h4 className={styles.precio}>Precio</h4>
        <h4 className={styles.total}>Total</h4>
      </div>
      {listaVentasIndividuales.map((producto, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.nombre}>{producto.produc_nombre}</div>
          <div className={styles.cantidad}>{producto.en_es_produc_cant}</div>
          <div className={styles.precio}>{producto.produc_precio_venta}</div>
          <div className={styles.total}>
            {formatNumber(
              producto.en_es_produc_cant * producto.produc_precio_venta
            )}
          </div>
        </div>
      ))}
      <div className={styles.fooder} />
      <div className={styles.totalPrecio}>
        <h4 className={styles.totalTexto}>Total:{" "}</h4>
        <h4 className={styles.totalCantidad}>
          {formatNumber(
            listaVentasIndividuales.reduce(
              (a, b) => a + b.en_es_produc_cant * b.produc_precio_venta,
              0
            )
          )}
        </h4>
      </div>
    </div>
  );
}

export default VisualizarVentasIndividuales;
