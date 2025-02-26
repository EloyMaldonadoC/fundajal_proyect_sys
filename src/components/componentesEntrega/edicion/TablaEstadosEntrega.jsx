import { Button } from "@/components/input/InputComponents";
import styles from "./module/TablaEstadosEntrega.module.css"

function TablaEstadosEntrega({ titulo, listaProductos, onDelete, alterButton }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>{titulo}</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Nombre</h4>
        <h4 className={styles.cantidad}>cantidad</h4>
        <h4 className={styles.option}>{alterButton && "opciones"}</h4>
      </div>
      {listaProductos && (
          listaProductos.map((producto, index) => (
            <div key={index} className={styles.container}>
              <div className={styles.nombre}>{producto.produc_nombre}</div>
              <div className={styles.cantidad}>{producto.en_es_produc_cant}</div>
              <div className={styles.option}>
                {alterButton && (
                  <Button text={!alterButton ? "Eliminar" : alterButton} type={"cancelar"} onPress={() => onDelete(producto.produc_id)}/>
                )}
              </div>
            </div>
          ))
        )}
      <div className={styles.fooder}/>
    </div>
  );
}

export default TablaEstadosEntrega;
