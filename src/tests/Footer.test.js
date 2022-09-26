import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderWithRouter';
import App from '../App';

describe('Testando o Componente Footer', () => {
  test('Verifica se o footer está na tela', () => {
    renderWithRouter(<App />, '/meals');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('Verifica se os icones estão na tela', () => {
    renderWithRouter(<App />, '/meals');
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });

  test('Verifica se clicar no ícone de Drink o usuário é redirecionado para a tela de Drinks', async () => {
    renderWithRouter(<App />, '/meals');

    const iconDrink = screen.getByRole('button', { name: /drink icon/i });
    userEvent.click(iconDrink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /drinks/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Verifica se clicar no ícone de Meal o usuário é redirecionado para a tela de Meals', async () => {
    renderWithRouter(<App />, '/drinks');

    const iconMeal = screen.getByRole('button', { name: /meal icon/i });
    userEvent.click(iconMeal);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /meals/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
