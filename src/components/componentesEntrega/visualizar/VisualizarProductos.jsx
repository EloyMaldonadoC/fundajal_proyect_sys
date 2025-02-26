import { useState } from "react";
import styles from "./module/VisualizarProductos.module.css";

function VisualizarProductos({ productos }) {
  let total = 0;

  const calcTotal = (cantidad, precio) => {
    const totalCant = cantidad * precio;
    total = total + totalCant;
    return totalCant;
  };

  const formatNumber = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>Productos</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.cantidad}>Cantidad</h4>
        <h4 className={styles.precio}>Precio</h4>
        <h4 className={styles.total}>Total</h4>
      </div>
      {productos && (
        <>
          {productos.map((producto, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{producto.produc_nombre}</div>
              <div className={styles.cantidad}>
                {producto.en_produc_cantidad}
              </div>
              <div className={styles.precio}>
                {formatNumber(producto.produc_precio_venta - producto.en_produc_oferta)}
              </div>
              <div className={styles.total}>
                {formatNumber(
                  calcTotal(
                    Number(producto.en_produc_cantidad),
                    Number(producto.produc_precio_venta - producto.en_produc_oferta)
                  )
                )}
              </div>
            </div>
          ))}
        </>
      )}
      <div className={styles.fooder} />
      <div className={styles.totalPrecio}>
        <div className={styles.totalTexto}>
          <b>Total:</b>
        </div>
        <div className={styles.totalCantidad}>
          <b>{formatNumber(total)}</b>
        </div>
      </div>
    </div>
  );
}

export default VisualizarProductos;
