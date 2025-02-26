"use client";
import { useState } from "react";
import styles from "./module/FormSelectProv.module.css";
import axios from "axios";
import useSWR from "swr";
import LoadingScreen from "./LoadingScreen";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function FormSelectProv({ provSelected, state }) {
  const [provSelect, setProvSelect] = useState("ninguno");

  const handleSelect = (event) => {
    const value = event.target.value;
    setProvSelect(value);
    provSelected(value);
  };

  const { data, error } = useSWR(
    "http://localhost:3000/api/proveedores",
    fetcher
  );

  if (error) return <div>Error al cargar los datos</div>;
  if (!data)
    return (
      <div className={styles.loadContainer}>
        <LoadingScreen />
      </div>
    );

  console.log(data);

  return (
    <>
      {!state ? (
        <div className={styles.container} >
          <label htmlFor="proveedorExistente">Proveedor ya Exitente: </label>
          <select
            name="proveedores"
            id="proveedores"
            className={styles.select}
            value={provSelect}
            onChange={handleSelect}
          >
            <option value="ninguno">--Ninguno--</option>
            {data.map((item) => (
              <option key={item.prov_id} value={item.prov_id}>
                {item.prov_nombre}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default FormSelectProv;
