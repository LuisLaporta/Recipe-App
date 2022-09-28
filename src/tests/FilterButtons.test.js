import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import RenderWithRouter from './Helpers/RenderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import beefMeals from '../../cypress/mocks/beefMeals';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const CORRECT_EMAIL = 'teste@teste.com';

describe('Testa o componente FilterButtons', () => {
  test('Testa se o botão de filtro "Beef" está na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    RenderWithRouter(<App />, '/meals');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    const beefButton = await screen.findByRole('button', { name: /beef/i });
    expect(beefButton).toBeInTheDocument();
  });

  test('Testa se o botão de filtro "Ordinary drink" está na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    RenderWithRouter(<App />, '/drinks');

    const drinksTitle = screen.getByRole('heading', { name: /Drinks/i });
    expect(drinksTitle).toBeInTheDocument();

    const ordinaryButton = await screen.findByRole('button', { name: /Ordinary Drink/i });
    expect(ordinaryButton).toBeInTheDocument();
  });

  test('Testa se o botão de filtro "All" filtra as receitas corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    RenderWithRouter(<App />, '/meals');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    const allButton = await screen.findByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const corbaRecipe = await screen.findByRole('heading', { level: 3, name: /corba/i });
    expect(corbaRecipe).toBeInTheDocument();
  });

  test('Testa se o botão de filtro "Beef" filtra as receitas corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    RenderWithRouter(<App />, '/meals');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    const beefButton = await screen.findByRole('button', { name: /beef/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);

    const beefRecipe = await screen.findAllByRole('heading', { level: 4, name: /Beef/i });
    expect(beefRecipe).toHaveLength(12);
  });

  test('Testa se o botão de filtro "Beef" filtra as receitas corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    RenderWithRouter(<App />, '/meals');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    const beefButton = await screen.findByRole('button', { name: /beef/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);

    const beefRecipe = await screen.findAllByRole('heading', { level: 4, name: /Beef/i });
    expect(beefRecipe).toHaveLength(12);

    userEvent.click(beefButton);

    const beefRecipeAfter = await screen.findAllByRole('heading', { level: 4, name: /Beef/i });
    expect(beefRecipeAfter).not.toHaveLength(12);
  });

  test('Testa se ao clicar na receita o usuário é redirecionado para os detalhes da receita', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = RenderWithRouter(<App />, '/meals');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();

    userEvent.click(recipeCard);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });
});
