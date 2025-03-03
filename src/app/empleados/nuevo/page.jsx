"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Input, Button, Modal, Select } from "@/components/input/InputComponents";
import { TimePick } from "@/components/calendarComponents/CalendarComponents";
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs';
import { useSession } from "next-auth/react";

function NuevoEmpleado() {
  const { data: session, status } = useSession();
  const routes = useRouter();

  const [nombre, setNombre] = useState("");
  const [validarNombre, setValidarNombre] = useState(false);
  const [apellido, setApellido] = useState("");
  const [validarApellido, setValidarApellido] = useState(false);
  const [rol, setRol] = useState("");
  const [validarRol, setValidarRol] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [validarTelefono, setValidarTelefono] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [validarUsuario, setValidarUsuario] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [validarPasswords, setValidarPasswords] = useState(false);
  const [horaEntrada, setHoraEntrada] = useState("08:00");
  const [horaSalida, setHoraSalida] = useState("16:00");
  const [foto, setFoto] = useState(null);

  const [encryptedPassword, setEncryptedPassword] = useState('');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (session.user.role !== "Administrador" || session.user.role === 'Oficina') {
      routes.push("/");
    }
  }, [session, routes]);
  
  const handlePressAddEmp = () => {
    fetch("/api/empleados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_nombre: nombre,
        emp_apellido: apellido,
        emp_num_tel: telefono,
        emp_rol: rol,
        emp_estado: "disponible",
        emp_usuario: usuario,
        emp_contraseña: encryptedPassword,
        emp_hora_entrada: horaEntrada,
        emp_hora_salida: horaSalida,
        emp_foto: foto,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error.message);
      });
    setShowModal(false);
    routes.push("/empleados");
  };
  const handlePressValidar = () => {
    if (nombre == "") {
      setValidarNombre(true);
    }
    if (apellido == "") {
      setValidarApellido(true);
    }
    if (rol == "ninguno") {
      setValidarRol(true);
    }
    if (telefono <= 0 || telefono > 10000000000 || telefono == "") {
      setValidarTelefono(true);
    }
    if (usuario == "") {
      setValidarUsuario(true);
    }
    if (password != confirmarPassword || password == '' || confirmarPassword == '') {
      setValidarPasswords(true);
    } 
    else if (validarNombre == false && validarApellido == false && validarRol == false && validarTelefono == false && validarUsuario == false && validarPasswords == false) {
      setShowModal(true);
      encryptPassword(password).then((pass) =>{setEncryptedPassword(pass)})
      setValidarNombre(false);
      setValidarApellido(false);
      setValidarTelefono(false);
      setValidarRol(false);
      setValidarUsuario(false);
      setValidarPasswords(false);
    }
  };
  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/empleados" className={styles.link}>
            Empleados
          </Link>{" "}
          \ Nuevo
        </h4>
      </div>
      <div className={styles.container}>
        <h4>Datos del Empleado</h4>
        <Input
          placeholder={"Nombre del Empleado"}
          type={"text"}
          value={nombre}
          onChange={(nombre) => {
            setNombre(nombre);
          }}
          validation={validarNombre}
        />
        <Input
          placeholder={"Apellidos del Empleado"}
          type={"text"}
          value={apellido}
          onChange={(apellido) => {
            setApellido(apellido);
          }}
          validation={validarApellido}
        />
        <Select 
          data={
          [
            { id: 1, nombre: "Encargado" },
            { id: 2, nombre: "Chofer" },
            { id: 3, nombre: "Cargador" },
            { id: 4, nombre: "Oficina" },
          ]
        } onSelect={(rol) => {
          setRol(rol);
          }}
          text={"Puesto: "}
          validar={validarRol}  
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
        <TimePick
          text={"Hora de Entrada: "}
          timeSelect={(time) => {
            setHoraEntrada(time);
          }}
          time={horaEntrada}

        />
        <TimePick
          text={"Hora de Salida: "}
          timeSelect={(time) => {
            setHoraSalida(time);
          }}
          time={horaSalida}
        />
        <div>
          <h4>Datos de Usuario</h4>
          <Input
            placeholder={"Nombre de Usuario"}
            value={usuario}
            type={"text"}
            onChange={(usuario) => {
              setUsuario(usuario);
            }}
            validation={validarUsuario}
          />
          <Input
            placeholder={"Contraseña"}
            value={password}
            type={"password"}
            onChange={(password) => {
              setPassword(password);
            }}
            validation={validarPasswords}
          />
          <Input
            placeholder={"Confirmar Contraseña"}
            value={confirmarPassword}
            type={"password"}
            onChange={(confirmarPassword) => {
              setConfirmarPassword(confirmarPassword);
            }}
            validation={validarPasswords}
          />
        </div>
        <div className={styles.botones}>
          <Button
            text={"Agregar Empleado"}
            type={"aceptar"}
            onPress={handlePressValidar}
          />
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Agregar Empleado"}
        message={"Se agregara un nuevo empleado a la lista de empleados"}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAccept={handlePressAddEmp}
      />
    </div>
  );
}

export default NuevoEmpleado;
