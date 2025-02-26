"use client";
import styles from "./page.module.css";
import { Button } from "@/components/input/InputComponents";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/iniciar-sesion'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Evita el parpadeo de contenido antes de la redirección
  }

  return (
    <main className={styles.contenedor}>
      <Button text={"Cerrar sesión"} onPress={() => signOut()} />
    </main>
  );
}
