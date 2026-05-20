import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Results from './Results';

describe('Results', () => {
  it('renders items passed as props', () => {
    const items = [{ name: 'pikachu', description: 'Electric' }];
    render(<Results items={items} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('shows "Nothing found" when items are empty', () => {
    render(<Results items={[]} />);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });
});
