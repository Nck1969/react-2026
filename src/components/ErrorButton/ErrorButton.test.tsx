import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorButton from './ErrorButton';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

describe('ErrorButton', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders a "Throw error" button', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  it('triggers ErrorBoundary fallback UI when clicked', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    await user.click(screen.getByRole('button', { name: /throw error/i }));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
