import styles from './ErrorMessage.module.css';

interface Props {
  text: string;
}

export default function ErrorMessage({ text }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>⚠</span>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
