import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Search from './Search';

describe('Search', () => {
  it('renders input and search button', () => {
    render(<Search initialTerm="" onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('populates input with initialTerm', () => {
    render(<Search initialTerm="pikachu" onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('shows empty input when initialTerm is empty', () => {
    render(<Search initialTerm="" onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search initialTerm="" onSearch={vi.fn()} />);
    await user.type(screen.getByRole('textbox'), 'char');
    expect(screen.getByRole('textbox')).toHaveValue('char');
  });

  it('calls onSearch with current value when button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search initialTerm="bulbasaur" onSearch={onSearch} />);
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
  });

  it('calls onSearch with typed value when button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search initialTerm="" onSearch={onSearch} />);
    await user.type(screen.getByRole('textbox'), 'mewtwo');
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('mewtwo');
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search initialTerm="squirtle" onSearch={onSearch} />);
    await user.type(screen.getByRole('textbox'), '{Enter}');
    expect(onSearch).toHaveBeenCalledWith('squirtle');
  });

  it('syncs value when initialTerm prop changes', async () => {
    const onSearch = vi.fn();
    const { rerender } = render(<Search initialTerm="" onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
    rerender(<Search initialTerm="eevee" onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('eevee');
  });
});
