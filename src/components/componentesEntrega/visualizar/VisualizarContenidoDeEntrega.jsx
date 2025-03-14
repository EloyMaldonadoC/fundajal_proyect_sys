import styles from "./module/VisualizarContenidoDeEntrega.module.css";

function VisualizarContenidoDeEntrega({productos, paquetes, totalAPagar}) {
  let total = 0;

  const calcTotal = (cantidad, precio) => {
    const totalCant = cantidad * precio;
    total = total + totalCant;
    totalAPagar(total);
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
        <h3>Contenido de la Entrega</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.cantidad}>Cantidad</h4>
        <h4 className={styles.precio}>Precio</h4>
        <h4 className={styles.total}>Total</h4>
      </div>
      {paquetes && (
        <>
          {paquetes.map((paquete, index) => paquete.en_pa_estado == "en entrega" && (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{paquete.pa_nombre}</div>
              <div className={styles.cantidad}>
                {paquete.en_pa_cantidad}
              </div>
              <div className={styles.precio}>
                {formatNumber(paquete.en_pa_precio + paquete.en_pa_desc)}
              </div>
              <div className={styles.total}>
                {formatNumber(
                  calcTotal(
                    Number(paquete.en_pa_cantidad),
                    Number(paquete.en_pa_precio + paquete.en_pa_desc)
                  )
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {productos && (
        <>
          {productos.map((producto, index) => producto.en_produc_estado == "en entrega" && (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{producto.produc_nombre}</div>
              <div className={styles.cantidad}>
                {producto.en_produc_cantidad}
              </div>
              <div className={styles.precio}>
                {formatNumber(producto.en_produc_precio + producto.en_produc_oferta)}
              </div>
              <div className={styles.total}>
                {formatNumber(
                  calcTotal(
                    Number(producto.en_produc_cantidad),
                    Number(producto.en_produc_precio + producto.en_produc_oferta)
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

export default VisualizarContenidoDeEntrega