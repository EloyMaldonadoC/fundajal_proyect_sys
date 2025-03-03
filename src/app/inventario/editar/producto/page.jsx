"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { Input, Button, Modal } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";

function EditarProducto() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [participacionFunda, setParticipacionFunda] = useState(0);
  const [participacionEnlace, setParticipacionEnlace] = useState(0);

  const [verificarNombre, setVerificarNombre] = useState(false);
  const [verificarPrecio, setVerificarPrecio] = useState(false);
  const [verificarPartiFun, setVerificarPartiFun] = useState(false);
  const [verificarPartiEnlace, setVerificarPartiEnlace] = useState(false);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`/api/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNombre(data.produc_nombre);
        setPrecio(data.produc_precio_venta);
        setParticipacionFunda(data.produc_parti_fun);
        setParticipacionEnlace(data.produc_parti_enlace);
        setLoading(false);
        console.log(data);
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

  const validacion = () => {
    if(nombre == '') {
      setVerificarNombre(true);
      return
    }
    if(precio <= 0 || precio == '') {
      setVerificarPrecio(true);
      return
    }
    if(participacionFunda <= 0 || participacionFunda == '') {
      setVerificarPartiFun(true);
      return
    }
    if(participacionEnlace <= 0 || participacionEnlace == '') {
      setParticipacionEnlace(true);
      return
    }
    setVerificarNombre(false);
    setVerificarPrecio(false);
    setVerificarPartiFun(false);
    setVerificarPartiEnlace(false);
    setShowModal(true)
  }

  const handleClickEditar = () => {
    fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        produc_nombre: nombre,
        produc_precio_venta: precio,
        produc_parti_fun: participacionFunda,
        produc_parti_enlace: participacionEnlace
      })
    }).then((response) => {
      return response.json();
    })
    router.push('/inventario')
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/inventario" className={styles.link}>
            Inventario
          </Link>{" "}
          \ Editar Producto
        </h4>
      </div>
      <div className={styles.informacio}>
        <div>
          <h3>Editar Producto</h3>
          <Input
            placeholder={"Nombre del Producto"}
            value={nombre}
            type={"text"}
            onChange={(nombre) => {
              setNombre(nombre);
            }}
            validation={verificarNombre}
          />
          <Input
            placeholder={"Precio de Venta"}
            value={precio}
            type={"number"}
            onChange={(precio) => {
              setPrecio(precio);
            }}
            validation={verificarPrecio}
          />
          <Input
            placeholder={"Participacion Fundación"}
            value={participacionFunda}
            type={"number"}
            onChange={(parti) => {
              setParticipacionFunda(parti);
            }}
            validation={verificarPartiFun}
          />
          <Input
            placeholder={"Participacion Enlace"}
            value={participacionEnlace}
            type={"number"}
            onChange={(parti) => {
              setParticipacionEnlace(parti);
            }}
            validation={verificarPartiEnlace}
          />
        </div>
        <div className={styles.botones}>
          <Button
            text={"Guardar Cambios"}
            type={"aceptar"}
            onPress={validacion}
          />
        </div>
        <Modal
          show={showModal}
          title={"Atención Guardar Cambios"}
          message={`¿Deseas guardar los cambios realizados?`}
          handleClose={() => {
            setShowModal(false);
          }}
          handleAccept={handleClickEditar}
        />
      </div>
    </div>
  );
}

export default EditarProducto;
