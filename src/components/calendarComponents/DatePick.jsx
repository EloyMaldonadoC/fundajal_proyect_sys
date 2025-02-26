import styles from './module/DatePick.module.css';

function DatePick({ text, value, onChange, validation }) {

  const handleChange = (event) => {
    onChange(event.target.value);
  }

  return (
    <div className={`${styles.container} ${validation ? styles.validation : ''}`}>
      <label>{text}</label>
      <input className={`${styles.date} ${validation ? styles.validation : ''}`} type="date" value={value} onChange={handleChange}/>
    </div>
  );
}

export default DatePick;