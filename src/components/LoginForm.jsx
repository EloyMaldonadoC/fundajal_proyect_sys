import styles from "./LoginForm.module.css" 

export default function LoginForm() {
  return (
    <div className={styles.container}>
        <div className={styles.user}>
            <label className={styles.lbl_name}>Nombre de Usuario</label>
            <input className={styles.txt_name} type="text"/>
        </div>
        <div className={styles.password}>
            <label>Contraseña</label>
            <input className={styles.txt_password} type="password"/>
        </div>
        <button className={styles.btn_access}>Acceder</button>
    </div>
  )
}
