"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { Button, Select, TableEmp, InfoEmp } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";

function Empleados() {
  const { data: session, status } = useSession();
  const routes = useRouter();
  
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState(null);

  const [cargador, setCargador] = useState('ninguno');
  const [disponibilidad, setDisponibilidad] = useState('ninguno');

  const data = [{id: 1, nombre: 'Cargador'}, {id: 2, nombre: 'Encargado'}, {id: 3, nombre: 'Chofer'}]
  const data2 = [{id: 1, nombre: 'disponible'}, {id: 2, nombre: 'ocupado'},]

  useEffect(() => {
    if (session.user.role === 'Administrador') {
      fetch("/api/empleados")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmpleados(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    } else{
      routes.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes]);

  const handleFilterRol = (rol) => {
    console.log(rol);
    if(rol == 'ninguno') {
      fetch("/api/empleados")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmpleados(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    } else {
      fetch(`/api/empleados/filtrar/cargo/${rol}`).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then((data) => {
        setEmpleados(data)
        setLoading(false)
        console.log(data);
      }).catch((error) => {
        setError(error);
        setLoading(false);
      })
    }
  }
  const handleFilterDisp = (disp) => {
    console.log(disp);
    if(disp == 'ninguno') {
      fetch("/api/empleados")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmpleados(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    } else {
      fetch(`/api/empleados/filtrar/disponibilidad/${disp}`).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then((data) => {
        setEmpleados(data)
        setLoading(false)
        console.log(data);
      }).catch((error) => {
        setError(error);
        setLoading(false);
      })
    }
  }
  const handleClickRow = (id) => {
    fetch(`/api/empleados/${id}`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setEmpleado(data);
        setLoading(false);

        console.log(data[0]);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  const handleClickNew = () => {
    routes.push('/empleados/nuevo');
  }

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/empleados" className={styles.link}>
            Empleados
          </Link>{" "}
          \ 
        </h4>
      </div>
      <div className={styles.filtro}>
        <div className={styles.selects}>
          <Select text={'Filtrar por Rol: '} data={data} onSelect={(rol) => {handleFilterRol(rol)}}/>
          <Select text={'Filtrar por Disponibilidad: '} data={data2} onSelect={(disp) => {handleFilterDisp(disp)}}/>
        </div>
        <Button text={'Agregar Un Nuevo Empleado'} type={'cancelar'} onPress={handleClickNew}/>
      </div>
      <div className={styles.container}>
        <div className={styles.table}>
          <TableEmp empleados={empleados} onClickRow={(id) => {handleClickRow(id)}}/>
        </div>
        <div className={styles.info}>
          <InfoEmp empleado={empleado}/>
        </div>
      </div>
    </div>
  );
}

export default Empleados;
