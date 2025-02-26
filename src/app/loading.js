import LoadingScreen from "@/components/LoadingScreen"
import styles from './loading.module.css'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className={styles.container}>
        <LoadingScreen />
      </div>
    )
  }