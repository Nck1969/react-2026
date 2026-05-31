import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CardList from './CardList';
import { PIKACHU } from '../../constants/testPokemons.ts';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import type { PokeApiListItem } from '../../types/pokemon.ts';
import { useGetPokemonByNameQuery } from '../../store/pokemonApi.ts';

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
      <CardList items={items} />
    </Provider>
  );

describe('CardList', () => {
  it('shows "Nothing found" when items array is empty', () => {
    renderTestComponent();

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: PIKACHU,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    renderTestComponent([
      { name: 'pikachu', url: 'pikachu.png' },
      { name: 'mewtwo', url: 'mewtwo.png' },
    ]);

    expect(screen.getAllByText(/electric|psychic/i)).toHaveLength(2);
  });
});
