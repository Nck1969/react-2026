import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { Flyout } from './Flyout.tsx';
import { describe, expect, it } from 'vitest';
import {
  addPokemon,
  clearAllPokemons,
} from '../../store/selectedPokemonsSlice.ts';
import downloadCsv from '../../utils/downloadCsv.ts';
import {
  BULBASAUR,
  CHARMANDER,
  PIKACHU,
} from '../../constants/testPokemons.ts';

vi.mock('../../utils/downloadCsv.ts', () => ({
  default: vi.fn(),
}));

const renderTestComponent = () =>
  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

describe('Card Component', () => {
  beforeEach(() => {
    store.dispatch(clearAllPokemons());
  });

  it('should display selected pokemons count', () => {
    store.dispatch(addPokemon(BULBASAUR));
    store.dispatch(addPokemon(PIKACHU));
    store.dispatch(addPokemon(CHARMANDER));

    renderTestComponent();

    expect(screen.getByText('Selected pokemons count: 3')).toBeInTheDocument();
  });

  it('should "Unselect All" button dispatch "clearAll" action', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderTestComponent();

    act(() => screen.getByText('Unselect All').click());

    expect(dispatchSpy).toHaveBeenCalledWith(clearAllPokemons());
  });

  it('should "Download CSV" button call downloadCsv util ', () => {
    store.dispatch(addPokemon(BULBASAUR));
    renderTestComponent();

    act(() => screen.getByText('Download CSV').click());

    expect(downloadCsv).toHaveBeenCalledWith([BULBASAUR]);
  });
});
