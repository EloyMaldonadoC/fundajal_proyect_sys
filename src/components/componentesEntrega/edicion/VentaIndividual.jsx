import { useState } from "react";
import { formatNumber } from "@/functions/utilsFormat";
import styles from "./module/VentaIndividual.module.css";
import { Button, Modal } from "@/components/input/InputComponents";

function Venta({ max, precio, vender }) {
  const [vistaVender, setVistaVender] = useState(false);
  const [cant, setCant] = useState(0);
  const [showModalVender, setShowModalVender] = useState(false);

  const vendido = () => {
    vender(cant);
    setCant(0);
    setVistaVender(false);
  };

  return (
    <div>
      {vistaVender ? (
        <div>
          <input
            className={styles.input}
            type="number"
            min={0}
            max={max}
            value={cant}
            onChange={(num) => {
              setCant(num.target.value);
            }}
          />
          <label>Total: {formatNumber(precio * cant)}</label>
          <Button
            text={"Aceptar"}
            type={"aceptar"}
            onPress={() => {
              setShowModalVender(true);
            }}
            disabled={cant == 0 ? true : false}
          />
          <Button
            text={"Cancelar"}
            type={"cancelar"}
            onPress={() => {
              setVistaVender(false);
            }}
          />
        </div>
      ) : (
        <Button
          text={"Vender"}
          onPress={() => {
            setVistaVender(true);
          }}
        />
      )}
      <Modal
        title={"Vender Producto"}
        message={"Al aceptar la acción no se podra deshacer, ¿vender producto?"}
        show={showModalVender}
        handleClose={() => setShowModalVender(false)}
        handleAccept={() => {setShowModalVender(false); vendido()}}
      />
    </div>
  );
}

function VentaIndividual({ listaDevueltos, vendidos }) {
  if (!listaDevueltos || listaDevueltos.length == 0)
    return <div>Aun no hay productos disponibles para venta individual</div>;
  if (listaDevueltos)
    return (
      <div>
        <div className={styles.header}>
          <h3>Vender Productos Individuales</h3>
        </div>
        <div className={styles.titulo}>
          <h4 className={styles.nombre}>Nombre</h4>
          <h4 className={styles.disponible}>Disponibles</h4>
          <h4 className={styles.precio}>Precio</h4>
          <h4 className={styles.vender}>Vender</h4>
        </div>
        {listaDevueltos.map((producto, index) => (
          <div className={styles.container} key={index}>
            <p className={styles.nombre}>{producto.produc_nombre}</p>
            <p className={styles.disponible}>{producto.en_es_produc_cant}</p>
            <p className={styles.precio}>
              {formatNumber(producto.produc_precio_venta)}
            </p>
            <div className={styles.vender}>
              <Venta
                max={producto.en_es_produc_cant}
                precio={producto.produc_precio_venta}
                vender={(cantidad) => vendidos(producto.produc_id, cantidad)}
              />
            </div>
          </div>
        ))}
        <div className={styles.fooder} />
      </div>
    );
}

export default VentaIndividual;
