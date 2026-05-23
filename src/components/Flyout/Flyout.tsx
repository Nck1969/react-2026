import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { clearAllPokemons } from '../../store/selectedPokemonsSlice.ts';
import classes from './Flyout.module.css';

interface FlyoutProps {
  count: number;
}

const Flyout = memo<FlyoutProps>(({ count }) => {
  const dispatch = useDispatch();

  const handleUnselectAllClick = () => {
    dispatch(clearAllPokemons());
  };

  return (
    <div className={classes.wrapper}>
      <span>{`Selected pokemons count: ${count}`}</span>

      <button>Download CSV</button>

      <button onClick={handleUnselectAllClick}>Unselect All</button>
    </div>
  );
});
Flyout.displayName = 'Flyout';

export { Flyout };
