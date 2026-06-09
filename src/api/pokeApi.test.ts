import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchPokemons, fetchPokemonById } from './pokeApi';

const mockListResponse = {
  count: 40,
  next: null,
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const mockBulbasaur = {
  id: 1,
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  height: 7,
  weight: 69,
  abilities: [{ ability: { name: 'overgrow' } }],
  sprites: { front_default: 'https://example.com/bulbasaur.png' },
};

const mockIvysaur = {
  id: 2,
  name: 'ivysaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  height: 10,
  weight: 130,
  abilities: [{ ability: { name: 'overgrow' } }],
  sprites: { front_default: null },
};

const mockPikachu = {
  id: 25,
  name: 'pikachu',
  types: [{ type: { name: 'electric' } }],
  height: 4,
  weight: 60,
  abilities: [{ ability: { name: 'static' } }],
  sprites: { front_default: 'https://example.com/pikachu.png' },
};

describe('fetchPokemons', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('fetches a paginated list when searchTerm is empty', async () => {
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
    expect(result.items).toHaveLength(2);
    expect(result.items[0].name).toBe('bulbasaur');
    expect(result.totalPages).toBe(2);
  });

  it('fetches a single pokemon when searchTerm is provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPikachu),
    });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('pikachu');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon/pikachu')
    );
    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('pikachu');
    expect(result.items[0].types.at(0)).toBe('electric');
    expect(result.totalPages).toBe(1);
  });

  it('returns empty items when pokemon is not found (404)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );

    const promise = fetchPokemons('unknownmon');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(1);
  });

  it('throws an error when list request fails with non-404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    const assertion = expect(fetchPokemons('')).rejects.toThrow(
      'Request failed: 500'
    );
    await vi.runAllTimersAsync();
    await assertion;
  });

  it('trims and lowercases the search term', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPikachu),
    });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('  PIKACHU  ');
    await vi.runAllTimersAsync();
    await promise;

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon/pikachu')
    );
  });

  it('uses correct offset for page 2', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...mockListResponse, count: 40 }),
      })
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBulbasaur),
      });
    vi.stubGlobal('fetch', fetchMock);

    const promise = fetchPokemons('', 2);
    await vi.runAllTimersAsync();
    await promise;

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('offset=20')
    );
  });
});

describe('fetchPokemonById', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns pokemon details with sprite, types, height, weight, abilities', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPikachu),
      })
    );

    const promise = fetchPokemonById('25');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result.id).toBe(25);
    expect(result.name).toBe('pikachu');
    expect(result.types).toEqual(['electric']);
    expect(result.height).toBe(4);
    expect(result.weight).toBe(60);
    expect(result.abilities).toEqual(['static']);
    expect(result.sprite).toBe('https://example.com/pikachu.png');
  });

  it('throws when pokemon not found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );

    const assertion = expect(fetchPokemonById('9999')).rejects.toThrow(
      'Pokemon not found'
    );
    await vi.runAllTimersAsync();
    await assertion;
  });
});
