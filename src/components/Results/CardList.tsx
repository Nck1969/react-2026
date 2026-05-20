import type { PokemonView } from '../../types/pokemon';
import Card from './Card';
import styles from './Results.module.css';

interface Props {
  items: PokemonView[];
}

export default function CardList({ items }: Props) {
  if (items.length === 0) {
    return <p className={styles.empty}>Nothing found</p>;
  }
  return (
    <div className={styles.list}>
      {items.map((p) => (
        <Card key={p.name} pokemon={p} />
      ))}
    </div>
  );
}
