import styles from "./module/FormProveedores.module.css";

function FormProveedores() {
  return (
    <form className={styles.container}>
      <h3 className={styles.title}>Agregar un Nuevo Proveedor</h3>
      <label htmlFor="name">Nombre del Proveedor: </label>
      <input type="text" placeholder="Nombre del Proveedor" className={styles.input} />

      <label htmlFor="name" className={styles.text}>Dirección: </label>
      <input type="text" placeholder="Dirección" className={styles.input}/>

      <label htmlFor="name" className={styles.text}>Número de Contacto: </label>
      <input type="text" placeholder="Número de Contacto" className={styles.input}/>

      <label htmlFor="name" className={styles.text}>Municipio: </label>
      <input type="text" placeholder="Municipio" className={styles.input}/>

      <label htmlFor="name" className={styles.text}>Estado: </label>
      <input type="text" placeholder="Estado" className={styles.input}/>

      <label htmlFor="name" className={styles.text}>RFC: </label>
      <input type="text" placeholder="RFC" className={styles.input}/>
    </form>
  );
}

export default FormProveedores;
