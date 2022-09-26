import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderWithRouter';
import Meals from '../Pages/Foods/Meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import meals from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrink';

const SEARCH_ICON = 'search-top-btn';
const TEXT_INPUT = 'search-input';
const BUTTO_ID = 'exec-search-btn';

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

  test('Verifica se o button de buscar esta na tela', () => {
    renderWithRouter(<Meals />);

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  test('Verifica se buscar por uma receita e retornar apenas um item, o usuario é redirecionado para outra página', async () => {
    renderWithRouter(<App />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    userEvent.type(textInput, 'arrabiata');

    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId(BUTTO_ID);
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(screen.getByText(/mealid/i)).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Verifica se buscar por um drink e retornar apenas um item, o usuario é redirecionado para outra página', async () => {
    renderWithRouter(<App />, '/drinks');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId(BUTTO_ID);

    userEvent.type(textInput, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(screen.getByText(/drinkid/i)).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Verifica se buscar por ingredient retorna todas as receitas com este ingredient', async () => {
    renderWithRouter(<App />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId(BUTTO_ID);

    userEvent.type(textInput, 'salmon');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(screen.getByTestId('0-card-name')).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Verifica se buscar por First Letter retorna todas as receitas com esta letra', async () => {
    renderWithRouter(<App />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId(BUTTO_ID);

    userEvent.type(textInput, 'L');
    userEvent.click(radioFirstLetter);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(screen.getByTestId('0-card-name')).toBeInTheDocument(), { timeout: 3000 });
  });
});
