import type { PokemonView } from '../../types/pokemon';
import styles from './Results.module.css';

interface Props {
  pokemon: PokemonView;
  onCardClick?: (id: number) => void;
}

export default function Card({ pokemon, onCardClick }: Props) {
  return (
    <div
      className={styles.card}
      onClick={() => onCardClick?.(pokemon.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick?.(pokemon.id)}
    >
      <span className={styles.cardName}>{pokemon.name}</span>
      <span className={styles.cardDesc}>{pokemon.description}</span>
    </div>
  );
}
