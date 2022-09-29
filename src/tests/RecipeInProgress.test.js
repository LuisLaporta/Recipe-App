import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './Helpers/RenderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import favorited from '../images/blackHeartIcon.svg';
import desFavorited from '../images/whiteHeartIcon.svg';
import oneDrink from '../../cypress/mocks/oneDrink';

const INITIAL_ENTRIES = '/meals/52771/in-progress';
const FAV_BTN = 'favorite-btn';

describe('Testa o componente RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });

  test('Verifica se o Titulo e a Categoria da Receita aparace na tela', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(await screen.findByRole('heading', { level: 3, name: /Vegetarian/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: /Spicy Arrabiata Penne/i })).toBeInTheDocument();
  });

  test('Verifica se a lista de ingredientes da Receita aparace na tela', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(screen.getByText(/ingredientes/i)).toBeInTheDocument();
    expect(await screen.findAllByRole('checkbox')).toHaveLength(8);
  });

  test('Verifica se as instruções da Receita aparacem na tela', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(screen.getByText(/instructions/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bring a large pot of water to a boil. Add kosher salt to the boiling water,/i)).toBeInTheDocument();
  });

  test('Verifica se todos botoẽs de curtir e compartilhar aparacem na tela', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId(FAV_BTN)).toBeInTheDocument();
  });

  test('Verifica se o botão "Finishi Recipe" aparace na tela e desabilitado', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(await screen.findByRole('button', { name: /Finish Recipe/i })).toBeDisabled();
  });

  test('Verifica se clicar no botão de compartilhar a url é copiado para o clipboard e aparece a mensagem "Link Copied"', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);

    expect(await screen.findByText(/Link Copied/i)).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });

  test('Verifica se clicar no botão de favoritar a receita é favoritada', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    const favoriteBtn = await screen.findByTestId(FAV_BTN);
    expect(favoriteBtn).toHaveAttribute('src', desFavorited);
    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', favorited);
    const favRecipe = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
    expect(favRecipe[0].id).toBe('52771');
  });

  test('Verifica se clicar no ingrediente ele é riscado da lista e adicionado ao localStorage', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    const inputsIngredients = await screen.findAllByRole('checkbox');
    userEvent.click(inputsIngredients[0]);

    const ingrediente = await screen.findByTestId('0-ingredient-step');
    expect(ingrediente).toHaveStyle('text-decoration: line-through;');

    const progressRecipe = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    console.log(progressRecipe.meals[52771]);
    expect(progressRecipe.meals[52771]).toEqual(['1 pound penne rigate']);
  });

  test('Verifica se clicar no ingrediente ele é riscado da lista e adicionado ao localStorage, tela de drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    RenderWithRouter(<App />, '/drinks/178319/in-progress');

    const inputsIngredients = await screen.findAllByRole('checkbox');
    userEvent.click(inputsIngredients[0]);

    const ingrediente = await screen.findByTestId('0-ingredient-step');
    expect(ingrediente).toHaveStyle('text-decoration: line-through;');

    const progressRecipe = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    console.log(progressRecipe.drinks[178319]);
    expect(progressRecipe.drinks[178319]).toEqual(['2 oz Hpnotiq']);
  });

  test('Verifica se clicar no botão de favoritar a receita é favoritada, tela de drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    RenderWithRouter(<App />, '/drinks/178319/in-progress');

    const favoriteBtn = await screen.findByTestId(FAV_BTN);
    expect(favoriteBtn).toHaveAttribute('src', desFavorited);
    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', favorited);
    const favRecipe = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
    console.log(favRecipe);
    expect(favRecipe[1].id).toBe('178319');
  });

  test('Verifica se clicar no ingrediente ele é riscado da lista e adicionado ao localStorage', async () => {
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    const finishiBtn = await screen.findByRole('button', { name: /Finish Recipe/i });
    const inputsIngredients = await screen.findAllByRole('checkbox');

    expect(finishiBtn).toBeDisabled();
    inputsIngredients.forEach((input) => userEvent.click(input));

    expect(finishiBtn).not.toBeDisabled();
    userEvent.click(finishiBtn);
    expect(screen.getByRole('heading', { level: 1, name: /done recipes/i }));
  });
});
