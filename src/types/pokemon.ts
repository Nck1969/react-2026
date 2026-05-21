export interface PokemonView {
  id: number;
  name: string;
  description: string;
}

export interface PokemonMinimalDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
}

export interface PokemonDetails extends PokemonMinimalDetails {
  sprite: string | null;
  abilities: string[];
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

export interface FetchPokemonsResult {
  items: PokemonView[];
  totalPages: number;
}
