import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './Helpers/RenderWithRouter';
import App from '../App';
import { MEAL_NAME, DRINK_NAME, FAVORITE_KEY_LOCAL_STORAGE, FAVORITE_RECIPES_PATHNAME } from './Helpers/ConstantsTest';
import { MOCK_FAVORITE_RECIPE_ALL, MOCK_FAVORITE_RECIPE_ALL_AFTER } from './Helpers/UtilsMocks';
import fetch from '../../cypress/mocks/fetch';
import { setLocalStorage, getLocalStorage } from '../Services/LocalStorage';

describe('Testa o componente FavoriteRecipes.', () => {
  test('Testa se, ao acessar a página de favoritos, a lista de receitas dispõe as receita sem filtros de categoria.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkName = screen.getByText(DRINK_NAME);
    const mealName = screen.getByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão "Drinks", apenas as receitas com categoria drink aparecerão.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkButton = screen.getByRole('button', { name: 'Drinks' });
    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).not.toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão "Food", apenas as receitas com categoria meal aparecerão.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const mealsButton = screen.getByRole('button', { name: 'Food' });
    expect(mealsButton).toBeInTheDocument();

    userEvent.click(mealsButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).not.toBeInTheDocument();
    expect(mealName).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de compartilhar, o link é copiado.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const shareMessageBefore = screen.queryByText(/Link copied!/i);

    expect(shareMessageBefore).not.toBeInTheDocument();

    userEvent.click(shareButton);

    const shareMessageAfter = screen.queryByText(/Link copied!/i);

    expect(shareMessageAfter).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é removida da lista de favoritos. ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);
    const favoriteListBefore = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);
    expect(favoriteListBefore).toEqual(MOCK_FAVORITE_RECIPE_ALL);

    const drinkNameBefore = screen.queryByTestId('0-horizontal-name');
    const mealNameBefore = screen.queryByTestId('1-horizontal-name');

    expect(drinkNameBefore).toBeInTheDocument();
    expect(mealNameBefore).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(favoriteButton);

    const favoriteListAfter = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_ALL_AFTER);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).not.toBeInTheDocument();
  });
});
