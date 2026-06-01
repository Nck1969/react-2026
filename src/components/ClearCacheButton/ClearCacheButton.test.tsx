import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ClearCacheButton from './ClearCacheButton.tsx';
import { store } from '../../store/store.ts';
import { pokemonApi } from '../../store/pokemonApi.ts';
import { Provider } from 'react-redux';

describe('ClearCacheButton', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders a "Clear cache" button', () => {
    render(
      <Provider store={store}>
        <ClearCacheButton />
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: /clear cache/i })
    ).toBeInTheDocument();
  });

  it('triggers invalidate cache action when clicked', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ClearCacheButton />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /clear cache/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      pokemonApi.util.invalidateTags(['PokemonTag'])
    );
  });
});
