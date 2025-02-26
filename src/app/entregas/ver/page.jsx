"use client";
import styles from "./page.module.css";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import InfoMunicipio from "@/components/componentesEntrega/edicion/InfoMunicipio";
import VisualizarEmpleadosEntrega from "@/components/componentesEntrega/visualizar/VisualizarEmpleadosEntrega";
import VisualizarVehiculosEntrega from "@/components/componentesEntrega/visualizar/VisualizarVehiculosEntrega";
import VisualizarContenidoDeEntrega from "@/components/componentesEntrega/visualizar/VisualizarContenidoDeEntrega";
import { formatTimeWithoutSeconds, getDayOfWeek } from "@/functions/utilsFormat";
import { Button } from "@/components/input/InputComponents";

function Ver() {
  const router = useRouter();
  const seachParams = useSearchParams();
  const id = seachParams.get("id");
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //secciones
  const [ocultarSeccion, setOcultarSeccion] = useState(false);
  //entrega
  const [entrega, setEntrega] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [encargado, setEncargado] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  //productos
  const [productos, setProductos] = useState([]);
  //paquetes
  const [paquetes, setPaquetes] = useState([]);

  //Busca informacion de la entrega
  useEffect(() => {
    fetch(`/api/entregas/obtener/entrega/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la llamada");
        }
        return response.json();
      })
      .then((data) => {
        setEntrega(data.entrega);
        setCliente(data.cliente);
        setEncargado(data.encargado);
        setEmpleados(data.empleados);
        setVehiculos(data.vehiculos);
        //filtrar productos
        if (data.productos.length != 0) {
          const entregados = data.productos.filter(
            (producto) => producto.en_produc_estado == "en entrega"
          );
          setProductos(entregados);
        }
        //filtrar paquetes
        if (data.paquetes.length != 0) {
          const entregados = data.paquetes.filter(
            (paquete) => paquete.en_pa_estado == "en entrega"
          );
          setPaquetes(entregados);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, router]);

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
          <p className={styles.textError}>Ocurrio un error</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/inicio" className={styles.link}>
            Inicio
          </Link>{" "}
          \ Entrega \{" "}
          {entrega.length != 0
            ? `${cliente.cli_municipio}, ${cliente.cli_estado}.`
            : "Cargando..."}
        </h4>
      </div>
      <div className={styles.herramientas}>
        {entrega.length != 0 && (
          <p>
            Entrega realizada el día{" "}
            <b>{getDayOfWeek(entrega.en_dia_entrega)}</b> a las{" "}
            <b>{formatTimeWithoutSeconds(entrega.en_hora_entrega)} hrs</b>
          </p>
        )}
      </div>
      <div className={styles.contenido}>
        <div className={styles.subContenedor1}>
          <VisualizarContenidoDeEntrega
            paquetes={paquetes}
            productos={productos}
            totalAPagar={() => {}}
          />
        </div>
        <div className={styles.subContenedor2}>
          <div className={styles.herramientasInfo}>
            <Button
              text={
                !ocultarSeccion ? (
                  <>
                    <p>Ocultar</p>
                    <IonIcon className={styles.icon} name="eye-off-outline" />
                  </>
                ) : (
                  <>
                    <p>Visualizar</p>
                    <IonIcon className={styles.icon} name="eye-outline" />
                  </>
                )
              }
              type={!ocultarSeccion ? "contenido-dark" : "contenido-light"}
              onPress={() => setOcultarSeccion(!ocultarSeccion)}
            />
          </div>
          {!ocultarSeccion && (
            <div className={styles.scrollable}>
              <InfoMunicipio municipio={cliente} />
              <VisualizarEmpleadosEntrega
                empleados={empleados}
                encargado={encargado}
              />
              <VisualizarVehiculosEntrega vehiculos={vehiculos} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ver;
