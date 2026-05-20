import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('displays the provided error text', () => {
    render(<ErrorMessage text="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders the warning icon', () => {
    const { container } = render(<ErrorMessage text="Error" />);
    expect(container.querySelector('[class*="icon"]')).toBeInTheDocument();
  });
});
