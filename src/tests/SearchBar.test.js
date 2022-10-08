import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './Helpers/RenderWithRouter';
import Meals from '../Pages/Foods/Meals';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const SEARCH_ICON = 'search-top-btn';
const TEXT_INPUT = 'search-input';
const BUTTON_SEARCH_BY_FILTER = 'exec-search-btn';

describe('Testando o componente SearchBar', () => {
  test('Verifica se o input de pesquisa está na tela', () => {
    renderWithRouter(<Meals />);

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    expect(screen.getByTestId(TEXT_INPUT)).toBeInTheDocument();
  });

  test('Verifica se todos os inputs do tipo radio estão na tela', () => {
    renderWithRouter(<Meals />);

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    expect(screen.getByLabelText(/ingredient/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first letter/i)).toBeInTheDocument();
  });

  test('Verifica se o button de buscar está na tela', () => {
    renderWithRouter(<Meals />);

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  test('Verifica se buscar por First Letter retorna todas as receitas com esta letra', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, '/drinks');

    const recipePhoto = await screen.findByTestId('6-card-img');
    expect(recipePhoto).toBeInTheDocument();

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_BY_FILTER);

    expect(textInput).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.type(textInput, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(buttonSearch);

    const firstRecipeDrink = await screen.findByTestId('0-card-img');
    expect(firstRecipeDrink).toBeInTheDocument();
  });

  test('Verifica se ao buscar pelo nome da comida e apenas houver uma receita correspondente, o usuário será redirecionado para a página', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/meals');

    const recipePhoto = await screen.findByTestId('1-card-img');
    expect(recipePhoto).toBeInTheDocument();

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_BY_FILTER);

    expect(textInput).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.type(textInput, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const firstRecipeDrink = await screen.findByTestId('recipe-photo');
    expect(firstRecipeDrink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('Verifica se ao buscar pelo nome da bebida e apenas houver uma receita correspondente, o usuário será redirecionado para a página', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/drinks');

    const recipePhoto = await screen.findByTestId('2-card-img');
    expect(recipePhoto).toBeInTheDocument();

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_BY_FILTER);

    expect(textInput).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.type(textInput, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const firstRecipeDrink = await screen.findByTestId('recipe-photo');
    expect(firstRecipeDrink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  test('Verifica se ao buscar pelo ingrediente da comida o resultado é renderizado na tela.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, '/meals');

    const recipePhoto = await screen.findByTestId('3-card-img');
    expect(recipePhoto).toBeInTheDocument();

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioName = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_BY_FILTER);

    expect(textInput).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.type(textInput, 'Chicken');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const firstRecipeByIngredient = await screen.findByText('Brown Stew Chicken');
    expect(firstRecipeByIngredient).toBeInTheDocument();
  });
});
