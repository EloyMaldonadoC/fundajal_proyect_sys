"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import { Input, Button, Select, Modal } from '@/components/input/InputComponents';
import { useSession } from 'next-auth/react';

function NuevoVehiculo() {
  const { data: session } = useSession();
  const router = useRouter();

  const [marca, setMarca] = useState('');
  const [validarMarca, setValidarMarca] = useState(false);
  const [modelo, setModelo] = useState('');
  const [validarModelo, setValidarModelo] = useState(false);
  const año = [{ id: 1, nombre: 2025 },
    { id: 2, nombre: 2024 },
    { id: 3, nombre: 2023 },
    { id: 4, nombre: 2022 },
    { id: 5, nombre: 2021 },
    { id: 6, nombre: 2020 },
    { id: 7, nombre: 2019 },
    { id: 8, nombre: 2018 },
    { id: 9, nombre: 2017 },
    { id: 10, nombre: 2016 },
    { id: 11, nombre: 2015 },
    { id: 12, nombre: 2014 },
    { id: 13, nombre: 2013 },
    { id: 14, nombre: 2012 },
    { id: 15, nombre: 2011 },
    { id: 16, nombre: 2010 },
    { id: 17, nombre: 2009 },
    { id: 18, nombre: 2008 },
    { id: 19, nombre: 2007 },
    { id: 20, nombre: 2006 },
    { id: 21, nombre: 2005 },
    { id: 22, nombre: 2004 },
    { id: 23, nombre: 2003 },
    { id: 24, nombre: 2002 },
    { id: 25, nombre: 2001 },
    { id: 26, nombre: 2000 },
    { id: 27, nombre: 1999 },
    { id: 28, nombre: 1998 },
    { id: 29, nombre: 1997 },
    { id: 30, nombre: 1996 },
    { id: 31, nombre: 1995 },
    { id: 32, nombre: 1994 },
    { id: 33, nombre: 1993 },
    { id: 34, nombre: 1992 },
    { id: 35, nombre: 1991 },
    { id: 36, nombre: 1990 },
    { id: 37, nombre: 1989 },
    { id: 38, nombre: 1988 },
    { id: 39, nombre: 1987 },
    { id: 40, nombre: 1986 },
    { id: 41, nombre: 1985 },
    { id: 42, nombre: 1984 },
    { id: 43, nombre: 1983 },
    { id: 44, nombre: 1982 },
    { id: 45, nombre: 1981 },
    { id: 46, nombre: 1980 },
    { id: 47, nombre: 1979 },
    { id: 48, nombre: 1978 },
    { id: 49, nombre: 1977 },
    { id: 50, nombre: 1976 },
    { id: 51, nombre: 1975 },
    { id: 52, nombre: 1974 },
    { id: 53, nombre: 1973 },
    { id: 54, nombre: 1972 },
    { id: 55, nombre: 1971 },
    { id: 56, nombre: 1970 }];
    const [validarAño, setValidarAño] = useState(false)
  const [añoEscogido, setAñoEscogido] = useState('ninguno');
  const [agencia, setAgencia] = useState('');
  const [validarAgencia, setValidarAgencia] = useState(false);
  const [capacidad, setCapacidad] = useState(0);
  const [validarCapacidad, setValidarCapacidad] = useState(false);
  const entidad = [{ id: 1, nombre: "Aguascalientes" },
    { id: 2, nombre: "Baja California" },
    { id: 3, nombre: "Baja California Sur" },
    { id: 4, nombre: "Campeche" },
    { id: 5, nombre: "Chiapas" },
    { id: 6, nombre: "Chihuahua" },
    { id: 7, nombre: "Ciudad de México" },
    { id: 8, nombre: "Coahuila" },
    { id: 9, nombre: "Colima" },
    { id: 10, nombre: "Durango" },
    { id: 11, nombre: "Guanajuato" },
    { id: 12, nombre: "Guerrero" },
    { id: 13, nombre: "Hidalgo" },
    { id: 14, nombre: "Jalisco" },
    { id: 15, nombre: "México" },
    { id: 16, nombre: "Michoacán" },
    { id: 17, nombre: "Morelos" },
    { id: 18, nombre: "Nayarit" },
    { id: 19, nombre: "Nuevo León" },
    { id: 20, nombre: "Oaxaca" },
    { id: 21, nombre: "Puebla" },
    { id: 22, nombre: "Querétaro" },
    { id: 23, nombre: "Quintana Roo" },
    { id: 24, nombre: "San Luis Potosí" },
    { id: 25, nombre: "Sinaloa" },
    { id: 26, nombre: "Sonora" },
    { id: 27, nombre: "Tabasco" },
    { id: 28, nombre: "Tamaulipas" },
    { id: 29, nombre: "Tlaxcala" },
    { id: 30, nombre: "Veracruz" },
    { id: 31, nombre: "Yucatán" },
    { id: 32, nombre: "Zacatecas" }]
  const [entidadEscogida, setEntidadEscogida] = useState('ninguno');
  const [validarEntidad, setValidarEntidad] = useState(false)
  const [placa, setPlaca] = useState('');
  const [validarPlaca, setValidarPlaca] = useState(false);
  const [propietario, setPropietario] = useState('');
  const [validarPropietario, setValidarPropietario] = useState(false);
  const estado = [{id: 1, nombre: 'Optimo'}, {id: 2,nombre: 'Revisión'}, {id: 3, nombre: 'Fuera de Servicio'}];
  const [validarEstado, setValidarEstado] = useState(false)
  const [estadoEscogido, setEstadoEscogido] = useState('ninguno');
  const [observaciones, setObservaciones] = useState('Sin Observaciones');
  const [referendo, setReferendo] = useState(0);
  const [validarReferendo, setValidarReferendo] = useState(false);
  const [imagen, setImagen] = useState('');
  const [validarImagen, setValidarImagen] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (session.user.role !== 'Administrador') {
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const handlePressAceptar = () => {
    const data = {
      ve_marca: marca,
      ve_modelo : modelo,
      ve_ano: añoEscogido,
      ve_agencia: agencia,
      ve_capacidad: capacidad,
      ve_entidad: entidadEscogida,
      ve_placas: placa,
      ve_propietario: propietario,
      ve_estatus_gen: estadoEscogido,
      ve_observaciones: observaciones,
      ve_referendo: referendo,
      ve_imagen: imagen
    }
    console.log(data)
    fetch('/api/vehiculos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      console.log(error.message)
    })
    router.push('/vehiculos')
  }
  const handlePressValidar = () => {
    if(marca == ''){
      setValidarMarca(true);
    }
    if(modelo == '') {
      setValidarModelo(true);
    }
    if(añoEscogido == 'ninguno') {
      setValidarAño(true);
    }
    if(agencia == '') {
      setValidarAgencia(true)
    }
    if(capacidad <= 0) {
      setValidarCapacidad(true)
    }
    if(entidadEscogida == 'ninguno') {
      setValidarEntidad(true)
    }
    if(placa == '') {
      setValidarPlaca(true);
    }
    if(propietario == '') {
      setValidarPropietario(true);
    }
    if(estadoEscogido == 'ninguno') {
      setValidarEstado(true);
    }
    if(referendo <= 0) {
      setValidarReferendo(true);
    }
    if(imagen == '') {
      setValidarImagen(true);
    }
    else if(validarMarca == false && validarModelo == false && validarAño == false && validarAgencia == false && validarCapacidad == false && validarEntidad == false && validarPlaca == false && validarPropietario == false && validarEstado == false && validarReferendo == false && validarImagen == false) {
      setValidarMarca(false)
      setValidarModelo(false)
      setValidarAño(false)
      setValidarAgencia(false)
      setValidarEntidad(false)
      setValidarCapacidad(false)
      setValidarPlaca(false)
      setValidarPropietario(false)
      setValidarEstado(false)
      setValidarReferendo(false)
      setValidarImagen(false)
      setShowModal(true);
    }
  }

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/vehiculos" className={styles.link}>
            Vehiculos
          </Link>{" "}
          \ Nuevo
        </h4>
      </div>
      <div className={styles.formulario}>
        <Input placeholder={'Marca'} value={marca} onChange={(marca) => {setMarca(marca)}} validation={validarMarca} type={'text'}/>
        <Input placeholder={'Modelo'} value={modelo} onChange={(modelo) => {setModelo(modelo)}} validation={validarModelo} type={'text'}/>
        <div className={styles.select}>
          <Select data={año} text={'Año: '} onSelect={(data) => {setAñoEscogido(data)}} validar={validarAño}/>
        </div>
        <Input placeholder={'Agencia'} value={agencia} onChange={(agencia) => {setAgencia(agencia)}} validation={validarAgencia} type={'text'}/>
        <Input placeholder={'Capacidad en Kg'} value={capacidad} onChange={(capacidad) => {setCapacidad(capacidad)}} validation={validarCapacidad} type={'number'}/>
        <div className={styles.select}>
          <Select data={entidad} text={'Entidad: '} onSelect={(data) => {setEntidadEscogida(data)}} validar={validarEntidad}/>
        </div>
        <Input placeholder={'Número de Placa'} value={placa} onChange={(placa) => {setPlaca(placa)}} validation={validarPlaca} type={'text'}/>
        <Input placeholder={'Nombre del Propietario'} value={propietario} onChange={(propietario) => {setPropietario(propietario)}} validation={validarPropietario} type={'text'}/>
        <div className={styles.select}>
          <Select data={estado} text={'Estado General: '} onSelect={(data) => {setEstadoEscogido(data)}} validar={validarEstado}/>
        </div>
        <Input placeholder={'Referendo'} value={referendo} onChange={(referendo) => {setReferendo(referendo)}} validation={validarReferendo} type={'number'}/>
        <Input placeholder={'Imagen'} value={imagen} onChange={(img) => {setImagen(img)}} validation={validarImagen} type={'text'}/>
        <div className={styles.botones}>
          <Button text={'Aceptar'} type={'aceptar'} onPress={handlePressValidar}/>
        </div>
      </div>
      <Modal title={'Agregar Vehiculo'} message={'¿Quieres agregar el nuevo vehiculo con los datos proporcionados?'} show={showModal} handleClose={() => {setShowModal(false)}} handleAccept={handlePressAceptar}/>
    </div>
  )
}

export default NuevoVehiculo