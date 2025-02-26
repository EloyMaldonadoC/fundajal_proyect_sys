import { useState, useEffect } from "react";
import styles from "./module/FormProveedor.module.css";
import LoadingScreen from "./LoadingScreen";

import Modal from "./input/Modal";

function FormProveedor({proveedorExistente, onChange}) {
  const [state, setState] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [retroInf, setRetroInf] = useState(false);
  const [selectIsVisible, setSelectIsVisible] = useState(true);

  //variables para los estados de el fetching de datos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  //variables para los datos del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");
  const [rfc, setRFC] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (proveedorExistente && proveedorExistente != "ninguno") {
      fetch(`/api/proveedores/${proveedorExistente}`)
        .then((respose) => {
          if (!respose.ok) {
            throw new Error("Network response was not ok");
          }
          return respose.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);

          setNombre(data.prov_nombre);
          setTelefono(data.prov_numero_cont);
          setDireccion(data.prov_direccion);
          setMunicipio(data.prov_municipio);
          setEstado(data.prov_estado);
          setRFC(data.prov_rfc);
          
          setIsEditable(false);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    if (proveedorExistente == "ninguno") {
      setNombre('');
      setTelefono('');
      setDireccion('');
      setMunicipio('');
      setEstado('');
      setRFC('');
      setIsEditable(true);
    }
  }, [proveedorExistente]);

  const handleEdit = () => {
    setState(!state)
    setSelectIsVisible(true)
    onChange(selectIsVisible);
  };
  const manejarClick = () => {
    if(nombre == '' || telefono == '' || direccion == '' || municipio == '' || estado == '' || rfc == ''){
      setRetroInf(true);
    } else {
      console.log('Entre')
      setShowModal(true);
      setRetroInf(false);
    }
  };

  const handleAccept = () => {
    console.log("Aceptado");
    setState(!state);
    setShowModal(false);
    setSelectIsVisible(false)
    onChange(selectIsVisible);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className={`${styles.container} ${
        !state ? styles.containerEx : styles.containerCont
      }`}
    >
      {!state && (
        <>
          <div>
            <label htmlFor="form" id="lblNombre" className={styles.label}>
              Nombre del Proveedor:
            </label>
            <input
              type="text"
              id="inpNombre"
              placeholder={`${retroInf ? 'Falta el Nombre*' : 'Nombre'}`}
              className={`${styles.input} ${retroInf ? styles.inputRetroInf : ''}`}
              value={nombre}
              onChange={(nombre) => {
                setNombre(nombre.target.value);
              }}
              readOnly={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="form" id="lblTelNum" className={styles.label}>
              Número de Teléfono:
            </label>
            <input
              type="number"
              id="inpTelNum"
              placeholder={`${retroInf ? 'Falta el Número de teléfono*' : 'Número de teléfono'}`}
              className={`${styles.input} ${retroInf ? styles.inputRetroInf : ''}`}
              value={telefono}
              onChange={(telefono) => {
                setTelefono(telefono.target.value);
              }}
              readOnly={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="form" id="lblDirect" className={styles.label}>
              Dirección:
            </label>
            <input
              type="text"
              id="inpDirect"
              placeholder={`${retroInf ? 'Falta la Dirección*' : 'Dirección'}`}
              className={`${styles.input} ${retroInf ? styles.inputRetroInf : ''}`}
              value={direccion}
              onChange={(direccion) => {
                setDireccion(direccion.target.value);
              }}
              readOnly={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="form" id="lblMunicipio" className={styles.label}>
              Municipio:
            </label>
            <input
              type="text"
              name="inpMunicipio"
              id="inpMunicipio"
              placeholder={`${retroInf ? 'Falta el Municipio*' : 'Municipio'}`}
              className={`${styles.input} ${retroInf ? styles.inputRetroInf : ''}`}
              value={municipio}
              onChange={(municipio) => {
                setMunicipio(municipio.target.value);
              }}
              readOnly={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="form" id="lblEstado" className={styles.label}>
              Estado:
            </label>
            <input
              type="text"
              name="Estado"
              id="inpEstado"
              placeholder={`${retroInf ? 'Falta el Estado*' : 'Estado'}`}
              className={`${styles.input} ${retroInf ? styles.inputRetroInf : ''}`}
              value={estado}
              onChange={(estado) => {
                setEstado(estado.target.value);
              }}
              readOnly={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="form" id="lblRFC" className={styles.label}>
              RFC:
            </label>
            <input
              type="text"
              name="RFC"
              id="inpRFC"
              placeholder={`${retroInf ? 'Falta el RFC*' : 'RFC'}`}
              className={`${styles.input} ${retroInf ? styles.inputRetroInf : ''}`}
              value={rfc}
              onChange={(rfc) => {
                setRFC(rfc.target.value);
              }}
              readOnly={!isEditable}
            />
          </div>
          <button className={styles.button} onClick={manejarClick}>
            Aceptar
          </button>
        </>
      )}
      {state && (
        <p className={styles.text}>
          {nombre}: {direccion}, {municipio}, {estado}.
        </p>
      )}
      {state && (<button className={styles.button} onClick={handleEdit}>
        Editar
      </button>)}
      <Modal
        show={showModal}
        handleClose={handleClose}
        handleAccept={handleAccept}
      />
    </div>
  );
}

export default FormProveedor;
