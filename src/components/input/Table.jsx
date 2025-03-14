import { useState } from "react";
import TablaProveedores from "../componentesHistorial/TablaProveedores";
import styles from "./module/Table.module.css";
import { formatNumber } from "@/functions/utilsFormat";
import { Button } from "./InputComponents";
import { useRouter } from "next/navigation";

function Fila({ producto }) {
  const [proveedores, setProveedores] = useState([]);
  const [desplegar, setDesplegar] = useState(false);
  const router = useRouter();

  const handleClickRow = (id) => {
    setDesplegar(!desplegar);
    if (proveedores.length == 0) {
      fetch(`/api/inventario/productos/${id}`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProveedores(data);
      });
    }
  };

  return (
    <div className={ desplegar ? styles.desplegado : ""}>
      <div className={`${styles.fila} ${desplegar ? styles.desplegar : ""}`} onClick={() => { handleClickRow(producto.produc_id) }}>
        <div className={styles.nombre}>{producto.produc_nombre}</div>
        <div className={styles.existencias}>{producto.produc_existencias}</div>
        <div className={styles.precio}>{formatNumber(producto.produc_precio_venta)}</div>
        <div className={styles.participacion}>{formatNumber(producto.produc_parti_enlace)}</div>
      </div>
      {desplegar && (
        <div>
          <TablaProveedores proveedores={proveedores} />
          <Button text={"Editar Producto"} type={"cancelar"}  onPress={() => {router.push(`/inventario/editar/producto?id=${producto.produc_id}`)}}/>
        </div>
      )}
    </div>
  );
}

function Table({ productos }) {
  return (
    <div>
      <div className={styles.header}>
        <h2>Inventario</h2>
      </div>
      <div className={styles.titulo}>
        <h3 className={styles.nombre}>Nombre del Producto</h3>
        <h3 className={styles.existencias}>Existencias</h3>
        <h3 className={styles.precio}>Precio de Venta</h3>
        <h3 className={styles.participacion}>Particion municipio</h3>
      </div>
      {productos.lenght != 0 && (
        <>
          {productos.map((producto, index) => (
            <Fila producto={producto} key={index}/>
          ))}
        </>
      )}
      <div className={styles.fooder} />
    </div>
  );
}

export default Table;
