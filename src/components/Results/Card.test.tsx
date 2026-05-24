import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import { BULBASAUR } from '../../constants/testPokemons.ts';

const renderTestComponent = () =>
  render(
    <Provider store={store}>
      <Card pokemon={BULBASAUR} />
    </Provider>
  );

describe('Card', () => {
  it('displays the pokemon name', () => {
    renderTestComponent();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('displays the pokemon description', () => {
    renderTestComponent();
    expect(screen.getByText('Grass, Poison')).toBeInTheDocument();
  });
});
