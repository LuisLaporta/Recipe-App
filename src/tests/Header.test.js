import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderWithRouter';
import Meals from '../Pages/Foods/Meals';

const PROFILE_ICON = 'profile-top-btn';
const SEARCH_ICON = 'search-top-btn';

describe('', () => {
  test('Verifica se os icones estão na tela', () => {
    renderWithRouter(<Meals />);
    expect(screen.getByTestId(PROFILE_ICON)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_ICON)).toBeInTheDocument();
  });

  test('Verifica se o titulo esta na tela', () => {
    renderWithRouter(<Meals />);
    expect(screen.getByRole('heading', { level: 1, name: /meals/i })).toBeInTheDocument();
  });

  test('Verifica se clicar no icone de search o input de pesquisa aparece', () => {
    renderWithRouter(<Meals />);

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  test('Verifica se clicar no icone de search o input de pesquisa desaparece', () => {
    renderWithRouter(<Meals />);

    const iconSearch = screen.getByTestId(SEARCH_ICON);
    userEvent.click(iconSearch);

    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(iconSearch);

    expect(searchInput).not.toBeInTheDocument();
  });

  test('Verifica se clicar no icone de profile o usuario é redirecionado a tela de profile', async () => {
    const { history } = renderWithRouter(<Meals />);

    const iconProfile = screen.getByTestId(PROFILE_ICON);
    userEvent.click(iconProfile);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/profile');
    }, { timeout: 3000 });
  });
});
