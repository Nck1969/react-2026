import styles from './ClearCacheButton.module.css';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '../../store/pokemonApi.ts';

export default function ClearCacheButton() {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.button}
      onClick={() => dispatch(pokemonApi.util.invalidateTags(['PokemonTag']))}
    >
      Clear cache
    </button>
  );
}
