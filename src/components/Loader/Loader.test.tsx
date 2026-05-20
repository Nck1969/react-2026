import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('contains a spinner element', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('[class*="spinner"]');
    expect(spinner).toBeInTheDocument();
  });
});
