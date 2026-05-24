import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import { BULBASAUR } from '../../constants/testPokemons.ts';
import {
  addPokemon,
  clearAllPokemons,
  removePokemon,
} from '../../store/selectedPokemonsSlice.ts';
import userEvent from '@testing-library/user-event';

const renderTestComponent = (cardClickHandler?: VoidFunction) =>
  render(
    <Provider store={store}>
      <Card pokemon={BULBASAUR} onCardClick={cardClickHandler} />
    </Provider>
  );

describe('Card Component', () => {
  beforeEach(() => store.dispatch(clearAllPokemons()));

  it('should display pokemon name', () => {
    renderTestComponent();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('should display pokemon description', () => {
    renderTestComponent();
    expect(screen.getByText('Grass, Poison')).toBeInTheDocument();
  });

  it('should have unchecked checkbox by default', () => {
    renderTestComponent();

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should have checked checkbox when pokemon is selected in store', () => {
    store.dispatch(addPokemon(BULBASAUR));
    renderTestComponent();

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should dispatch addPokemon and removePokemon on checkbox clicks', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderTestComponent();
    const checkbox = screen.getByRole('checkbox');

    act(() => {
      checkbox.click();
    });
    expect(dispatchSpy).toHaveBeenCalledWith(addPokemon(BULBASAUR));

    act(() => {
      checkbox.click();
    });
    expect(dispatchSpy).toHaveBeenCalledWith(removePokemon(BULBASAUR.id));
  });

  it('should not call onCardClick when checkbox is clicked', () => {
    const onCardClick = vi.fn();
    renderTestComponent(onCardClick);

    act(() => {
      screen.getByRole('checkbox').click();
    });

    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('should call onCardClick with pokemon id when card is clicked', () => {
    const onCardClick = vi.fn();
    renderTestComponent(onCardClick);

    act(() => {
      screen.getByRole('button').click();
    });

    expect(onCardClick).toHaveBeenCalledWith(BULBASAUR.id);
  });

  it('should call onCardClick with pokemon id when "enter button" pressed', async () => {
    const onCardClick = vi.fn();
    renderTestComponent(onCardClick);

    act(() => {
      screen.getByRole('button').focus();
    });
    await userEvent.keyboard('{Enter}');

    expect(onCardClick).toHaveBeenCalledWith(BULBASAUR.id);
  });
});
