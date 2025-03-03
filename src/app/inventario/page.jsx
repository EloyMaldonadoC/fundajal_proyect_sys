"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import LoadingScreen from "@/components/LoadingScreen";
import { Table, Info, Search, Button } from "@/components/input/InputComponents";
import { useSession } from "next-auth/react";

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

        console.log(data);
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

  const handleClickRow = (id) => {
    console.log(id);
    fetch(`/api/inventario/productos/${id}`)
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Network response was not ok");
        }
        return respose.json();
      })
      .then((data) => {
        setProveedor(data[0]);
        setLoading(false);

        console.log(data[0]);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
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

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

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
        <div className={styles.tabla}>
          <Table
            productos={productos}
            onClickRow={(id) => {
              handleClickRow(id);
            }}
          />
        </div>
        <div className={styles.info}>
          <Info proveedor={proveedor} />
        </div>
      </div>
    </div>
  );
}

export default Inventario;
