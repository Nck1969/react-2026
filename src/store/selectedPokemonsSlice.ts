import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PokemonMinimalDetails } from '../types/pokemon.ts';

type PokemonsState = Record<string, PokemonMinimalDetails>;

const initialState: PokemonsState = {};

export const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<PokemonMinimalDetails>) => {
      state[action.payload.id] = action.payload;
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    clearAllPokemons: () => {
      return {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPokemon, removePokemon, clearAllPokemons } =
  selectedPokemonsSlice.actions;

export default selectedPokemonsSlice.reducer;
