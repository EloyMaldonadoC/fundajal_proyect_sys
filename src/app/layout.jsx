"use client"
import { Inter } from "next/font/google";
import { usePathname,useRouter } from "next/navigation";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Home from "./page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, pageProps }) {

  const pathname = usePathname();
  const router = useRouter();

  return (
    <SessionProvider session={pageProps?.session}>
      <html lang="en">
      {!pathname.includes("/iniciar-sesion") && (
        <title>Fundación Jalisco</title>
      )}
        <body className={inter.className}>
          <Home>{children}</Home>
        </body>
    </html>
    </SessionProvider>
  );
}
