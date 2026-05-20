import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetailsPanel from './DetailsPanel';
import type { PokemonDetails } from '../../types/pokemon';

vi.mock('../../api/pokeApi', () => ({
  fetchPokemonById: vi.fn(),
  fetchPokemons: vi.fn(),
}));

import { fetchPokemonById } from '../../api/pokeApi';

const mockFetchById = vi.mocked(fetchPokemonById);

const mockDetails: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  sprite: 'https://example.com/pikachu.png',
  types: ['electric'],
  height: 4,
  weight: 60,
  abilities: ['static', 'lightning-rod'],
};

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
    mockFetchById.mockClear();
    mockFetchById.mockResolvedValue(mockDetails);
  });

  it('shows loader while fetching', () => {
    mockFetchById.mockReturnValue(new Promise(() => {}));
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
      expect(screen.getByText('electric')).toBeInTheDocument()
    );
  });

  it('displays sprite image', async () => {
    renderDetails();
    await waitFor(() =>
      expect(screen.getByRole('img', { name: /pikachu/i })).toBeInTheDocument()
    );
  });

  it('shows error message when fetch fails', async () => {
    mockFetchById.mockRejectedValue(new Error('Pokemon not found'));
    renderDetails('9999');
    await waitFor(() =>
      expect(screen.getByText('Pokemon not found')).toBeInTheDocument()
    );
  });

  it('navigates to home on close button click', async () => {
    const user = userEvent.setup();
    renderDetails('25', '2');
    await waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: /close details/i }));
    await waitFor(() =>
      expect(screen.getByText('Home')).toBeInTheDocument()
    );
  });
});
