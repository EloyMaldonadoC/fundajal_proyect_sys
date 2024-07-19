"use client"
import { Inter } from "next/font/google";
import { usePathname,useRouter } from "next/navigation";
import IonIcon from "@reacticons/ionicons";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <html lang="en">
      {!pathname.includes("/iniciar-sesion") && (
        <title>Fundación Jalisco</title>
      )}
        <body className={inter.className}>
          {pathname.includes("/iniciar-sesion") ? (
            <main>{ children }</main>
          ) : (
            <>
              <div className="container">
                <div className="menu">
                  <button className="logo" onClick={ handleButtonClick }>Fundación Jalisco</button>
                  <nav className="navigation">
                    <ul>
                      <li><button onClick={() => { router.push('/entregas') }}><IonIcon name="calendar" size="medium"/><p>Entregas</p></button></li>
                      <li><button onClick={() => { router.push('/inventario') }}><IonIcon name="server" size="medium"/><p>Inventario</p></button></li>
                      <li><button onClick={() => { router.push('/vehiculos') }}><IonIcon name="car" size="medium"/><p>Vehiculos</p></button></li>
                      <li><button onClick={() => { router.push('/empleados') }}><IonIcon name="person" size="medium"/><p>Empleados</p></button></li>
                      <li><button onClick={() => { router.push('/historial') }}><IonIcon name="stats-chart" size="medium"/><p>Historial</p></button></li>
                    </ul>
                  </nav>
                </div>
                <main className="content">{ children }</main>
              </div>
            </>
          )}
        </body>
    </html>
  );
}
