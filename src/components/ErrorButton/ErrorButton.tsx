import { useState } from 'react';
import styles from './ErrorButton.module.css';

export default function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error triggered by ErrorButton');
  }

  return (
    <button className={styles.button} onClick={() => setShouldThrow(true)}>
      Throw error
    </button>
  );
}
