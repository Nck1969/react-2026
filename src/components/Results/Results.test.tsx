import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Results from './Results';
import type { PokeApiListItem } from '../../types/pokemon.ts';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { useGetPokemonByNameQuery } from '../../store/pokemonApi.ts';
import { PIKACHU } from '../../constants/testPokemons.ts';

vi.mock('../../store/pokemonApi.ts', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../store/pokemonApi.ts')>();
  return {
    ...actual,
    useGetPokemonByNameQuery: vi.fn(),
  };
});

const renderTestComponent = (items: PokeApiListItem[] = []) =>
  render(
    <Provider store={store}>
      <Results items={items} />
    </Provider>
  );

describe('Results', () => {
  it('renders items passed as props', () => {
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: PIKACHU,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    renderTestComponent([
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/pokachu',
      },
    ]);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('shows "Nothing found" when items are empty', () => {
    renderTestComponent([]);

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });
});
