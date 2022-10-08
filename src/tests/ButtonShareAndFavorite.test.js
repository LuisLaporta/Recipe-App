import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './Helpers/RenderWithRouter';
import App from '../App';
import {
  DESCRIPTION_MEAL_PATHNAME, DESCRIPTION_DRINK_PATHNAME, RECIPE_PHOTO_TEST_ID,
  SHARE_BTN_TEST_ID, FAVORITE_BTN_TEST_ID, FAVORITE_KEY_LOCAL_STORAGE } from './Helpers/ConstantsTest';
import {
  MOCK_FAVORITE_RECIPE_MEAL_BEFORE, MOCK_FAVORITE_RECIPE_MEAL_AFTER,
  MOCK_FAVORITE_RECIPE_DRINK_BEFORE,
} from './Helpers/UtilsMocks';
import fetch from '../../cypress/mocks/fetch';
import { setLocalStorage, getLocalStorage } from '../Services/LocalStorage';

describe('Testa o componente ButtonShareAndFavorite.', () => {
  test('Testa se, ao clicar no botão de favoritos, o coração muda para preenchido de preto.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const whiteHeartButton = await screen.findByTestId(FAVORITE_BTN_TEST_ID);
    expect(whiteHeartButton).toBeInTheDocument();
    expect(whiteHeartButton).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(whiteHeartButton);

    const blackHeartButton = await screen.findByTestId(FAVORITE_BTN_TEST_ID);
    expect(blackHeartButton).toBeInTheDocument();
    expect(blackHeartButton).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  test('Testa se, ao clicar no botão de compartilhar, o link é copiado.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);

    const shareButton = await screen.findByTestId(SHARE_BTN_TEST_ID);
    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const shareMessage = screen.getByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é adicionada à lista de favoritos. ', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_MEAL_BEFORE);

    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);
    const favoriteListBefore = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListBefore).not.toBe(null);

    const blackHeartButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);
    userEvent.click(blackHeartButton);

    const favoriteListAfter = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_MEAL_AFTER);
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é adicionada à lista de favoritos. ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_DRINK_BEFORE);

    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);
    const favoriteListBefore = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);
    expect(favoriteListBefore).toEqual([]);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const whiteHeartButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);
    userEvent.click(whiteHeartButton);

    const favoriteListAfter = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter[0].id).toBe('15997');

    const blackHeartButton = await screen.findByTestId(FAVORITE_BTN_TEST_ID);
    expect(blackHeartButton).toBeInTheDocument();
    expect(blackHeartButton).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
