import { formatDay, getDayOfWeek } from '@/functions/utilsFormat';
import styles from './module/BannerDiario.module.css';

export default function BannerDiario({ fecha }) {

  return (
    <div className={styles['banner-container']}>{getDayOfWeek(fecha)}</div>
  )
}
