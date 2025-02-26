
import styles from "./module/TablaInventary.module.css";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function TablaInventary({ fiterSerching, onClicFile }) {
  
  const {data, error } = useSWR(
    fiterSerching === "" || fiterSerching === "productos"
      ? "http://localhost:3000/api/productos"
      : `http://localhost:3000/api/inventario/busqueda/${fiterSerching}`,
    fetcher
  );

  if (error) return <div>Error al cargar los datos</div>
  if (!data) return <div>Cargando...</div>

  console.log(data)

  function getFileID(produc_id) {
    onClicFile(produc_id)
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.tTitle}>
            <th>Nombre del Producto</th>
            <th>Existencias</th>
            <th>Precio de Venta</th>
            <th>Participación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.produc_id} className={styles.tContent} onClick={() => getFileID(item.produc_id)}>
              <td className={styles.tName}>{item.produc_nombre}</td>
              <td className={styles.tUnits}>{item.produc_existencias}</td>
              <td className={styles.tPrice}>${item.produc_precio_venta}</td>
              <td className={styles.tParti}>${item.produc_participacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaInventary;
