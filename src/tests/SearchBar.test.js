import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderWithRouter';
import Meals from '../Pages/Foods/Meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import { meals } from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrink';

const SEARCH_ICON = 'search-top-btn';
const TEXT_INPUT = 'search-input';

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
    const { history } = renderWithRouter(<App />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioIngredient = screen.getByLabelText(/name/i);
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });

    userEvent.type(textInput, 'Arrabiata');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/meals/52771');
    }, { timeout: 2000 });
  });

  test('Verifica se buscar por um drink e retornar apenas um item, o usuario é redirecionado para outra página', async () => {
    const { history } = renderWithRouter(<App />, '/drinks');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioIngredient = screen.getByLabelText(/name/i);
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });

    userEvent.type(textInput, 'Aquamarine');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/drinks/178319');
    }, { timeout: 2000 });
  });

  test('Verifica se buscar por ingredient retorna todas as receitas com este ingredient', async () => {
    renderWithRouter(<App />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioIngredient = screen.getByLabelText(/ingredient/i);
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });

    userEvent.type(textInput, 'salmon');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    expect(screen.getByRole('heading', { level: 3, name: /honey teriyaki/i })).toBeInTheDocument();
  });

  test('Verifica se buscar por First Letter retorna todas as receitas com esta letra', async () => {
    renderWithRouter(<App />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const textInput = screen.getByTestId(TEXT_INPUT);
    const radioIngredient = screen.getByLabelText(/first letter/i);
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });

    userEvent.type(textInput, 'l');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    expect(screen.getByRole('heading', { level: 3, name: /lamb tomato and sweet spices/i })).toBeInTheDocument();
  });
});
