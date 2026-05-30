export interface PokemonMinimalDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
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

export type PokemonList = PokeApiListResponse & { totalPages: number };

export interface PokeApiType {
  type: { name: string };
}

export interface PokeApiAbility {
  ability: { name: string };
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  types: PokeApiType[];
  height: number;
  weight: number;
  abilities: PokeApiAbility[];
  sprites: {
    front_default: string | null;
  };
}

export type PokemonDetails = Omit<PokeApiPokemon, 'types' | 'abilities'> & {
  types: string[];
  abilities: string[];
};

export interface FetchPokemonsResult {
  items: PokemonMinimalDetails[];
  totalPages: number;
}
