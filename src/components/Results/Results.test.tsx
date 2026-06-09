import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from './Results';
import type { PokemonMinimalDetails } from '../../types/pokemon.ts';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { PIKACHU } from '../../constants/testPokemons.ts';

const renderTestComponent = (items: PokemonMinimalDetails[] = []) =>
  render(
    <Provider store={store}>
      <Results items={items} />
    </Provider>
  );

describe('Results', () => {
  it('renders items passed as props', () => {
    renderTestComponent([PIKACHU]);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('shows "Nothing found" when items are empty', () => {
    renderTestComponent([]);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });
});
