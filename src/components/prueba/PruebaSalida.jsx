"use client"
import React, {useState, useEffect} from 'react'

function PruebaSalida({id, onChange}) {
  const [estado, setEstado] = useState(true);

  useEffect(() => {},[id, onChange])
  
  const handlePress = () => {
    setEstado(!estado);
    onChange(estado);
  }
  
  return (<button onClick={handlePress}>{id}</button>)
}
export default PruebaSalida