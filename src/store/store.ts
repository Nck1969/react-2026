import {configureStore} from '@reduxjs/toolkit';
import selectedPokemonsReducer from './selectedPokemonsSlice.ts';
import {pokemonApi} from "./pokemonApi.ts";

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
