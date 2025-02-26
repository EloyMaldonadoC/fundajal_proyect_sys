import React, { useEffect } from "react";
import styles from "./module/Table.module.css";
import { formatNumber } from "@/functions/utilsFormat";

function Table({ productos, onClickRow }) {

  useEffect(() => {}, [productos])

  const handleClickRow = (id) => {
    onClickRow(id)
  }

  return (
    <table className={styles.tabla}>
      <thead>
        <tr>
          <th>Nombre del Producto</th>
          <th>Existencias</th>
          <th>Precio de Venta</th>
          <th>Particion fundación</th>
          <th>Particion enlace</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((item) => (
          <tr key={item.produc_id} onClick={() => {handleClickRow(item.produc_id)}}>
            <td className={styles.tName}>{item.produc_nombre}</td>
            <td className={styles.tUnits}>{item.produc_existencias}</td>
            <td className={styles.tPrice}>{formatNumber(item.produc_precio_venta)}</td>
            <td className={styles.tParti}>{formatNumber(item.produc_parti_fun)}</td>
            <td className={styles.tParti}>{formatNumber(item.produc_parti_enlace)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
