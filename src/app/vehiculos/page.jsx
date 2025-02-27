"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { Button, Select } from "@/components/input/InputComponents";
import CardVehiculo from "@/components/cardComponents/CardVehiculo";
import { useSession } from "next-auth/react";
import IonIcon from "@reacticons/ionicons";

function Vehiculos() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const estados = [
    { id: 1, nombre: "Optimo" },
    { id: 2, nombre: "Revisión" },
    { id: 3, nombre: "Fuera de Servicio" },
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    if (session.user.role === "Administrador") {
      fetch("/api/vehiculos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVehiculos(data);
          console.log(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const onChangeFilterState = (estado) => {
    console.log(estado);
    if (estado == "ninguno") {
      fetch("/api/vehiculos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVehiculos(data);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      fetch(`/api/vehiculos/filtrar/estado/${estado}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVehiculos(data);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
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
          <p className={styles.textError}>No hay Conexión</p>
        </div>
      </div>
    );
    
  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/vehiculos" className={styles.link}>
            Vehiculos
          </Link>{" "}
          \
        </h4>
      </div>
      <div className={styles.filtro}>
        <div>
          <Select
            text={"Fitrar por estado: "}
            data={estados}
            onSelect={(estado) => {
              onChangeFilterState(estado);
            }}
          />
        </div>
        <div>
          <Button
            text={"Añadir Nuevo"}
            type={"cancelar"}
            onPress={() => {
              router.push("vehiculos/nuevo/");
            }}
          />
        </div>
      </div>
      <div>
        {vehiculos.length != 0 ? (
          <div className={styles.container}>
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.ve_id} className={styles.item}>
                <CardVehiculo vehiculo={vehiculo} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.loadingScreen}>
            <h1 className={styles.textError}>Aún no hay vehiculos</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vehiculos;
