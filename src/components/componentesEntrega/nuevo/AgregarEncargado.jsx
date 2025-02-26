import { useState, useEffect } from "react";
import styles from "./module/AgregarEncargado.module.css";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";

function AgregarEncargado({ enlace, validar }) {
  const { data: session, status } = useSession();
  const [enlaces, setEnlaces] = useState(null);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  
  useEffect(() => {
    fetch(`/api/empleados/filtrar/cargo/${"Encargado"}`).then((response) => {
      if(!response.ok) {
        throw new Error("Response is not ok");
      }
      return response.json();
    }).then((data) => {
      if (session.user.role === "Encargado") {
        const emp = data.filter((enlace) => enlace.emp_id === session.user.id);
        enlace(emp[0].emp_id);
        setEnlaces(emp);
      } else {
        setEnlaces(data);
      }
    }).catch((error) => {
      setLoading(false);
      setError(error);
    })
  }, [session, enlace])

  const handleOnChangeSelect = () => {
    const selected = event.target.value;
    if (selected != "ninguno") {
      enlace(selected);
    } else {
      enlace(null);
    }
  }
  
  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.encabezado}>
        <h3>Encargado</h3>
      </div>
      <div className={`${styles.contenido} ${validar ? styles.validar : ''}`}>
        <label>Encargado: </label>
        {session.user.role === "Encargado" ? (
          <>
            {enlaces && (
              <>{enlaces[0].emp_nombre} {enlaces[0].emp_apellido}</>
            )}
          </>
        ) 
        : (
          <select className={`${styles.select} ${validar ? styles.validar : ''}`} onChange={handleOnChangeSelect}>
          <option value="ninguno">--ninguno--</option>
          {enlaces && (
            <>
              {enlaces.map((enlace, key) => (
                <option value={enlace.emp_id} key={key}>{enlace.emp_nombre}</option>
              ))}
            </>
          )}
        </select>
        )}
      </div>
    </div>
  );
}

export default AgregarEncargado;
