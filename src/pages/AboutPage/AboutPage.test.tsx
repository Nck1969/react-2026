import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders author name', () => {
    render(<MemoryRouter><AboutPage /></MemoryRouter>);
    expect(screen.getByText(/Mikita Kern/i)).toBeInTheDocument();
  });

  it('renders a link to RS School React course', () => {
    render(<MemoryRouter><AboutPage /></MemoryRouter>);
    const link = screen.getByRole('link', { name: /RS School React Course/i });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders a back link to the main page', () => {
    render(<MemoryRouter><AboutPage /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /back to search/i })).toBeInTheDocument();
  });
});
