import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import Profile from '../Pages/Profile/Profile';
import renderWithRouter from './Helpers/RenderWithRouter';
import App from '../App';

describe('Testando tela de Perfil', () => {
  test('Verifica o elemento com o e-mail na tela ', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
  });

  test('Verifica se o botão Done Recipes está na tela', async () => {
    renderWithRouter(<Profile />);

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(buttonDoneRecipes).toBeInTheDocument();
  });

  test('Verifica se o botão Favorite Recipes está na tela', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByRole('button', { name: /favorite recipes/i })).toBeInTheDocument();
  });

  test('Verifica se o botão Logout está na tela', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('Verifica se clicar no botão done recipes o usuário é redirecionado para a tela de receitas prontas', async () => {
    const { history } = renderWithRouter(<Profile />);

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(buttonDoneRecipes).toBeInTheDocument();
    userEvent.click(buttonDoneRecipes);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/done-recipes');
    }, { timeout: 3000 });
  });

  test('Verifica se clicar no botão favorite recipes o usuário é redirecionado para a tela de receitas favoritas', async () => {
    const { history } = renderWithRouter(<Profile />);

    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    userEvent.click(buttonFavoriteRecipes);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/favorite-recipes');
    }, { timeout: 3000 });
  });

  test('Verifica se clicar no botão logout o usuário é redirecionado para a tela de login', async () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();
    userEvent.click(buttonLogout);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/');
    }, { timeout: 3000 });
  });
});
