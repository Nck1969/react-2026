import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DetailsPanel from './DetailsPanel';
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

function renderDetails(id = '25', page = '1') {
  return render(
    <MemoryRouter initialEntries={[`/details/${id}?page=${page}`]}>
      <Routes>
        <Route path="/details/:id" element={<DetailsPanel />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('DetailsPanel', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: PIKACHU,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
  });

  it('shows loader while fetching', () => {
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    renderDetails();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays pokemon name after loading', async () => {
    renderDetails();

    await waitFor(() =>
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    );
  });

  it('displays pokemon types', async () => {
    renderDetails();

    await waitFor(() =>
      expect(screen.getByText('Electric')).toBeInTheDocument()
    );
  });

  it('displays sprite image', async () => {
    renderDetails();

    await waitFor(() =>
      expect(screen.getByRole('img', { name: /pikachu/i })).toBeInTheDocument()
    );
  });

  it('shows error message when fetch fails', async () => {
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: {
        status: 404,
        data: 'Not found',
      },
      refetch: vi.fn(),
    });
    renderDetails('9999');

    await waitFor(() =>
      expect(screen.getByText('Not found')).toBeInTheDocument()
    );
  });

  it('navigates to home on close button click', async () => {
    const user = userEvent.setup();
    renderDetails('25', '2');

    await waitFor(() =>
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    );

    await user.click(screen.getByRole('button', { name: /close details/i }));
    await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());
  });
});
