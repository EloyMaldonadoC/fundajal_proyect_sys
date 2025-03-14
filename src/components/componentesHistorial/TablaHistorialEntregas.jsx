import React from 'react';
import styles from './module/TablaHistorialEntregas.module.css';
import { formatNumber, getDayOfWeek } from '@/functions/utilsFormat';

function TablaHistorialEntregas({entregas}) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Historial de Entregas</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.municipio}>Municipio</h4>
        <h4 className={styles.entregado}>Entregado</h4>
        <h4 className={styles.estado}>Estado</h4>
        <h4 className={styles.monto}>Monto</h4>
        <h4 className={styles.pendiente}>Pago pendiente</h4>
        <h4 className={styles.comision}>Comisión Municipio</h4>
        <h4 className={styles.totalfunjal}>Total</h4>
      </div>
      {entregas ? (
        <>
          {entregas.map((entrega, index) => (
            <div key={index} className={styles.container}>
              <div className={styles.municipio}>{entrega.cli_municipio}, {entrega.cli_estado}</div>
              <div className={styles.entregado}>{getDayOfWeek(entrega.en_dia_entrega)}</div>
              <div className={styles.estado}>{entrega.deu_estado}</div>
              <div className={styles.monto}>{formatNumber(entrega.deu_deuda)}</div>
              <div className={styles.pendiente}>{formatNumber(entrega.deu_deuda_pendiente)}</div>
              <div className={styles.comision}>{formatNumber(entrega.deu_comision_enlace)}</div>
              <div className={styles.totalfunjal}>{formatNumber(entrega.deu_deuda - entrega.deu_comision_enlace)}</div>
            </div>
          ))}
        </>
      ) : (
        <div className={styles.container}>Auno no hay datos</div>
      )}
      <div className={styles.fooder}/>
    </div>
  )
}

export default TablaHistorialEntregas