import type {
  FetchPokemonsResult,
  PokeApiListResponse,
  PokeApiPokemon,
  PokemonDetails,
  PokemonMinimalDetails,
} from '../types/pokemon';

const BASE = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 20;
const LOADER_DELAY = 300;

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return Number(parts[parts.length - 1]);
}

async function fetchPokemonDetails(
  name: string
): Promise<PokemonMinimalDetails> {
  const res = await fetch(`${BASE}/pokemon/${name}`);
  if (!res.ok) throw new Error(`Pokemon "${name}" not found`);
  const data: PokeApiPokemon = await res.json();
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t) => t.type.name),
  };
}

export async function fetchPokemons(
  searchTerm: string,
  page = 1
): Promise<FetchPokemonsResult> {
  await new Promise((r) => setTimeout(r, LOADER_DELAY));

  const term = searchTerm.trim().toLowerCase();

  if (term) {
    const res = await fetch(`${BASE}/pokemon/${term}`);
    if (res.status === 404) return { items: [], totalPages: 1 };
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data: PokeApiPokemon = await res.json();
    return {
      items: [
        {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((t) => t.type.name),
        },
      ],
      totalPages: 1,
    };
  }

  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(
    `${BASE}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const list: PokeApiListResponse = await res.json();

  const totalPages = Math.ceil(list.count / PAGE_SIZE);
  const items = await Promise.all(
    list.results.map((item) => {
      const id = extractIdFromUrl(item.url);
      return fetchPokemonDetails(item.name).then((p) => ({ ...p, id }));
    })
  );

  return { items, totalPages };
}

export async function fetchPokemonById(id: string): Promise<PokemonDetails> {
  await new Promise((r) => setTimeout(r, LOADER_DELAY));

  const res = await fetch(`${BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Pokemon not found`);
  const data: PokeApiPokemon = await res.json();

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a) => a.ability.name),
  };
}
