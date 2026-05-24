import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRoutes } from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { LS_KEY } from './constants/storage';
import type { FetchPokemonsResult } from './types/pokemon';
import { fetchPokemons } from './api/pokeApi';
import { BULBASAUR, CHARMANDER, PIKACHU } from './constants/testPokemons.ts';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider.tsx';

vi.mock('./api/pokeApi', () => ({
  fetchPokemons: vi.fn(),
  fetchPokemonById: vi.fn(),
}));

const mockFetch = vi.mocked(fetchPokemons);

const sampleResult: FetchPokemonsResult = {
  items: [BULBASAUR, CHARMANDER],
  totalPages: 1,
};

function renderApp(initialEntry = '/?page=1') {
  return render(
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <MemoryRouter initialEntries={[initialEntry]}>
            <AppRoutes />
          </MemoryRouter>
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
}

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockClear();
    mockFetch.mockResolvedValue(sampleResult);
  });

  it('makes an initial API call on mount', async () => {
    renderApp();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  });

  it('calls API with empty string when localStorage is empty', async () => {
    renderApp();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('', 1));
  });

  it('calls API with saved term when localStorage has a value', async () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    renderApp();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('pikachu', 1));
  });

  it('pre-fills search input from localStorage', async () => {
    localStorage.setItem(LS_KEY, 'mewtwo');
    renderApp();
    await waitFor(() =>
      expect(screen.getByRole('textbox')).toHaveValue('mewtwo')
    );
  });

  it('displays results returned by API', async () => {
    renderApp();
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('shows loader while fetching', async () => {
    let resolve: (v: FetchPokemonsResult) => void;
    mockFetch.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      })
    );
    renderApp();
    expect(screen.getByRole('status')).toBeInTheDocument();
    resolve!(sampleResult);
    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    );
  });

  it('displays error message when API call fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderApp();
    await waitFor(() =>
      expect(screen.getByText('Network error')).toBeInTheDocument()
    );
  });

  it('saves trimmed search term to localStorage on search', async () => {
    const user = userEvent.setup();
    renderApp();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    mockFetch.mockResolvedValue({
      items: [PIKACHU],
      totalPages: 1,
    });
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '  pikachu  ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('pikachu', 1));
    expect(localStorage.getItem(LS_KEY)).toBe('pikachu');
  });

  it('does not make a new API call when search term has not changed', async () => {
    const user = userEvent.setup();
    localStorage.setItem(LS_KEY, 'pikachu');
    mockFetch.mockResolvedValue({
      items: [PIKACHU],
      totalPages: 1,
    });
    renderApp();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('shows ErrorBoundary fallback when ErrorButton is clicked', async () => {
    const user = userEvent.setup();
    renderApp();
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    await user.click(screen.getByRole('button', { name: /throw error/i }));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
