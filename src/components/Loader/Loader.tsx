import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.spinner} />
    </div>
  );
}
