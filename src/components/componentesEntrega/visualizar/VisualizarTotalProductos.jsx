import styles from "./module/VisualizarTotalProductos.module.css";

function VisualizarTotalProductos({ productos }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Todos los productos</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.cantidad}>Cantidad</h4>
      </div>
      {productos && (
        <>
          {productos.map((producto, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{producto.produc_nombre}</div>
              <div className={styles.cantidad}>{producto.en_es_produc_cant}</div>
            </div>
          ))}
        </>
      )}
      <div className={styles.fooder} />
    </div>
  );
}

export default VisualizarTotalProductos;
