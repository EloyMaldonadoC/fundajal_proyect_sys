"use client";
import { useState } from "react";
import styles from "./module/SearchMenu.module.css";
import { useRouter } from "next/navigation";

function SearchMenu({ onSelect }) {

  const router = useRouter();

  const [optionSelect, setOptionSelect] = useState('');
  const [busqueda, setBusqueda] = useState('');

	const changedOption = (event) => {
		const value = event.target.value;
		setOptionSelect(value);
		onSelect(value);
	}

  const handlePressNew = () =>{
    router.push('/inventario/nuevo');
  }
  const handlePressBuscar = () => {
		onSelect(busqueda);
    console.log(busqueda)
  }
  const handleChangeText = () => {
    setBusqueda(event.target.value)
  }

  return (
    <div className={styles.searchContainer}>
      <form>
        <label htmlFor="options">Filtrar por: </label>
        <select name="options" id="options" value={optionSelect} onChange={changedOption} className={styles.select}>
          <option value="productos">Todos los productos</option>
          <option value="laminas">Laminas</option>
        </select>
        <label >Buscar: </label>
        <input placeholder="Buscar" value={busqueda} className={styles.serch} onChange={handleChangeText}/>
				<button id="busqueda" className={styles.buttonSearch} onClick={handlePressBuscar}>Buscar</button>
      </form>
			<button className={styles.buttonNew} onClick={handlePressNew}>Nueva entrada</button>
    </div>
  );
}

export default SearchMenu;
