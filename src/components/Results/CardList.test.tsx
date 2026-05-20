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
      { name: 'bulbasaur', description: 'Grass, Poison' },
      { name: 'charmander', description: 'Fire' },
      { name: 'squirtle', description: 'Water' },
    ];
    render(<CardList items={items} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const items = [
      { name: 'pikachu', description: 'Electric' },
      { name: 'mewtwo', description: 'Psychic' },
    ];
    render(<CardList items={items} />);
    expect(screen.getAllByText(/electric|psychic/i)).toHaveLength(2);
  });
});
