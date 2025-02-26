import styles from "./module/TablaProveedores.module.css";

function TablaProveedores({ proveedores }) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Proveedores</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Nombre</h4>
        <h4 className={styles.telefono}>Telefono</h4>
        <h4 className={styles.direccion}>Dirección</h4>
        <h4 className={styles.rfc}>RFC</h4>
      </div>
      {proveedores.length != 0 && (
        <>
          {proveedores.map((proveedor, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.nombre}>{proveedor.prov_nombre}</div>
              <div className={styles.telefono}>{proveedor.prov_numero_cont}</div>
              <div className={styles.direccion}>{proveedor.prov_direccion}, {proveedor.prov_municipio}, {proveedor.prov_estado}</div>
              <div className={styles.rfc}>{proveedor.prov_rfc}</div>
            </div>
          ))}
        </>
      )}
      <div className={styles.fooder} />
    </div>
  );
}

export default TablaProveedores;
