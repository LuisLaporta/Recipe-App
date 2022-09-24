import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './Helpers/RenderWithRouter';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const CORRECT_EMAIL = 'teste@teste.com';

describe('Testando tela de Login', () => {
  test('Verifica se os inputs estão na tela', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
  });

  test('Verifica se o botão está na tela', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });

  test('Verifica se o botão está desabilitado ao entrar na tela', () => {
    renderWithRouter(<App />);
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });
    expect(buttonSubmit).toBeDisabled();
  });

  test('Verifica se o email correto e a senha incorreta o botão continua desabilitado', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, CORRECT_EMAIL);
    userEvent.type(inputPassword, '1234');
    expect(buttonSubmit).toBeDisabled();
  });

  test('Verifica se o email incorreto e a senha correta o botão continua desabilitado', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, 'teste');
    userEvent.type(inputPassword, '123456');
    expect(buttonSubmit).toBeDisabled();
  });

  test('Verifica se o email e a senha corretas o botão é habilitado', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, CORRECT_EMAIL);
    userEvent.type(inputPassword, '1234567');
    expect(buttonSubmit).not.toBeDisabled();
  });

  test('Verifica se o email e a senha corretas o botão é habilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, CORRECT_EMAIL);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonSubmit);

    expect(screen.getByRole('heading', { level: 1, nome: /meals/i })).toBeInTheDocument();
  });
});
