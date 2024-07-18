export const metadata = {
    title: "Iniciar Sesión"
};

import LoginForm from "@/components/LoginForm";
import styles from "./page.module.css"

export default function page() {
  return (
    <div className={styles.main_container}>
        <div className={styles.container}>
          <h2>Inicia sesión para poder acceder</h2>
          <LoginForm/>
        </div>
      </div>
  )
}
