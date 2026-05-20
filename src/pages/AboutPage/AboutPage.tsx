import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.author}>
        Author: <strong>Mikita Kern</strong>
      </p>
      <p className={styles.description}>
        A Pokémon search app built as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          RS School React Course
        </a>
        .
      </p>
      <Link to="/" className={styles.back}>
        ← Back to search
      </Link>
    </div>
  );
}
