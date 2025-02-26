"use client";
import styles from "./module/LoginForm.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setError("");

    const response = await signIn("credentials", {
      redirect: false,
      username: userInfo.username,
      password: userInfo.password,
    });
    console.log(response)
    if (response.error) {
      setError(response.error);
    } else {
      router.push("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!session ? (
        <form onSubmit={handleLogin} className={styles.container}>
          <div className={styles.user}>
            <label htmlFor="username">
              Nombre de Usuario:
            </label>
            <input
              className={styles.txt_name}
              type="text"
              id="username"
              name="username"
              value={userInfo.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Contraseña: </label>
            <input className={styles.txt_password} 
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleInputChange}
              required 
            />
          </div>
          <button className={styles.btn_access} type="submit">Acceder</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      ) : (
        <p>Ya has iniciado sesión</p>
      )}
    </div>
  );
}
