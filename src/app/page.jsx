"use client"
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const condicionCumplida = true;

  if (!condicionCumplida) {
    router.push('/iniciar-sesion');
  }

  return (
      <main>
      </main>
  );
}
