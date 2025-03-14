"use client";
import { useEffect, useState } from "react";
import styles from "./module/AgregarMunicipio.module.css";
import { Button, Input, Modal } from "@/components/input/InputComponents";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";

function AgregarMunicipio({ datosCliente, validar }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalExisteEditar, setShowModalExisteEditar] = useState(false);
  const [showModalNoExisteEditar, setShowModalNoExisteEditar] = useState(false);

  const [menu, setMenu] = useState(true);
  const [existe, setExiste] = useState(true);
  const [noExiste, setNoExiste] = useState(false);
  const [existeInfo, setExisteInfo] = useState(false);
  const [noExisteInfo, setNoExisteInfo] = useState(false);
  const [editarExiste, setEditarExiste] = useState(false);
  const [editarNoExiste, setEditarNoExiste] = useState(false);

  const [clientes, setClientes] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("ninguno");
  const [enlaces, setEnlaces] = useState([]);
  const [enlaceSeleccionado, setEnlaceSeleccionado] = useState(0);
  const [validarEnlace, setValidarEnlace] = useState(false);

  const [nombreEditar, setNombreEditar] = useState("");
  const [validarNombreEditar, setValidarNombreEditar] = useState(false);
  const [telefonoEditar, setTelefonoEditar] = useState("");
  const [validarTelefonoEditar, setValidarTelefonoEditar] = useState(false);
  const [municipioEditar, setMunicipioEditar] = useState("");
  const [validarMunicipioEditar, setValidarMunicipioEditar] = useState(false);
  const [estadoEditar, setEstadoEditar] = useState("");
  const [validarEstadoEditar, setValidarEstadoEditar] = useState(false);

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [validarNombre, setValidarNombre] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [validarTelefono, setValidarTelefono] = useState(false);
  const [municipio, setMunicipio] = useState("");
  const [validarMunicipio, setValidarMunicipio] = useState(false);
  const [estado, setEstado] = useState("");
  const [validarEstado, setValidarEstado] = useState(false);

  useEffect(() => {
    if (
      session.user.role === "Administrador" ||
      session.user.role === "Oficina"
    ) {
      fetch("/api/clientes")
        .then((response) => {
          if (!response.ok) {
            throw new Error("The Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setClientes(data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
      fetch(`/api/empleados/filtrar/cargo/${"Encargado"}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEnlaces(data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    } else {
      fetch(`/api/empleados/contactos/${session.user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("The Response is not ok");
          }
          return response.json();
        })
        .then((data) => {
          setClientes(data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSelect = () => {
    const selected = event.target.value;
    setClienteSeleccionado(selected);
    datosCliente(selected);
    setEditarExiste(false);
    if (selected != "ninguno") {
      setExisteInfo(true);
    } else {
      setExisteInfo(false);
      datosCliente(null);
    }
  };

  const onChangeCheckBox = () => {
    setExiste(!existe);
    setExisteInfo(false);
    generateNewID();
    setClienteSeleccionado("ninguno");
    if (existe) {
      setNoExiste(true);
    } else {
      setNoExiste(false);
    }
  };

  const generateNewID = () => {
    const newID = Math.floor(1000000 + Math.random() * 90000000);
    setId(newID);
  };

  const validarFormulario = () => {
    if (nombre == "") {
      setValidarNombre(true);
    } else {
      setValidarNombre(false);
    }
    if (telefono <= 0 || telefono > 9999999999) {
      setValidarTelefono(true);
    } else {
      setValidarTelefono(false);
    }
    if (municipio == "") {
      setValidarMunicipio(true);
    } else {
      setValidarMunicipio(false);
    }
    if (estado == "") {
      setValidarEstado(true);
    } else {
      setValidarEstado(false);
    }
    if (enlaceSeleccionado == 0) {
      setValidarEnlace(true);
    } else {
      setValidarEnlace(false);
    }
    if (
      (nombre != "" && telefono > 0) ||
      (telefono <= 9999999999 && municipio != "" && estado != "" )
    ) {
      if (session.user.role === "Administrador" || session.user.role === "Oficina") {
        if (enlaceSeleccionado != 0) {
          setShowModal(true);
        }
      } else {
        setShowModal(true);
      }
    }
  };

  const validarExisteEditar = () => {
    if (nombreEditar == "") {
      setValidarNombreEditar(true);
    } else {
      setValidarNombreEditar(false);
    }
    if (telefonoEditar <= 0 || telefonoEditar > 9999999999) {
      setValidarTelefonoEditar(true);
    } else {
      setValidarTelefonoEditar(false);
    }
    if (municipioEditar == "") {
      setValidarMunicipioEditar(true);
    } else {
      setValidarMunicipioEditar(false);
    }
    if (estadoEditar == "") {
      setValidarEstadoEditar(true);
    } else {
      setValidarEstadoEditar(false);
    }
    if (
      (nombreEditar != "" && telefonoEditar > 0) ||
      (telefonoEditar <= 9999999999 &&
        municipioEditar != "" &&
        estadoEditar != "")
    ) {
      setShowModalExisteEditar(true);
    }
  };

  const onPressAcept = async () => {
    await fetch("/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cli_id: id,
        cli_nombre: nombre,
        cli_municipio: municipio,
        cli_estado: estado,
        cli_numero_contac: telefono,
      }),
    })
    if (session.user.role === "Encargado") {
      fetch(`/api/empleados/contactos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cli_id: id,
          emp_id: session.user.id,
        }),
      })
    } else {
      fetch(`/api/empleados/contactos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cli_id: id,
          emp_id: enlaceSeleccionado,
        }),
      })
    }
    datosCliente(id);
    setShowModal(false);
    setNoExiste(false);
    setNoExisteInfo(true);
  };

  const validarNoExisteEditar = () => {};

  const onPressEditExist = () => {
    fetch(`/api/clientes/${clienteSeleccionado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const onPressEditNoExist = () => {
    fetch(`/api/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cli_nombre: nombre,
        cli_municipio: municipio,
        cli_estado: estado,
        cli_numero_contac: telefono,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.encabezado}>
        <h3>Municipio</h3>
      </div>

      <div className={styles.contenedor}>
        {menu && (
          <div className={styles.checkbox}>
            <label>El municipio existe</label>
            <input
              type="checkbox"
              onChange={onChangeCheckBox}
              checked={existe}
            />
          </div>
        )}
        {existe && (
          <div
            className={`${styles.espaciado} ${validar ? styles.validar : ""}`}
          >
            <label>Municipio: </label>
            <select
              className={`${styles.select} ${validar ? styles.validar : ""}`}
              name="municipios existentes"
              value={clienteSeleccionado}
              onChange={onChangeSelect}
            >
              <option value="ninguno">--Ninguno--</option>
              {clientes && (
                <>
                  {clientes.map((cliente) => (
                    <option value={cliente.cli_id} key={cliente.cli_id}>
                      {cliente.cli_municipio}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        )}
        {noExiste && (
          <div className={styles.espaciado}>
            <h4>Agregar Municipio</h4>
            <div className={styles.formulario}>
              <Input
                placeholder={"Nombre del Enlace"}
                type={"text"}
                value={nombre}
                onChange={(nombre) => {
                  setNombre(nombre);
                }}
                validation={validarNombre}
              />
              <Input
                placeholder={"Telefono"}
                type={"number"}
                value={telefono}
                onChange={(telefono) => {
                  setTelefono(telefono);
                }}
                validation={validarTelefono}
              />
              <Input
                placeholder={"Municipio"}
                type={"text"}
                value={municipio}
                onChange={(municipio) => {
                  setMunicipio(municipio);
                }}
                validation={validarMunicipio}
              />
              <Input
                placeholder={"Estado"}
                type={"text"}
                value={estado}
                onChange={(estado) => {
                  setEstado(estado);
                }}
                validation={validarEstado}
              />
              {session.user.role === "Administrador" && (
                <div>
                  <label>Seleccionar encargado: </label>
                  <select
                    className={`${styles.select} ${validarEnlace ?  styles.validar : ""}`}
                    onChange={(e) => {
                      setEnlaceSeleccionado(e.target.value);
                    }}
                  >
                    <option value={0}>--seleccionar--</option>
                    {enlaces.map((enlace, key) => (
                      <option value={enlace.emp_id} key={key}>
                        {enlace.emp_nombre} {enlace.emp_apellido}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <Button
              text={"Aceptar"}
              type={"aceptar"}
              onPress={() => {
                validarFormulario();
              }}
            />
          </div>
        )}
        {existeInfo && (
          <div>
            {clientes && (
              <div className={styles.espaciado}>
                {clientes.map((item) => (
                  <div key={item.cli_id}>
                    {item.cli_id == clienteSeleccionado && (
                      <div>
                        <p>Nombre del Enlace: {item.cli_nombre}</p>
                        <p>Tel: {item.cli_numero_contac}</p>
                        <p>
                          Municipio: {item.cli_municipio}, {item.cli_estado}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {noExisteInfo && (
          <div>
            <div className={styles.espaciado}>
              <p>Nombre del Enlace: {nombre}</p>
              <p>Tel: {telefono}</p>
              <p>
                Municipio: {municipio}, {estado}
              </p>
            </div>
          </div>
        )}
        {editarExiste && (
          <div className={styles.espaciado}>
            <h3>Editar</h3>
            <div>
              <Input
                placeholder={"Nombre del Enlace"}
                type={"text"}
                value={nombreEditar}
                onChange={(nombre) => {
                  setNombreEditar(nombre);
                }}
                validation={validarNombreEditar}
              />
              <Input
                placeholder={"Municipio"}
                type={"text"}
                value={municipioEditar}
                onChange={(municipio) => {
                  setMunicipioEditar(municipio);
                }}
                validation={validarMunicipioEditar}
              />
              <Input
                placeholder={"Estado"}
                type={"text"}
                value={estadoEditar}
                onChange={(estado) => {
                  setEstadoEditar(estado);
                }}
                validation={validarEstadoEditar}
              />
              <Input
                placeholder={"Teléfono"}
                type={"number"}
                value={telefonoEditar}
                onChange={(telefono) => {
                  setTelefonoEditar(telefono);
                }}
                validation={validarTelefonoEditar}
              />
            </div>
            <Button
              text={"Aceptar"}
              type={"aceptar"}
              onPress={() => {
                validarExisteEditar();
              }}
            />
          </div>
        )}
        {editarNoExiste && (
          <div className={styles.espaciado}>
            <h3>Editar</h3>
            <div>
              <Input placeholder={"Nombre del Enlace"} />
              <Input placeholder={"Municipio"} />
              <Input placeholder={"Estado"} />
              <Input placeholder={"Teléfono"} />
            </div>
            <Button text={"Aceptar"} type={"aceptar"} />
          </div>
        )}
      </div>

      <div className={styles.pie} />
      <Modal
        show={showModal}
        title={"Agregar Municipio"}
        message={
          "¿Estas seguro de agregar un nuevo municipio?, los datos no podran editarse."
        }
        handleClose={() => {
          setShowModal(false);
        }}
        handleAccept={() => {
          onPressAcept();
        }}
      />
      <Modal
        show={showModalExisteEditar}
        title={"Editar Municipio"}
        message={
          "Se editara la información del municipio, favor de volver a seleccionar el municipio"
        }
        handleClose={() => {
          setShowModalExisteEditar(!showModalExisteEditar);
        }}
      />
      <Modal />
    </div>
  );
}

export default AgregarMunicipio;
