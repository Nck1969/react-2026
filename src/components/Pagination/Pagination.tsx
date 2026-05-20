import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <button
        className={styles.btn}
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.btn} ${p === currentPage ? styles.active : ''}`}
          onClick={() => onChange(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.btn}
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
