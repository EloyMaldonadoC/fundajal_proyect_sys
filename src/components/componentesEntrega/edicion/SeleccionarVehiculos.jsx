import { useEffect, useState } from "react";
import styles from "./module/SeleccionarVehiculos.module.css";
import { Button } from "@/components/input/InputComponents";

function SeleccionarVehiculos({ id, lista, vehiculosSeleccionados, validar }) {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [vehiculos, setVehiculos] = useState([]);
  const [totalVehiculos, setTotalVehiculos] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  const [agregarMas, setAgregarMas] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(false);

  useEffect(() => {
    fetch("/api/vehiculos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVehiculos(data);
        setTotalVehiculos(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (lista && totalVehiculos.length != 0) {
      if (lista.length !== 0 || lista) {
        setListaVehiculos(lista);
        setMostrarBoton(true);

        const filtro = totalVehiculos.filter(vehiculo => !lista.some(excluir => excluir.ve_id === vehiculo.ve_id));
        setVehiculos(filtro);
      }
    }
  }, [lista, totalVehiculos]);

  const handleChangeSelect = (value) => {
    const selec = vehiculos.find((vehiculo) => vehiculo.ve_id == value);
    setListaVehiculos([...listaVehiculos, selec]);

    const noSelect = vehiculos.filter((vehiculo) => vehiculo.ve_id != value);
    setVehiculos(noSelect);

    vehiculosSeleccionados([...listaVehiculos, selec]);

    setMostrarBoton(true);
    setAgregarMas(false);
  };

  const handlePressX = (value) => {
    const select = listaVehiculos.find((vehiculo) => vehiculo.ve_id == value);
    setVehiculos([...vehiculos, select]);
    
    const noSelect = listaVehiculos.filter((vehiculo) => vehiculo.ve_id != value);
    setListaVehiculos(noSelect);

    vehiculosSeleccionados(noSelect);
    
    setAgregarMas(false)
    if (!mostrarBoton && listaVehiculos != 0) {
      setMostrarBoton(true)
    }
  }

  const handlePressAgregar = () => {
    setAgregarMas(true);
    setMostrarBoton(false);
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>Vehiculos</h3>
      </div>
      <div className={styles.container}>
        {listaVehiculos.length != 0 ? (
          <div>
            {listaVehiculos.map((item, index) => (
              <div key={index} className={styles.vehiculos}>
                <span>{item.ve_marca} {item.ve_modelo}</span>
                <Button text={"x"} type={"aceptar"} onPress={() => {handlePressX(item.ve_id)}}/>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <label className={validar ? styles.validar : ""}> Seleccionar vehiculo: </label>
            <select
            className={`${styles.select} ${validar ? styles.validar : ""}`}
              onChange={(value) => {
                handleChangeSelect(value.target.value);
              }}
            >
              <option value="ninguno">--ninguno--</option>
              {vehiculos && (
                <>
                  {vehiculos.map((vehiculo, index) => (
                    <option key={index} value={vehiculo.ve_id}>
                      {vehiculo.ve_marca} {vehiculo.ve_modelo} {vehiculo.ve_ano} {vehiculo.ve_palancas}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        )}
        {mostrarBoton && vehiculos != 0 && listaVehiculos != 0 && (
          <div>
            <Button
              text={"agregar otro"}
              type={"aceptar"}
              onPress={() => {
                handlePressAgregar();
              }}
            />
          </div>
        )}        
        {agregarMas && (
          <div>
            {vehiculos.length != 0 && (
              <div>
                <label>Seleccionar vehiculo: </label>
                <select
                className={styles.select}
                  onChange={(value) => {
                    handleChangeSelect(value.target.value);
                  }}
                >
                  <option value="ninguno">--ninguno--</option>
                  {vehiculos && (
                    <>
                      {vehiculos.map((vehiculo, index) => (
                        <option value={vehiculo.ve_id} key={index}>
                          {vehiculo.ve_marca} {vehiculo.ve_modelo} {vehiculo.ve_ano}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.fooder} />
    </div>
  );
}

export default SeleccionarVehiculos;
