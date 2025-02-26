"use client"
import React, {useState} from "react";

function PruebaEntrada({ onChange, isEnable }) {
  const [id, setId] = useState('');
  const [enable, setEnable] = useState(null)

  console.log(isEnable)

  const handleChange = () => {
    const newValue = event.target.value;
    setId(newValue);
    onChange(newValue)
  }

  return (<>{isEnable && (<input value={id} placeholder="escribe el id" onChange={handleChange}/>)}</>);
}

export default PruebaEntrada;
