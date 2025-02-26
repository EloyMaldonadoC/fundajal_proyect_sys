import React, {useState} from "react";
import styles from './module/Select.module.css'

function Select({text, data, onSelect, validar}) {

  const [value, setValue] = useState('');

  const onChangeSelect = () => {
    const selected = event.target.value;
    setValue(selected);
    onSelect(selected);
  }

  return (
    <div className={styles.container}>
      <label className={`${validar ? styles.validarTexto : ''}`}>{text}</label>
      <select
        className={`${styles.select} ${validar ? styles.validar : ''}`}
        value={value}
        onChange={onChangeSelect}
      >
        <option value="ninguno">--Ninguno--</option>
        {data.map((item) => (
          <option key={item.id} value={item.nombre}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
