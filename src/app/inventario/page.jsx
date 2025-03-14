"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Table, Info, Search, Button } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";
import IonIcon from "@reacticons/ionicons";
import Loading from "../loading";

function Inventario() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [restart, setRestart] = useState(false);

  const [productos, setProductos] = useState([]);
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    if (session.user.role === "Administrador" || session.user.role === 'Oficina') {
      fetch(`/api/productos`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    }else {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart, router]);

  const handlePressSearch = (data) => {
    if(data == '') {
      return
    }
    fetch(`/api/inventario/busqueda/${data}`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);

        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  const handlePressSearchLaminas = () => {
    console.log('laminas')
    fetch(`/api/inventario/busqueda/lamina`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);

        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  const handlePressNew = () => {
    router.push('/inventario/nuevo');
  }

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorContent}>
          <IonIcon
            className={styles.textIcon}
            name="cloud-offline-outline"
          ></IonIcon>
          <p className={styles.textError}>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.navegacion}>
        <h4>
          <Link href="/inventario" className={styles.link}>
            Inventario
          </Link>{" "}
          \{" "}
        </h4>
      </div>
      <div className={styles.busqueda}>
        <Search placeholder={'Buscar Producto'} onSearch={(data) => {handlePressSearch(data)}}/>
        <Button text={'Laminas'} type={'cancelar'} onPress={handlePressSearchLaminas}/>
        <Button text={'Todos los productos'} type={'cancelar'} onPress={() => {setRestart(!restart)}}/>
        <Button text={'Nueva entrada'} type={'cancelar'} onPress={handlePressNew}/>
      </div>
      <div className={styles.container}>
        <Table productos={productos} />
      </div>
    </div>
  );
}

export default Inventario;
