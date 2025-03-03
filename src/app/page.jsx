"use client"
import IonIcon from "@reacticons/ionicons";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Loading from "./loading";
import styles from "./page.module.css";
import { Button } from "@/components/input/InputComponents";


export default function Home({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/iniciar-sesion'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  }, [status, router]);

  const handleButtonClick = () => {
    router.push('/');
  };

  if (status === 'loading') {
    return <Loading/>;
  }

  if (!session && !pathname.includes("/iniciar-sesion")) {
    return null; // Evita el parpadeo de contenido antes de la redirección
  }

  return (
      <main>
        {pathname.includes("/iniciar-sesion") ? (
            <main>{ children }</main>
          ) : (
            <>
              <div className="container">
                <div className="menu">
                  <button className="logo" onClick={ handleButtonClick }>Fundación Jalisco</button>
                  <nav className="navigation">
                    <ul>
                      {(session.user.role === 'Administrador' || session.user.role === 'Encargado') && (
                        <li><button onClick={() => { router.push('/entregas') }}><p>Entregas</p><IonIcon name="calendar" size="medium"/></button></li>
                      )}
                      {(session.user.role === 'Administrador' || session.user.role === 'Oficina') && (
                        <li><button onClick={() => { router.push('/inventario') }}><p>Inventario</p><IonIcon name="server" size="medium"/></button></li>
                      )}
                      {(session.user.role === 'Administrador' || session.user.role === 'Oficina') && (
                        <li><button onClick={() => { router.push('/paquetes') }}><p>Paquetes</p><IonIcon name="cube" size="medium"/></button></li>
                      )}
                      {(session.user.role === 'Administrador' || session.user.role === 'Oficina') && (
                        <li><button onClick={() => { router.push('/vehiculos') }}><p>Vehiculos</p><IonIcon name="car" size="medium"/></button></li>
                      )}
                      {(session.user.role === 'Administrador' || session.user.role === 'Oficina') && (
                        <li><button onClick={() => { router.push('/empleados') }}><p>Empleados</p><IonIcon name="person" size="medium"/></button></li>
                      )}
                      {(session.user.role === 'Administrador' || session.user.role === 'Oficina') && (
                        <li><button onClick={() => { router.push('/historial') }}><p>Historial</p><IonIcon name="stats-chart" size="medium"/></button></li>
                      )}
                    </ul>
                  </nav>
                    <div className={`${styles.userUI} ${isOpen ? styles.expand : styles.collapse}`} onClick={() => { setIsOpen(!isOpen); console.log(isOpen) }}>
                      <div className={styles.user}>
                        <div className={styles.username}>{session.user.name}</div>
                        <div className={styles.icon}><IonIcon name="person-circle-outline"/></div>
                      </div>
                      {isOpen && (
                        <Button text={"Cerrar Sesión"} onPress={() => {signOut()}}/>
                      )}
                    </div>
                </div>
                <main className="content">{ children }</main>
              </div>
            </>
          )}
      </main>
  );
}
