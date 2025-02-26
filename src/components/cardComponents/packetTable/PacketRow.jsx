"use client";
import { useState } from "react";
import styles from "./module/PacketRow.module.css";
import { Button } from "../../input/InputComponents";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/functions/utilsFormat";

function PacketRow({ packet }) {

  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState(false);
  const [productos, setProductos] = useState(null);

  const isSelectThisRow = (id) => {
    setSelectedRow(!selectedRow);
    if (!productos || productos == "") {
      fetch(`/api/paquetes/productos/${id}`)
        .then((response) => {
          if (!response.ok) {
            return;
          }
          return response.json();
        })
        .then((data) => {
          setProductos(data);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  const handlePressEdit = (id) => {
    router.push(`/paquetes/editar?id=${id}`)
  }

  return (
    <div className={`${styles.contenedor} ${selectedRow && styles.levantado}`}>
      <div
        className={styles.fila}
        onClick={() => {
          isSelectThisRow(packet.pa_id);
        }}
      >
        <p className={styles.celda}>{packet.pa_nombre}</p>
        <p className={styles.celda}>{packet.pa_descripcion}</p>
        <p className={styles.celda}>{formatNumber(packet.pa_precio)}</p>
        <p className={styles.celda}>{formatNumber(packet.pa_comision)}</p>
      </div>
      {selectedRow && (
        <div className={styles.informacion}>
          <div className={styles.productos}>
            <div className={styles.encabezado}>
              <h4 className={styles.item}>Nombre</h4>
              <h4 className={styles.item}>Cantidad</h4>
              <h4 className={styles.item}>Precio</h4>
            </div>
            {productos && (
              <>
                {productos.map((producto) => (
                <div className={styles.contenido} key={producto.produc_id}>
                  <p className={styles.item}>{producto.produc_nombre}</p>
                  <p className={styles.item}>{producto.produc_pa_cantidad}</p>
                  <p className={styles.item}>${producto.produc_precio_venta}</p>
                </div>
              ))}
              </>
            )}
            <div className={styles.piedepagina} />
          </div>
          <div className={styles.opciones}>
            <Button text={"Editar"} type={"aceptar"} onPress={() => {handlePressEdit(packet.pa_id)}}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default PacketRow;
