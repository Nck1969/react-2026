import type { PokemonView } from '../../types/pokemon';
import styles from './Results.module.css';

interface Props {
  pokemon: PokemonView;
}

export default function Card({ pokemon }: Props) {
  return (
    <div className={styles.card}>
      <span className={styles.cardName}>{pokemon.name}</span>
      <span className={styles.cardDesc}>{pokemon.description}</span>
    </div>
  );
}
