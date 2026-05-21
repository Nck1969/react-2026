import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer from './selectedPokemonsSlice.ts';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
