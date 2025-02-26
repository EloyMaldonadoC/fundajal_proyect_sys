import styles from "./module/InfoMunicipio.module.css";

function InfoMunicipio({ municipio }) {

  return (
    <div>
      <div className={styles.header}>
        <h3>Municipio</h3>
      </div>
      <div className={styles.container}>
        {municipio ? (
          <div>
            <p>
              <span>Municipio: </span>
              {municipio.cli_municipio}, {municipio.cli_estado}
            </p>
            <p>
              <span>Enlace: </span>
              {municipio.cli_nombre}
            </p>
            <p>
              <span>Contacto: </span>
              {municipio.cli_numero_contac}
            </p>
          </div>
        ) : (
          <div>
            <p>Cargando...</p>
          </div>
        )}
      </div>
      <div className={styles.fooder} />
    </div>
  );
}

export default InfoMunicipio;
