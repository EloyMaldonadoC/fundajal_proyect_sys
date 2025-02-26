import React from "react";
import styles from "./module/Info.module.css";
import { Button } from "./InputComponents";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/functions/utilsFormat";

function Info({ proveedor }) {

  const router = useRouter();

  const handlePressEditarProduc = (id) => {
    router.push(`/inventario/editar/producto?id=${id}`)
  }
  const handlePressEditarProv = (id) => {
    router.push(`/inventario/editar/proveedor?id=${id}`)
  }

  return (
    <>
      {proveedor ? (
        <div className={styles.info}>
          <h3>Producto</h3>
          <p><span>Porducto: </span><span className={styles.text}>{proveedor.produc_nombre}</span></p>
          <p><span>Existencias: </span><span className={styles.text}>{proveedor.produc_existencias}</span></p>
          <p><span>Precio de Venta: </span><span className={styles.text}>{formatNumber(proveedor.produc_precio_venta)}</span></p>
          <h3>Proveedor</h3>
          <p><span>Proveedor: </span><span className={styles.text}>{proveedor.prov_nombre}</span></p>
          <p><span>Teléfono: </span><span className={styles.text}>{proveedor.prov_numero_cont}</span></p>
          <p><span>Dirección: </span><span className={styles.text}>{proveedor.prov_direccion}, {proveedor.prov_municipio}, {proveedor.prov_estado}.</span></p>
          <p><span>RFC: </span><span className={styles.text}>{proveedor.prov_rfc}</span></p>
          <div className={styles.botones}>
            <Button text={'Editar Producto'} type={'cancelar'} onPress={() => {handlePressEditarProduc(proveedor.produc_id)}}/>
            <Button text={'Editar Proveedor'} type={'cancelar'} onPress={() => {handlePressEditarProv(proveedor.prov_id)}}/>
          </div>
        </div>
      ) : (
        <div className={styles.info}>Seleccionar para mostrar información</div>
      )}
    </>
  );
}

export default Info;
