import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card', () => {
  const pokemon = { id: 1, name: 'bulbasaur', description: 'Grass, Poison' };

  it('displays the pokemon name', () => {
    render(<Card pokemon={pokemon} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('displays the pokemon description', () => {
    render(<Card pokemon={pokemon} />);
    expect(screen.getByText('Grass, Poison')).toBeInTheDocument();
  });
});
