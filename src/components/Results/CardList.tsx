import type { PokeApiListItem } from '../../types/pokemon';
import Card from './Card';
import styles from './Results.module.css';

interface Props {
  items: PokeApiListItem[];
  onCardClick?: (id: number) => void;
}

export default function CardList({ items, onCardClick }: Props) {
  if (items.length === 0) {
    return <p className={styles.empty}>Nothing found</p>;
  }

  return (
    <div className={styles.list}>
      {items.map((p) => (
        <Card key={p.name} name={p.name} onCardClick={onCardClick} />
      ))}
    </div>
  );
}
