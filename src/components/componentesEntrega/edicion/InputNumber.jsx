import { useState, useEffect } from "react";
import styles from "./module/InputNumber.module.css";

function InputNumber({ onChange, inicialiced, id }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inicialiced) {
      for (let i = 0; i < inicialiced.length; i++) {
        if (inicialiced[i].produc_id == id || inicialiced[i].pa_id == id) {
          setValue(
            inicialiced[i].produc_id == id
              ? inicialiced[i].en_produc_cantidad
              : inicialiced[i].en_pa_cantidad
          );
          return;
        } else {
          setValue(0);
        }
      }
    }
  }, [inicialiced, id]);

  const handleOnChange = () => {
    const selected = event.target.value;
    setValue(selected);
    onChange(selected);
  };

  return (
    <input
      className={styles.input}
      type="number"
      min={0}
      value={value}
      onChange={handleOnChange}
    />
  );
}

export default InputNumber;
