import React, {useState, useEffect} from "react";
import LoadingScreen from "./LoadingScreen";
import style from './module/NuevoProducto.module.css'

function NuevoProducto({ produc_id}) {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/inventario/productos/${produc_id}`).then((respose) => {
      if(!respose.ok) {
        throw new Error('Network response was not ok')
      }
      return respose.json();
    }).then((data) => {
      setData(data);
      setLoading(false);
      console.log(data)
    }).catch((error) => {
      setError(false);
      setLoading(false);
    });
  },[produc_id])

  if (loading) return <LoadingScreen/>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" name="nombre" placeholder="Nombre"/>
      <label htmlFor="precioCompra">Precio de compra:</label>
      <input type="number" name="precioCompra" placeholder="Precio de compra"/>
      <label htmlFor="precioVenta">Precio de venta:</label>
      <input type="number" name="precioVenta" placeholder="Precio de venta"/>
      <label htmlFor="participacion">Participación:</label>
      <input type="number" name="participacion" placeholder="Participación"/>
      <label htmlFor="cantidadSuministro">Cantidad suministrada:</label>
      <input type="number" name="cantidadSuministro" placeholder="Cantidad suministrada"/>
    </div>
  );
}

export default NuevoProducto;