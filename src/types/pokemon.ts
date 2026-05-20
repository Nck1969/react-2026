export interface PokemonView {
  name: string;
  description: string;
}

export interface PokeApiListItem {
  name: string;
  url: string;
}

export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiListItem[];
}

export interface PokeApiType {
  type: { name: string };
}

export interface PokeApiPokemon {
  name: string;
  types: PokeApiType[];
}
