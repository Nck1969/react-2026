import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { LS_KEY } from './constants/storage';
import { BULBASAUR } from './constants/testPokemons.ts';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from './store/pokemonApi.ts';

vi.mock('./store/pokemonApi.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./store/pokemonApi.ts')>();
  return {
    ...actual,
    useGetPokemonListQuery: vi.fn(),
    useGetPokemonByNameQuery: vi.fn(),
  };
});

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

    vi.mocked(useGetPokemonListQuery).mockReturnValue({
      data: {
        count: 3,
        next: null,
        previous: null,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
          {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
          },
        ],
        totalPages: 1,
      },
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: BULBASAUR,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
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

    expect(screen.getAllByText('bulbasaur')).toHaveLength(3);
  });

  it('shows loader while fetching', async () => {
    vi.mocked(useGetPokemonListQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    renderApp();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    vi.mocked(useGetPokemonListQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: {
        status: 300,
        data: 'Network error',
      },
      refetch: vi.fn(),
    });
    renderApp();

    await waitFor(() =>
      expect(screen.getByText('Network error')).toBeInTheDocument()
    );
  });

  it('saves trimmed search term to localStorage on search', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '  pikachu  ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LS_KEY)).toBe('pikachu');
  });

  it('shows ErrorBoundary fallback when ErrorButton is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: /throw error/i }));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
