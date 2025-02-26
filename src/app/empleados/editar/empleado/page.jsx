"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  Input,
  Button,
  Modal,
  Select,
} from "@/components/input/InputComponents";
import { TimePick } from "@/components/calendarComponents/CalendarComponents";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";

function EditarEmpleado() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [validarNombre, setValidarNombre] = useState(false);
  const [apellidos, setApellidos] = useState("");
  const [validarApellidos, setValidarApellidos] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [validarTelefono, setValidarTelefono] = useState(false);
  const [cargo, setCargo] = useState("");
  const [validarCargo, setValidarCargo] = useState(false);
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [estado, setEstado] = useState("");
  const [validarEstado, setValidarEstado] = useState(false);

  useEffect(() => {
    if (session.user.role === "Administrador") {
      fetch(`/api/empleados/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setNombre(data.emp_nombre);
          setApellidos(data.emp_apellido);
          setTelefono(data.emp_num_tel);
          setCargo(data.emp_rol);
          setHoraEntrada(data.emp_hora_entrada);
          setHoraSalida(data.emp_hora_salida);
          setEstado(data.emp_estado);
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
  }, [id, router]);

  const handlePressAccept = () => {
    if (nombre == "") {
      setValidarNombre(true);
    } else if (apellidos == "") {
      setValidarApellidos(true);
    } else if (telefono < 0) {
      setValidarTelefono(true);
    } else if (cargo == "" || cargo == "ninguno") { 
      setValidarCargo(true);
    } else if (estado == "ninguno" || estado == "") { 
      setValidarEstado(true);
    } else {
      setShowModal(true);
    }
  };

  const EditarEmpleado = () => {
    fetch(`/api/empleados/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_nombre: nombre,
        emp_apellido: apellidos,
        emp_num_tel: telefono,
        emp_rol: cargo,
        emp_hora_entrada: horaEntrada,
        emp_hora_salida: horaSalida,
        emp_estado: estado,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error.message);
      });
    router.push("/empleados");
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/empleados" className={styles.link}>
            Empleados
          </Link>{" "}
          \ Editar \ Empleado
        </h4>
      </div>
      <div className={styles.contenedor}>
        <div>
          <h4>Datos del Empleado</h4>
          <Input
            placeholder={"Nombre"}
            type={"text"}
            value={nombre}
            onChange={(nombre) => {
              setNombre(nombre);
            }}
            validation={validarNombre}
          />
          <Input
            placeholder={"Apellidos"}
            type={"text"}
            value={apellidos}
            onChange={(apellidos) => {
              setApellidos(apellidos);
            }}
            validation={validarApellidos}
          />
          <Input
            placeholder={"Teléfono"}
            type={"number"}
            value={telefono}
            onChange={(telefono) => {
              setTelefono(telefono);
            }}
            validation={validarTelefono}
          />
          <Select
            text={"Cargo"}
            data={[
              { id: 1, nombre: "Encargado" },
              { id: 2, nombre: "Chofer" },
              { id: 3, nombre: "Oficina" },
              { id: 4, nombre: "Cargador" },
            ]}
            onSelect={(cargo) => {
              setCargo(cargo);
            }}
            validar={validarCargo}
          />
          <Select
            text={"Estado"}
            data={[
              { id: 1, nombre: "disponible"},
              { id: 2, nombre: "ocupado" },
            ]}
            onSelect={(estado) => {
              setEstado(estado);
            }}
            validar={validarEstado}
          />

          <TimePick
            text={"Hora de Entrada:"}
            time={horaEntrada}
            timeSelect={(hora) => {
              setHoraEntrada(hora);
            }}
          />
          <TimePick
            text={"Hora de Salida"}
            time={horaSalida}
            timeSelect={(hora) => {
              setHoraSalida(hora);
            }}
          />
        </div>
        <div className={styles.botones}>
          <Button
            text={"Editar"}
            type={"aceptar"}
            onPress={handlePressAccept}
          />
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Editar Empleado"}
        message={"¿Deseas guardar los cambios hechos a este empleado?"}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAccept={EditarEmpleado}
      />
    </div>
  );
}

export default EditarEmpleado;
