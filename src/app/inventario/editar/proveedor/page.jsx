"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { Input, Button, Modal } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";

function EditarProveedor() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState(0);
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");
  const [rfc, setRfc] = useState("");

  const [verificarNombre, setVerificarNombre] = useState(false);
  const [verificarTelefono, setVerificarTelefono] = useState(false);
  const [verificarDireccion, setVerificarDireccion] = useState(false);
  const [verificarMunicipio, setVerificarMunicipio] = useState(false);
  const [verificarEstado, setVerificarEstado] = useState(false);
  const [verificarRfc, setVerificarRfc] = useState(false);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`/api/proveedores/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNombre(data.prov_nombre);
        setTelefono(data.prov_numero_cont);
        setDireccion(data.prov_direccion);
        setMunicipio(data.prov_municipio);
        setEstado(data.prov_estado);
        setRfc(data.prov_rfc);
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
    if(telefono <= 0) {
      setVerificarTelefono(true);
      return
    }
    if(direccion == '') {
      setVerificarDireccion(true);
      return
    }
    if(municipio == '') {
      setVerificarMunicipio(true);
      return
    }
    if(estado == '') {
      setVerificarEstado(true);
      return
    }
    if(rfc == '') {
      setVerificarRfc(true);
      return
    }
    setVerificarNombre(false);
    setVerificarTelefono(false);
    setVerificarDireccion(false);
    setVerificarMunicipio(false);
    setVerificarEstado(false);
    setVerificarRfc(false);
    setShowModal(true)
  }
  const handleClickEditar = () => {
    fetch(`/api/proveedores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prov_nombre: nombre,
        prov_numero_cont: telefono,
        prov_direccion: direccion,
        prov_municipio: municipio,
        prov_estado: estado,
        prov_rfc: rfc
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
          \ Editar Proveedor
        </h4>
      </div>
      <div className={styles.informacio}>
        <div>
          <h3>Editar Proveedor</h3>
          <Input
            placeholder={"Nombre del Proveedor"}
            value={nombre}
            type={"text"}
            onChange={(nombre) => {
              setNombre(nombre);
            }}
            validation={verificarNombre}
          />
          <Input
            placeholder={"Número de Teléfono"}
            value={telefono}
            type={"number"}
            onChange={(tel) => {
              setTelefono(tel);
            }}
            validation={verificarTelefono}
          />
          <Input
            placeholder={"Dirección"}
            value={direccion}
            type={"text"}
            onChange={(dire) => {
              setDireccion(dire);
            }}
            validation={verificarDireccion}
          />
          <Input
            placeholder={"Municipio"}
            value={municipio}
            type={"text"}
            onChange={(mun) => {
              setMunicipio(mun);
            }}
            validation={verificarMunicipio}
          />
          <Input
            placeholder={"Estado"}
            value={estado}
            type={"text"}
            onChange={(est) => {
              setEstado(est);
            }}
            validation={verificarEstado}
          />
          <Input
            placeholder={"RFC"}
            value={rfc}
            type={"text"}
            onChange={(rfc) => {
              setRfc(rfc);
            }}
            validation={verificarRfc}
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

export default EditarProveedor;
