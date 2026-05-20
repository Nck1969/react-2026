import type { PokemonView } from '../../types/pokemon';
import CardList from './CardList';
import styles from './Results.module.css';

interface Props {
  items: PokemonView[];
}

export default function Results({ items }: Props) {
  return (
    <section className={styles.section}>
      <CardList items={items} />
    </section>
  );
}
