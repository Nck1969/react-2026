import type { PokemonMinimalDetails } from '../../types/pokemon';
import styles from './Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPokemon,
  removePokemon,
  isPokemonSelectedSelector,
} from '../../store/selectedPokemonsSlice.ts';
import type { RootState } from '../../store/store.ts';

interface Props {
  pokemon: PokemonMinimalDetails;
  onCardClick?: (id: number) => void;
}

export default function Card({ pokemon, onCardClick }: Props) {
  const dispatch = useDispatch();

  const isSelected = useSelector((state: RootState) =>
    isPokemonSelectedSelector(state, pokemon.id)
  );

  return (
    <div
      className={styles.card}
      onClick={() => onCardClick?.(pokemon.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick?.(pokemon.id)}
    >
      <span className={styles.cardName}>{pokemon.name}</span>
      <span className={styles.cardDesc}>{pokemon.types.join(', ')}</span>
      <input
        type={'checkbox'}
        className={styles.cardCheckbox}
        checked={isSelected}
        onClick={(e) => e.stopPropagation()}
        onChange={() => {
          if (isSelected) {
            dispatch(removePokemon(pokemon.id));
          } else {
            dispatch(addPokemon(pokemon));
          }
        }}
      />
    </div>
  );
}
