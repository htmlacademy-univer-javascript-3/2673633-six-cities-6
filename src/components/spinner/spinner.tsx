import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}
