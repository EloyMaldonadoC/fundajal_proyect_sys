import styles from "./module/VisualizarPaquetes.module.css";

function VisualizarPaquetes({paquetes}) {
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
        <h3>Paquetes</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.cantidad}>Cantidad</h4>
        <h4 className={styles.precio}>Precio</h4>
        <h4 className={styles.total}>Total</h4>
      </div>
      {paquetes && (
        <>
          {paquetes.map((producto, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{producto.pa_nombre}</div>
              <div className={styles.cantidad}>
                {producto.en_pa_cantidad}
              </div>
              <div className={styles.precio}>
                {formatNumber(producto.pa_precio - producto.en_pa_desc)}
              </div>
              <div className={styles.total}>
                {formatNumber(
                  calcTotal(
                    Number(producto.en_pa_cantidad),
                    Number(producto.pa_precio - producto.en_pa_desc)
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

export default VisualizarPaquetes;
