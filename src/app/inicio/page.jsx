"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CardEntregaPreview from "@/components/CardEntregaPreview";
import BannerDiario from "@/components/BannerDiario";
import LoadingScreen from "@/components/LoadingScreen";
import IonIcon from "@reacticons/ionicons";
import styles from "./page.module.css";

function Inicio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [entregas, setEntregas] = useState([]);
  const [diaGuardado, setDiaGuardado] = useState(null);
  const [datosReestructurados, setDatosReestructurados] = useState([]);

  useEffect(() => {
    if (
      session.user.role != "Administrador" &&
      session.user.role != "Encargado"
    ) {
      fetch(`/api/entregas/cardEntregas/filtrarEmpleado?&page=${page}&limit=${limit}&user=${session.user.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("No se pudo obtener la información");
          }
          return res.json();
        })
        .then((data) => {
          setEntregas(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`/api/entregas/cardEntregas/filtrarEmpleado?&page=${page}&limit=${limit}&access=Admin`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("No se pudo obtener la información");
          }
          return res.json();
        })
        .then((data) => {
          if (data.length != 0) {
            setEntregas([...entregas, ...data]);
            setDiaGuardado(data[0].entrega.en_dia_entrega);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    if (session.user.role === "Encargado") {
      fetch(`/api/entregas/cardEntregas/filtrarEmpleado?&page=${page}&limit=${limit}&access=en&user=${session.user.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("No se pudo obtener la información");
          }
          return res.json();
        })
        .then((data) => {
          setEntregas([...entregas, ...data]);
          setDiaGuardado(data[0].entrega.en_dia_entrega);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    if (session.user.role != "Encargado" && session.user.role != "Administrador") {
      fetch(`/api/entregas/cardEntregas/filtrarEmpleado?&page=${page}&limit=${limit}&user=${session.user.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("No se pudo obtener la información");
          }
          return res.json();
        })
        .then((data) => {
          setEntregas([...entregas, ...data]);
          setDiaGuardado(data[0].entrega.en_dia_entrega);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const restruccurarDatos = () => {
      //recorre la lista de entregas
      const nuevaLista = [];
      for (let x = 0; x < entregas.length;) {
        const dia = entregas[x].entrega.en_dia_entrega;
        const datos = [];
        for (let y = 0; y < entregas.length; y++) {
          const entrega = entregas[y];
          if (entrega.entrega.en_dia_entrega === dia) {
            datos.push(entrega);
          }
        }
        nuevaLista.push(datos);
        x += datos.length;
      }
      return nuevaLista;
    };
    const lista = restruccurarDatos();
    setDatosReestructurados(lista);
  }, [entregas]);

  //Saber si el scroll llega al final de la página
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const control = controlScrollLoad();
        if (control) {
          setPage(page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const controlScrollLoad = () => {
    if (entregas.length - page * limit < 10) {
      return false;
    } else {
      return true;
    }
  };

  if (loading)
    return (
      <div className={styles.loadingScreen}>
        <LoadingScreen />
      </div>
    );
  if (error)
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

  return (
    <div>
      {entregas.length != 0 ? (
        <>
          {datosReestructurados.map((entrega, index) => (
            <div key={index}>
              <BannerDiario  fecha={entrega[0].entrega.en_dia_entrega} />
              {entrega.map((datos, indexEn) => (
                <CardEntregaPreview key={indexEn} entrega={datos}/>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={styles.loadingScreen}>
          <h1 className={styles.textError}>Aún no hay entregas</h1>
        </div>
      )}
    </div>
  );
}

export default Inicio;
