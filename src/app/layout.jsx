"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [frame, setFrame] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFrame(true);
    }, 3000);
  });

  const pathname = usePathname();

  return (
    <html lang="en">
      {!pathname.includes("/iniciar-sesion") && (
        <title>Fundación Jalisco</title>
      )}
      {!frame ? (
        <body></body>
      ) : (
        <body className={inter.className}>
          {pathname.includes("/iniciar-sesion") ? (
            <main>{children}</main>
          ) : (
            <>
              <nav className="nav_bar">
                <div className="logo"></div>
                <div className="top_bar"></div>
              </nav>
              <div className="container">
                <nav className="lateral_bar"></nav>
                <main className="container_main">{children}</main>
              </div>
            </>
          )}
        </body>
      )}
    </html>
  );
}
