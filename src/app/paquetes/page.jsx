"use client"
import { useState, useEffect, use } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PacketTable from "@/components/cardComponents/packetTable/PacketTable";
import { Search, Button } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";

function Paquetes() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    if (session.user.role == 'Administrador' || session.user.role == 'Oficina') {
    } else {
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
 
  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/paquetes" className={styles.link}>
            Paquetes
          </Link>{" "}
          \{" "}
        </h4>
      </div>
      <div className={styles.contenido}>
        <div className={styles.herramientas}>
          <Search placeholder={'Buscar paquete'} onSearch={(data) => {setBuscar(data)}}/>
          <Button text={'Nuevo'} type={'cancelar'} onPress={() => {router.push('/paquetes/nuevo')}}/>
        </div>
        <PacketTable buscar={buscar}/>
      </div>
    </div>
  );
}
 
export default Paquetes;
