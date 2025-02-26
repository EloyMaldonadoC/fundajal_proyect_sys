import {useState, useEffect} from "react";
import styles from "./module/CheckBoxRecibir.module.css";

function CheckBoxRecibir({ value, onSelect, onUnselect, estado }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
      if(estado && estado == "recibido") {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }, [estado])
  
    const handleCheckBoxChange = (event) => {
      const newValue = event.target.value;
      
      if(!isChecked) {
        onSelect(newValue);
      } else {
        onUnselect(newValue);
      }
      setIsChecked(!isChecked);
    }
    return (
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          value={value}
          checked={isChecked}
          onChange={handleCheckBoxChange}
        />
      </div>
    )
}

export default CheckBoxRecibir