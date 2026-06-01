import styles from './Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPokemon,
  isPokemonSelectedSelector,
  removePokemon,
} from '../../store/selectedPokemonsSlice.ts';
import type { RootState } from '../../store/store.ts';
import { useGetPokemonByNameQuery } from '../../store/pokemonApi.ts';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import { getErrorMessage } from '../../utils/getErrorMessage.ts';

interface Props {
  name: string;
  onCardClick?: (id: number) => void;
}

export default function Card({ name, onCardClick }: Props) {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetPokemonByNameQuery(name);

  const isSelected = useSelector((state: RootState) =>
    isPokemonSelectedSelector(state, data?.id)
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage text={getErrorMessage(error)} />
      ) : data ? (
        <div
          className={styles.card}
          onClick={() => onCardClick?.(data.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onCardClick?.(data.id)}
        >
          <span className={styles.cardName}>{data.name}</span>
          <span className={styles.cardDesc}>{data.types.join(', ')}</span>
          <input
            type={'checkbox'}
            className={styles.cardCheckbox}
            checked={isSelected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => {
              if (isSelected) {
                dispatch(removePokemon(data.id));
              } else {
                dispatch(addPokemon(data));
              }
            }}
          />
        </div>
      ) : null}
    </>
  );
}
