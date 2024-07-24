import styles from './BannerDiario.module.css';

export default function BannerDiario({ dia, mes, año }) {

  const fecha = {dia: dia, mes: mes, año: año}

  return (
    <div className={styles['banner-container']}>{`${fecha.dia} ${fecha.mes} de ${fecha.año}`}</div>
  )
}
