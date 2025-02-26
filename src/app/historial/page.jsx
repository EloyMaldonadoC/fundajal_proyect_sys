"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { Button, Select } from "@/components/input/InputComponents";
import Loading from "../loading";
import IonIcon from "@reacticons/ionicons";
import TablaHistorial from "@/components/componentesHistorial/TablaHistorial";
import TablaHistorialProductos from "@/components/componentesHistorial/TablaHistorialProductos";
import TablaHistorialEntregas from "@/components/componentesHistorial/TablaHistorialEntregas";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Historial() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [historial, setHistorial] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const [filter, setFilter] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);

  const [verInventario, setVerInventario] = useState(true);
  const [verProductos, setVerProductos] = useState(false);
  const [verEntregas, setVerEntregas] = useState(false);

  const controlScrollLoad = () => {
    if (historial.length - page * limit < 10) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (session.user.role === "Administrador") {
      if (verEntregas) {
        fetch(
          `/api/historial/entregas?page=${page + 1}&limit=${limit}${
            filter ? `&filter=${filter}` : ""
          }${day && !month ? `&day=${day}` : ""}${
            month && !day ? `&month=${month}` : ""
          }`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al cargar el historial");
            }
            return response.json();
          })
          .then((data) => {
            setHistorial([...historial, ...data]);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      } else {
        fetch(
          `/api/historial/global?page=${page + 1}&limit=${limit}${
            filter ? `&filter=${filter}` : ""
          }${day && !month ? `&day=${day}` : ""}${
            month && !day ? `&month=${month}` : ""
          }`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al cargar el historial");
            }
            return response.json();
          })
          .then((data) => {
            setHistorial([...historial, ...data]);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, day, month, router, verEntregas, verInventario]);

  //Saber si el scroll llega al final de la página
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const control = controlScrollLoad();
        if (control && verInventario) {
          setPage(page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlScrollLoad]);

  const obtenerHistorialEntregas = () => {
    
  };

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
          <Link href="/Historial" className={styles.link}>
            Historial
          </Link>{" "}
          \{" "}
        </h4>
      </div>
      <div className={styles.herramientas}>
        <Button
          text={"Movimientos de inventario"}
          type={verInventario ? "" : "cancelar"}
          onPress={() => {
            setHistorial([]);
            setPage(0);
            setDay(null);
            setMonth(null);
            setFilter(null);
            setVerInventario(true);
            setVerEntregas(false);
            setVerProductos(false);
          }}
        />
        <Button
          text={"Productos"}
          type={verProductos ? "" : "cancelar"}
          onPress={() => {
            setVerInventario(false);
            setVerEntregas(false);
            setVerProductos(true);
          }}
        />
        <Button
          text={"Historial de entregas"}
          type={verEntregas ? "" : "cancelar"}
          onPress={() => {
            setHistorial([]);
            setPage(0);
            setDay(null);
            setMonth(null);
            setFilter(null);

            setVerInventario(false);
            setVerEntregas(true);
            setVerProductos(false);
            obtenerHistorialEntregas();
          }}
        />
      </div>
      {verInventario && (
        <div className={styles.herramientas}>
          <label>filtrar por: </label>
          <Button
            text={"Entradas"}
            type={filter == "entrada" ? "" : "cancelar"}
            onPress={() => {
              if (filter == "entrada") {
                setPage(0);
                setHistorial([]);
                setFilter(null);
              } else {
                setPage(0);
                setHistorial([]);
                setFilter("entrada");
              }
            }}
          />
          <Button
            text={"Salidas"}
            type={filter == "salida" ? "" : "cancelar"}
            onPress={() => {
              if (filter == "salida") {
                setPage(0);
                setHistorial([]);
                setFilter(null);
              } else {
                setPage(0);
                setHistorial([]);
                setFilter("salida");
              }
            }}
          />
          <Button
            text={"Esta semana"}
            type={day ? "" : "cancelar"}
            onPress={() => {
              setMonth(null);
              if (day) {
                setPage(0);
                setHistorial([]);
                setDay(null);
              } else {
                const now = new Date();
                setPage(0);
                setHistorial([]);
                setDay(now.toISOString().split("T")[0]);
              }
            }}
          />
          <Button
            text={"Este mes"}
            type={month ? "" : "cancelar"}
            onPress={() => {
              setDay(null);
              if (month) {
                setPage(0);
                setHistorial([]);
                setMonth(null);
              } else {
                const now = new Date();
                setPage(0);
                setHistorial([]);
                setMonth(now.toISOString().split("T")[0]);
              }
            }}
          />
        </div>
      )}
      {verEntregas && (
        <div className={styles.herramientas}>
          <label>filtrar por: </label>
          <Button
            text={"Saldadas"}
            type={filter == "saldada" ? "" : "cancelar"}
            onPress={() => {
              if (filter == "saldada") {
                setPage(0);
                setHistorial([]);
                setFilter(null);
              } else {
                setPage(0);
                setHistorial([]);
                setFilter("saldada");
              }
            }}
          />
          <Button
            text={"pendientes"}
            type={filter == "pendiente" ? "" : "cancelar"}
            onPress={() => {
              if (filter == "pendiente") {
                setPage(0);
                setHistorial([]);
                setFilter(null);
              } else {
                setPage(0);
                setHistorial([]);
                setFilter("pendiente");
              }
            }}
          />
        </div>
      )}
      <div className={styles.contenido}>
        {verInventario && <TablaHistorial historial={historial} />}
        {verProductos && <TablaHistorialProductos />}
        {verEntregas && <TablaHistorialEntregas entregas={historial}/>}
      </div>
    </div>
  );
}

export default Historial;
