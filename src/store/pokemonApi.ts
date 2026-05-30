import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  PokeApiListResponse,
  PokeApiPokemon,
  PokemonDetails,
  PokemonList,
} from '../types/pokemon.ts';

const PAGE_SIZE = 20;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonList: build.query<PokemonList, number>({
      query: (page) => {
        const offset = (page - 1) * PAGE_SIZE;

        return `pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
      },
      transformResponse: (response: PokeApiListResponse): PokemonList => {
        const totalPages = Math.ceil(response.count / PAGE_SIZE);

        return {
          ...response,
          totalPages,
        };
      },
    }),
    getPokemonByName: build.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: PokeApiPokemon) => {
        return {
          ...response,
          types: response.types.map((t) => t.type.name),
          abilities: response.abilities.map((a) => a.ability.name),
        };
      },
    }),
  }),
  keepUnusedDataFor: Number(import.meta.env.VITE_CACHE_TTL) || 60,
});

export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;
