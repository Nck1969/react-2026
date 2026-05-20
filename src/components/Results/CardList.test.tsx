import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from './CardList';

describe('CardList', () => {
  it('shows "Nothing found" when items array is empty', () => {
    render(<CardList items={[]} />);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders a card for each item', () => {
    const items = [
      { id: 1, name: 'bulbasaur', description: 'Grass, Poison' },
      { id: 4, name: 'charmander', description: 'Fire' },
      { id: 7, name: 'squirtle', description: 'Water' },
    ];
    render(<CardList items={items} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const items = [
      { id: 25, name: 'pikachu', description: 'Electric' },
      { id: 150, name: 'mewtwo', description: 'Psychic' },
    ];
    render(<CardList items={items} />);
    expect(screen.getAllByText(/electric|psychic/i)).toHaveLength(2);
  });
});
