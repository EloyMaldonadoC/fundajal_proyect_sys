"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Search } from "@/components/input/InputComponents";
import LoadingScreen from "@/components/LoadingScreen";
import CardEntrega from "@/components/componentesEntrega/principal/CardEntrega";
import IonIcon from "@reacticons/ionicons";
import { useSession } from "next-auth/react";

export default function Entregas() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [entregas, setEntregas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [buscarMunicipio, setBuscarMunicipio] = useState("");
  const [bucarEncargado, setBucarEncargado] = useState("");
  const [estado, setEstado] = useState(null);

  const [paginaActual, setPaginaActual] = useState(0);
  const [total, setTotal] = useState([]);
  const [totalPorPagina, setTotalPorPagina] = useState(10);

  const [totalPendientes, setTotalPendientes] = useState([]);
  const [totalEnEdicion, setTotalEnEdicion] = useState([]);
  const [totalPreparados, setTotalPreparados] = useState([]);
  const [totalEnProceso, setTotalEnProceso] = useState([]);
  const [totalFinalizadas, setTotalFinalizadas] = useState([]);
  const [totalCanceladas, setTotalCanceladas] = useState([]);

  const [filtrarPorTodos, setFiltrarPorTodos] = useState(true);
  const [filtrarPorPendientes, setFiltrarPorPendientes] = useState(false);
  const [filtrarPorEnEdicion, setFiltrarPorEnEdicion] = useState(false);
  const [filtrarPorPreparados, setFiltrarPorPreparados] = useState(false);
  const [filtrarPorEnProceso, setFiltrarPorEnProceso] = useState(false);
  const [filtrarPorFinalizadas, setFiltrarPorFinalizadas] = useState(false);
  const [filtrarPorCanceladas, setFiltrarPorCanceladas] = useState(false);

  useEffect(() => {
    console.log("se renderiza");
    if (
      session.user.role === "Administrador" ||
      session.user.role === "Encargado" ||
      session.user.role === "Oficina" ||
      session.user.role === "Chofer"
    ) {
      fetch(
        `/api/entregas/cardEntregas?page=${
          paginaActual + 1
        }&limit=${totalPorPagina}${estado ? `&filter=${estado}` : ""}${
          session.user.role === "Encargado" ? `&user=${session.user.id}` : ""
        }`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setEntregas([...entregas, ...data]);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginaActual, estado]);

  useEffect(() => {
    if (entregas) {
      setTotal(entregas);
      setTotalPendientes(
        entregas.filter((entrega) => entrega.entrega.en_dia_entrega === null)
      );
      setTotalEnEdicion(
        entregas.filter((entrega) => entrega.entrega.en_estado == "en edición")
      );
      setTotalPreparados(
        entregas.filter(
          (entrega) => entrega.entrega.en_estado === "preparación"
        )
      );
      setTotalFinalizadas(
        entregas.filter((entrega) => entrega.entrega.en_estado === "finalizada")
      );
      setTotalCanceladas(
        entregas.filter((entrega) => entrega.entrega.en_estado === "cancelada")
      );
      setTotalEnProceso(
        entregas.filter(
          (entrega) =>
            entrega.entrega.en_estado === "recibir" ||
            entrega.entrega.en_estado === "recibido"
        )
      );
    }
  }, [entregas, estado]);

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
          setPaginaActual(paginaActual + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  useEffect(() => {
    if (session.user.role === "Chofer") {
      setFiltrarPorTodos(false);
      setFiltrarPorEnProceso(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const controlScrollLoad = () => {
    if (entregas.length - paginaActual * totalPorPagina < 10) {
      return false;
    } else {
      return true;
    }
  };

  const controlarFiltroTodos = () => {
    setFiltrarPorTodos(true);
    setFiltrarPorPendientes(false);
    setFiltrarPorEnEdicion(false);
    setFiltrarPorPreparados(false);
    setFiltrarPorFinalizadas(false);
    setFiltrarPorEnProceso(false);
    setFiltrarPorCanceladas(false);
  };
  const controlarFiltroPendientes = () => {
    setFiltrarPorTodos(false);
    setFiltrarPorPendientes(true);
    setFiltrarPorEnEdicion(false);
    setFiltrarPorPreparados(false);
    setFiltrarPorFinalizadas(false);
    setFiltrarPorEnProceso(false);
    setFiltrarPorCanceladas(false);
  };
  const controlarFiltroEnEdicion = () => {
    setFiltrarPorTodos(false);
    setFiltrarPorPendientes(false);
    setFiltrarPorEnEdicion(true);
    setFiltrarPorPreparados(false);
    setFiltrarPorFinalizadas(false);
    setFiltrarPorEnProceso(false);
    setFiltrarPorCanceladas(false);
  };
  const controlarFiltroPreparado = () => {
    setFiltrarPorTodos(false);
    setFiltrarPorPendientes(false);
    setFiltrarPorEnEdicion(false);
    setFiltrarPorPreparados(true);
    setFiltrarPorFinalizadas(false);
    setFiltrarPorEnProceso(false);
    setFiltrarPorCanceladas(false);
  };
  const controlarFiltroFinalizadas = () => {
    setFiltrarPorTodos(false);
    setFiltrarPorPendientes(false);
    setFiltrarPorEnEdicion(false);
    setFiltrarPorPreparados(false);
    setFiltrarPorFinalizadas(true);
    setFiltrarPorEnProceso(false);
    setFiltrarPorCanceladas(false);
  };
  const controlarFiltroCanceladas = () => {
    setFiltrarPorTodos(false);
    setFiltrarPorPendientes(false);
    setFiltrarPorEnEdicion(false);
    setFiltrarPorPreparados(false);
    setFiltrarPorFinalizadas(false);
    setFiltrarPorCanceladas(true);
    setFiltrarPorEnProceso(false);
  };
  const controlarFiltroEnProceso = () => {
    setFiltrarPorTodos(false);
    setFiltrarPorPendientes(false);
    setFiltrarPorEnEdicion(false);
    setFiltrarPorPreparados(false);
    setFiltrarPorFinalizadas(false);
    setFiltrarPorCanceladas(false);
    setFiltrarPorEnProceso(true);
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
          <Link href="/entregas" className={styles.link}>
            Entregas
          </Link>{" "}
          \{" "}
        </h4>
      </div>
      <div className={styles.herramientas}>
        <div className={styles.busqueda}>
          <Search
            placeholder={"Filtrar por municipio"}
            onSearch={(data) => setBuscarMunicipio(data)}
          />
          <Search
            placeholder={"Filtrar por encargado"}
            onSearch={(data) => setBucarEncargado(data)}
          />
        </div>
        <div className={styles.filtro}>
          <div className={styles.ajustarfiltro}>
            {(session.user.role === "Administrador" ||
              session.user.role === "Encargado" ||
              session.user.role === "Oficina") && (
              <Button
                text={"Todos"}
                type={filtrarPorTodos ? "cancelar" : ""}
                onPress={() => {
                  if (!filtrarPorTodos) {
                    setPaginaActual(0);
                    setEstado(null);
                    setEntregas([]);
                  }
                  controlarFiltroTodos();
                }}
              />
            )}
            {(session.user.role === "Administrador" ||
              session.user.role === "Encargado" ||
              session.user.role === "Oficina") && (
              <Button
                text={"Pendientes"}
                type={filtrarPorPendientes ? "cancelar" : ""}
                onPress={() => {
                  if (!filtrarPorPendientes) {
                    setPaginaActual(0);
                    setEntregas([]);
                    setEstado("por%20confirmar");
                  }
                  controlarFiltroPendientes();
                }}
              />
            )}
            {(session.user.role === "Administrador" ||
              session.user.role === "Encargado" ||
              session.user.role === "Oficina") && (
              <Button
                text={"En Edición"}
                type={filtrarPorEnEdicion ? "cancelar" : ""}
                onPress={() => {
                  if (!filtrarPorEnEdicion) {
                    setPaginaActual(0);
                    setEntregas([]);
                    setEstado("en%20edición");
                  }
                  controlarFiltroEnEdicion();
                }}
              />
            )}
            {(session.user.role === "Administrador" ||
              session.user.role === "Oficina") && (
              <Button
                text={"Preparación"}
                type={filtrarPorPreparados ? "cancelar" : ""}
                onPress={() => {
                  if (!filtrarPorPreparados) {
                    setPaginaActual(0);
                    setEntregas([]);
                    setEstado("preparación");
                  }
                  controlarFiltroPreparado();
                }}
              />
            )}
            {(session.user.role === "Administrador" ||
              session.user.role === "Encargado" ||
              session.user.role === "Chofer") && (
              <Button
                text={"En Proceso"}
                type={filtrarPorEnProceso ? "cancelar" : ""}
                onPress={() => {
                  if (!filtrarPorEnProceso) {
                    setPaginaActual(0);
                    setEntregas([]);
                    setEstado("%reci%");
                  }
                  controlarFiltroEnProceso();
                }}
              />
            )}
            {session.user.role === "Administrador" && (
              <Button
                text={"Finalizados"}
                type={filtrarPorFinalizadas ? "cancelar" : ""}
                onPress={() => {
                  if (!filtrarPorFinalizadas) {
                    setPaginaActual(0);
                    setEntregas([]);
                    setEstado("finalizada");
                  }
                  controlarFiltroFinalizadas();
                }}
              />
            )}
          </div>
          {(session.user.role === "Administrador" ||
            session.user.role === "Encargado"
          ) && (
            <Button
            text={"Nueva Entrega"}
            type={"cancelar"}
            onPress={() => {
              router.push("/entregas/nuevo");
            }}
          />
          )}
        </div>
      </div>
      <div className={styles.contenido}>
        {filtrarPorTodos && (
          <>
            <div className={styles.banner}>
              <h3>Todas las Entregas</h3>
            </div>
            {total.length != 0 ? (
              <>
                {total
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega
                        entrega={entrega}
                        disabled={
                          session.user.role === "Administrador"
                            ? true
                            : session.user.role === "Encargado" &&
                              entrega.entrega.en_estado != "preparación"
                            ? true
                            : false
                        }
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div className={styles.errorContent}>
                <h1 className={styles.textError}>Aún no hay entregas</h1>
              </div>
            )}
          </>
        )}
        {filtrarPorPendientes && (
          <>
            <div className={styles.banner}>
              <h3>Pendientes</h3>
            </div>
            {totalPendientes.length != 0 ? (
              <>
                {totalPendientes
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega
                        entrega={entrega}
                        disabled={
                          session.user.role === "Administrador"
                            ? true
                            : session.user.role === "Encargado"
                            ? true
                            : false
                        }
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div className={styles.errorContent}>
                <h1 className={styles.textError}>Aún no hay entregas</h1>
              </div>
            )}
          </>
        )}
        {filtrarPorEnEdicion && (
          <>
            <div className={styles.banner}>
              <h3>En Edición</h3>
            </div>
            {totalEnEdicion.length != 0 ? (
              <>
                {totalEnEdicion
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega
                        entrega={entrega}
                        disabled={
                          session.user.role === "Administrador"
                            ? true
                            : session.user.role === "Encargado"
                            ? true
                            : false
                        }
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div className={styles.errorContent}>
                <h1 className={styles.textError}>Aún no hay entregas</h1>
              </div>
            )}
          </>
        )}
        {filtrarPorPreparados && (
          <>
            <div className={styles.banner}>
              <h3>Preparación</h3>
            </div>
            {totalPreparados.length != 0 ? (
              <>
                {totalPreparados
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega
                        entrega={entrega}
                        disabled={
                          session.user.role === "Administrador" ? true : false
                        }
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div className={styles.errorContent}>
                <h1 className={styles.textError}>Aún no hay entregas</h1>
              </div>
            )}
          </>
        )}
        {filtrarPorEnProceso && (
          <>
            <div className={styles.banner}>
              <h3>En Proceso</h3>
            </div>
            {totalEnProceso.length != 0 ? (
              <div>
                {totalEnProceso
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega
                        entrega={entrega}
                        disabled={
                          (session.user.role === "Administrador" || session.user.role === "Chofer" || session.user.role === 'Encargado') ? true : false
                        }
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div className={styles.errorContent}>
                <h1 className={styles.textError}>Aún no hay entregas</h1>
              </div>
            )}
          </>
        )}
        {filtrarPorFinalizadas && (
          <>
            <div className={styles.banner}>
              <h3>Finalizadas</h3>
            </div>
            {totalFinalizadas.length != 0 ? (
              <>
                {totalFinalizadas
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega
                        entrega={entrega}
                        disabled={
                          session.user.role === "Administrador"
                            ? true
                            : session.user.role === "Encargado"
                            ? true
                            : false
                        }
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div className={styles.errorContent}>
                <h1 className={styles.textError}>Aún no hay entregas</h1>
              </div>
            )}
          </>
        )}
        {filtrarPorCanceladas && (
          <>
            <div className={styles.banner}>
              <h3>Canceladas</h3>
            </div>
            {totalCanceladas.length != 0 ? (
              <>
                {totalCanceladas
                  .filter(
                    (entrega) =>
                      entrega.cliente.cli_municipio
                        .toLowerCase()
                        .includes(buscarMunicipio.toLowerCase()) &&
                      entrega.encargado.emp_nombre
                        .toLowerCase()
                        .includes(bucarEncargado.toLowerCase())
                  )
                  .map((entrega, key) => (
                    <div key={key}>
                      <CardEntrega entrega={entrega} />
                    </div>
                  ))}
              </>
            ) : (
              <div>no hay entregas canceladas</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
