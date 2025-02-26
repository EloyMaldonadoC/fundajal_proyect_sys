import { formatNumber, getDayOfWeek } from '@/functions/utilsFormat'
import styles from './module/CardPago.module.css'

function CardPago({pago}) {
  return (
    <div className={styles.container}>
        <p>Pago realizado el día <b>{getDayOfWeek(pago.pag_fecha_transac)}</b></p>
        <p>Monto: <b>{formatNumber(pago.pag_monto)}</b></p>
        <p>Método de pago: <b>{pago.pag_metodo}</b></p>
        <p>Descripción del pago: {pago.pag_desc}</p>
    </div>
  )
}

export default CardPago