import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { LS_KEY } from './constants/storage';

vi.mock('./api/pokeApi', () => ({
  fetchPokemons: vi.fn(),
}));

import { fetchPokemons } from './api/pokeApi';

const mockFetch = vi.mocked(fetchPokemons);

const sampleItems = [
  { name: 'bulbasaur', description: 'grass, poison' },
  { name: 'charmander', description: 'fire' },
];

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockClear();
    mockFetch.mockResolvedValue(sampleItems);
  });

  it('makes an initial API call on mount', async () => {
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  });

  it('calls API with empty string when localStorage is empty', async () => {
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith(''));
  });

  it('calls API with saved term when localStorage has a value', async () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('pikachu'));
  });

  it('pre-fills search input from localStorage', async () => {
    localStorage.setItem(LS_KEY, 'mewtwo');
    render(<App />);
    await waitFor(() =>
      expect(screen.getByRole('textbox')).toHaveValue('mewtwo')
    );
  });

  it('displays results returned by API', async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('shows loader while fetching', async () => {
    let resolve: (v: typeof sampleItems) => void;
    mockFetch.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      })
    );
    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    resolve!(sampleItems);
    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    );
  });

  it('displays error message when API call fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText('Network error')).toBeInTheDocument()
    );
  });

  it('saves trimmed search term to localStorage on search', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    mockFetch.mockResolvedValue([{ name: 'pikachu', description: 'electric' }]);
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '  pikachu  ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('pikachu'));
    expect(localStorage.getItem(LS_KEY)).toBe('pikachu');
  });

  it('does not make a new API call when search term has not changed', async () => {
    const user = userEvent.setup();
    localStorage.setItem(LS_KEY, 'pikachu');
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('shows ErrorBoundary fallback when ErrorButton is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    await user.click(screen.getByRole('button', { name: /throw error/i }));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
