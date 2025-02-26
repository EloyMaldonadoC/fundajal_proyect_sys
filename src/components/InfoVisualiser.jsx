"use client"
import styles from "./module/InfoVisualiser.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import LoadingScreen from "./LoadingScreen";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function InfoVisualiser({ produc_id }) {
  
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/inventario/editar');
  }

  const {data, error} = useSWR(`http://localhost:3000/api/inventario/productos/${produc_id}`, fetcher);

  if (error) return <div className={styles.container}>Seleccionar un producto para ver información</div>
  if (!data) return <LoadingScreen/>  

  console.log(data)
  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.title}>Producto</h4>
        <p>Nombre del producto: {data[0].produc_nombre}</p>
        <p>Existencias: {data[0].produc_existencias} unidades</p>
        <p>Precio de venta: ${data[0].produc_precio_venta}</p>
        <p>Participación por unidad: ${data[0].produc_participacion}</p>
        <div className={styles.btn_container}>
          <button className={styles.btn} onClick={handleRedirect}>Editar</button> 
          
        </div>
      </div>
      <div>
        <h4 className={styles.title}>Proveedores</h4>
        <p>Nombre del Proveedor: {data[0].prov_nombre}</p>
        <p>Numero de Contacto: {data[0].prov_numero_cont}</p>
        <p>Direccion: {data[0].prov_direccion}, {data[0].prov_municipio}, {data[0].prov_estado}</p>
        <p>RFC: {data[0].prov_rfc}</p>
      </div>
    </div>
  );
}

export default InfoVisualiser;
