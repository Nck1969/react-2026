import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from './CardList';
import {
  BULBASAUR,
  CHARMANDER,
  MEWTWO,
  PIKACHU,
  SQUIRTLE,
} from '../../constants/testPokemons.ts';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import type { PokemonMinimalDetails } from '../../types/pokemon.ts';

const renderTestComponent = (items: PokemonMinimalDetails[] = []) =>
  render(
    <Provider store={store}>
      <CardList items={items} />
    </Provider>
  );

describe('CardList', () => {
  it('shows "Nothing found" when items array is empty', () => {
    renderTestComponent();
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders a card for each item', () => {
    renderTestComponent([BULBASAUR, CHARMANDER, SQUIRTLE]);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    renderTestComponent([PIKACHU, MEWTWO]);
    expect(screen.getAllByText(/electric|psychic/i)).toHaveLength(2);
  });
});
