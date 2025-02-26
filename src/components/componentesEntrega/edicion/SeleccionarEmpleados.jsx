import { useEffect, useState } from "react";
import styles from "./module/SeleccionarEmpleados.module.css";
import { Button } from "@/components/input/InputComponents";

function SeleccionarEmpleados({ id, encargado, empleados, seleccionados }) {
  const [lista, setLista] = useState([]);
  const [error, setError] = useState("");

  const [addButton, setAddButton] = useState(true);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [totalEmpleados, setTotalEmpleados] = useState([]);

  useEffect(() => {
    fetch("/api/empleados")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Respose is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLista(data);
        setTotalEmpleados(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (empleados && totalEmpleados.length !=0 ) {
      if (empleados.length !== 0 || empleados) {
        setListaEmpleados(empleados);

        const filtro = totalEmpleados.filter(empleado => !empleados.some(excluir => excluir.emp_id === empleado.emp_id));
        setLista(filtro);
      }
    }
  }, [empleados, totalEmpleados]);

  const handleChangeSelect = (value) => {
    if (value != "ninguno") {
      const selec = lista.find((empleado) => empleado.emp_id == value);
      setListaEmpleados([...listaEmpleados, selec]);

      const noSelect = lista.filter((empleado) => empleado.emp_id != value);
      setLista(noSelect);

      seleccionados([...listaEmpleados, selec]);
      setAddButton(true);
    } else {
      setAddButton(true);
    }
  };

  const handlePressX = (value) => {
    const select = listaEmpleados.find((empleado) => empleado.emp_id == value);
    setLista([...lista, select]);

    const noSelect = listaEmpleados.filter(
      (empleado) => empleado.emp_id != value
    );
    setListaEmpleados(noSelect);

    seleccionados(noSelect);
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>Encargado / Empleados</h3>
      </div>
      <div className={styles.container}>
        <span>
          {encargado ? (
            <p className={styles.wrapper}>
              <b>Encargado:</b> {encargado.emp_nombre} {encargado.emp_apellido}
            </p>
          ) : (
            <p>Cargando...</p>
          )}
        </span>
        {empleados && (
          <>
            {listaEmpleados.length != 0 && (
              <div className={styles.wrapper}>
                {listaEmpleados.map((empleado, index) => (
                  <div key={index} className={styles.nombre}>
                    <p>
                      <b>{empleado.emp_rol}</b>: {empleado.emp_nombre}{" "}
                      {empleado.emp_apellido}
                    </p>
                    <Button
                      text={"x"}
                      type={"aceptar"}
                      onPress={() => handlePressX(empleado.emp_id)}
                    />
                  </div>
                ))}
              </div>
            )}
            {lista.length != 0 && !addButton && (
              <div>
                <label>Empleado: </label>
                <select
                  className={styles.select}
                  onChange={(data) => handleChangeSelect(data.target.value)}
                >
                  <option value="ninguno">---ninguno-</option>
                  {lista.map((empleado, index) => (
                    <option key={index} value={empleado.emp_id}>
                      {empleado.emp_nombre} {empleado.emp_apellido} (
                      {empleado.emp_rol})
                    </option>
                  ))}
                </select>
              </div>
            )}
            {addButton && lista.length != 0 && (
              <Button
                text={"Añadir"}
                type={"aceptar"}
                onPress={() => setAddButton(false)}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.fooder} />
    </div>
  );
}

export default SeleccionarEmpleados;
