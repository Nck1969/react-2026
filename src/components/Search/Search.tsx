import { useState, useEffect } from 'react';
import styles from './Search.module.css';

interface Props {
  initialTerm: string;
  onSearch: (term: string) => void;
}

export default function Search({ initialTerm, onSearch }: Props) {
  const [value, setValue] = useState(initialTerm);

  useEffect(() => {
    setValue(initialTerm);
  }, [initialTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(value);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search pokemon..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => onSearch(value)}>Search</button>
    </div>
  );
}
