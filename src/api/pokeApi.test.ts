import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchPokemons } from './pokeApi';

const mockPokemon = {
  name: 'pikachu',
  types: [{ type: { name: 'electric' } }],
};

const mockListResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const mockBulbasaur = {
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

const mockIvysaur = {
  name: 'ivysaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

describe('fetchPokemons', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('fetches a list when searchTerm is empty', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockListResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBulbasaur),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIvysaur),
      });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon?limit=')
    );
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('bulbasaur');
  });

  it('fetches a single pokemon when searchTerm is provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPokemon),
    });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('pikachu');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon/pikachu')
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
    expect(result[0].description).toBe('electric');
  });

  it('returns empty array when pokemon is not found (404)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));

    const promise = fetchPokemons('unknownmon');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual([]);
  });

  it('throws an error when list request fails with non-404', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const assertion = expect(fetchPokemons('')).rejects.toThrow(
      'Request failed: 500'
    );
    await vi.runAllTimersAsync();
    await assertion;
  });

  it('returns description as joined type names', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBulbasaur),
    });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('bulbasaur');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result[0].description).toBe('grass, poison');
  });

  it('trims and lowercases the search term', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPokemon),
    });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('  PIKACHU  ');
    await vi.runAllTimersAsync();
    await promise;

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon/pikachu')
    );
  });
});
