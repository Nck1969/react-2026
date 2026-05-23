import type { PokemonMinimalDetails } from '../../types/pokemon';
import CardList from './CardList';
import styles from './Results.module.css';

interface Props {
  items: PokemonMinimalDetails[];
  onCardClick?: (id: number) => void;
}

export default function Results({ items, onCardClick }: Props) {
  return (
    <section className={styles.section}>
      <CardList items={items} onCardClick={onCardClick} />
    </section>
  );
}
