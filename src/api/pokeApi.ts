import type {
  PokeApiListResponse,
  PokeApiPokemon,
  PokemonView,
} from '../types/pokemon';

const BASE = 'https://pokeapi.co/api/v2';
const LOADER_DELAY = 300;

async function fetchPokemonDetails(name: string): Promise<PokemonView> {
  const res = await fetch(`${BASE}/pokemon/${name}`);
  if (!res.ok) throw new Error(`Pokemon "${name}" not found`);
  const data: PokeApiPokemon = await res.json();
  return {
    name: data.name,
    description: data.types.map((t) => t.type.name).join(', '),
  };
}

export async function fetchPokemons(
  searchTerm: string,
  limit = 20,
  offset = 0
): Promise<PokemonView[]> {
  await new Promise((r) => setTimeout(r, LOADER_DELAY));

  const term = searchTerm.trim().toLowerCase();

  if (term) {
    const res = await fetch(`${BASE}/pokemon/${term}`);
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data: PokeApiPokemon = await res.json();
    return [
      {
        name: data.name,
        description: data.types.map((t) => t.type.name).join(', '),
      },
    ];
  }

  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const list: PokeApiListResponse = await res.json();

  return Promise.all(list.results.map((item) => fetchPokemonDetails(item.name)));
}
