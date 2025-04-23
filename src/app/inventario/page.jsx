"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Table, Info, Search, Button } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";
import IonIcon from "@reacticons/ionicons";
import Loading from "../loading";
import { esDiaLaboral, obtenerDiaActual } from "@/functions/utilsFormat";

function Inventario() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [productos, setProductos] = useState([]);
  const [periodo, setPeriodo] = useState(null);
  const [inventarios, setInventarios] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState(obtenerDiaActual());
  const [deshabilitado, setDeshabilitado] = useState(true);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`api/inventario/semanal/${diaSeleccionado}`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProductos(data.inventario);
        setPeriodo(data.periodo[0]);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
      fetch(`api/inventario/periodo`).then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      }
      ).then((data) => {
        setInventarios(data);
        console.log(data);
        setLoading(false);
      }).catch((error) => {
        setError(error);
        setLoading(false);
      });
    }else {
      router.push("/");
    }
    if (esDiaLaboral) {
      setDeshabilitado(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, diaSeleccionado]);

  const handlePressNew = () => {
    if (esDiaLaboral()) {
      setDeshabilitado(false);
      router.push("/inventario/nuevo");
    } else {
      setDeshabilitado(true);
      console.log("No puedes hacer una nueva entrada el fin de semana");
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorContent}>
          <IonIcon
            className={styles.textIcon}
            name="cloud-offline-outline"
          ></IonIcon>
          <p className={styles.textError}>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/inventario" className={styles.link}>
            Inventario
          </Link>{" "}
          \{" "}
        </h4>
      </div>
      <div className={styles.busqueda}>
        <Search placeholder={'Buscar Producto'} onSearch={(data) => {setBuscar(data)}}/>
        <input className={styles.calendario} type="date" value={diaSeleccionado} onChange={(e) => setDiaSeleccionado(e.target.value)}></input>
        <Button text={'Laminas'} type={'cancelar'} onPress={() => setBuscar("lámina")}/>
        <Button text={'Nueva entrada'} type={'cancelar'} onPress={handlePressNew} disabled={deshabilitado }/>
      </div>
      <div className={styles.container}>
        <Table productos={productos} periodo={periodo} busqueda={buscar}/>
      </div>
    </div>
  );
}

export default Inventario;
