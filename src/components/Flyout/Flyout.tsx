import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllPokemons,
  selectedPokemonsArraySelector,
} from '../../store/selectedPokemonsSlice.ts';
import classes from './Flyout.module.css';
import downloadCsv from '../../utils/downloadCsv.ts';

const Flyout = memo(() => {
  const selectedPokemons = useSelector(selectedPokemonsArraySelector);
  const dispatch = useDispatch();

  const handleUnselectAllClick = () => {
    dispatch(clearAllPokemons());
  };

  const handleDownloadCsvClick = () => {
    downloadCsv(selectedPokemons);
  };

  return (
    <div className={classes.wrapper}>
      <span>{`Selected pokemons count: ${selectedPokemons.length}`}</span>

      <button onClick={handleDownloadCsvClick}>Download CSV</button>

      <button onClick={handleUnselectAllClick}>Unselect All</button>
    </div>
  );
});
Flyout.displayName = 'Flyout';

export { Flyout };
