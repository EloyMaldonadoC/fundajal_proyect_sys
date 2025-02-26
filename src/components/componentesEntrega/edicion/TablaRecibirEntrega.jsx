import CheckBoxRecibir from "./CheckBoxRecibir";
import styles from "./module/TablaRecibirEntrega.module.css";

function TablaRecibirEntrega({ listaProductos, salida }) {
  
  const onSelect = (value) => {
    const nuevo = listaProductos.map((producto) =>
      producto.produc_id == value
        ? { ...producto, en_es_produc_estado: "recibido" }
        : producto
    );
    salida(nuevo);
  };

  const onUnSelect = (value) => {
    const nuevo = listaProductos.map((producto) =>
      producto.produc_id == value
        ? { ...producto, en_es_produc_estado: "cargado" }
        : producto
    );
    salida(nuevo);
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>Productos a entregar</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Producto</h4>
        <h4 className={styles.cantidad}>cantidad</h4>
        <h4 className={styles.checkBox}>Listo</h4>
      </div>
        {listaProductos && (
          listaProductos.map((producto, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{producto.produc_nombre}</div>
              <div className={styles.cantidad}>{producto.en_es_produc_cant}</div>
              <div className={styles.checkBox}>
                <CheckBoxRecibir 
                  estado={producto.en_es_produc_estado}
                  value={producto.produc_id}
                  onSelect={(value) => {onSelect(value)}}
                  onUnselect={(value) => {onUnSelect(value)}}
                />
              </div>
            </div>
          ))
        )}
      <div className={styles.fooder} />
    </div>
  );
}

export default TablaRecibirEntrega;
