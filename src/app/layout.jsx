"use client"
import { Inter } from "next/font/google";
import { usePathname,useRouter } from "next/navigation";
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
                      <li><a href="/entregas">Entregas</a></li>
                      <li><a href="/inventario">Inventario</a></li>
                      <li><a href="/vehiculos">Vehiculos</a></li>
                      <li><a href="/empleados">Empleados</a></li>
                      <li><a href="/historial">Historial</a></li>
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
