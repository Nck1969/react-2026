import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders page buttons for each page', () => {
    render(<Pagination currentPage={1} totalPages={3} onChange={vi.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks the current page as active', () => {
    render(<Pagination currentPage={2} totalPages={3} onChange={vi.fn()} />);
    expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('1')).not.toHaveAttribute('aria-current');
  });

  it('disables Previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={3} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination currentPage={3} totalPages={3} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('calls onChange with next page when Next is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with previous page when Prev is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange with correct page when a page number is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={3} onChange={onChange} />);
    await user.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
