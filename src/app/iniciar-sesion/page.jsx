export const metadata = {
    title: "Iniciar Sesión"
};

import LoginForm from "@/components/LoginForm";
import styles from "./page.module.css"

export default function page() {
  return (
    <div className={styles.main_container}>
        <div className={styles.container}>
          <h2>Inicia Sesión para poder Acceder</h2>
          <LoginForm/>
        </div>
      </div>
  )
}
