import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PokemonDetails } from '../types/pokemon.ts';
import type { RootState } from './store.ts';

type PokemonsState = Record<string, PokemonDetails>;

const initialState: PokemonsState = {};

export const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<PokemonDetails>) => {
      state[action.payload.id] = action.payload;
    },
    removePokemon: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    clearAllPokemons: () => {
      return {};
    },
  },
});

export const selectedPokemonsArraySelector = createSelector(
  (state: RootState) => state.selectedPokemons,
  (selectedPokemons) => Object.values(selectedPokemons)
);

export const isPokemonSelectedSelector = (
  state: RootState,
  id: number | undefined
) => {
  if (!id) return false;

  return !!state.selectedPokemons[id];
};

export const selectedPokemonsCountSelector = (state: RootState) => {
  return Object.keys(state.selectedPokemons).length;
};

// Action creators are generated for each case reducer function
export const { addPokemon, removePokemon, clearAllPokemons } =
  selectedPokemonsSlice.actions;

export default selectedPokemonsSlice.reducer;
