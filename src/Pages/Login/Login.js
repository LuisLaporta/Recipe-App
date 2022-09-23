import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setLocalStorage } from '../../Services/LocalStorage';

const MIN_NUMERO_PASSWORD = 6;

function Login() {
  const [inputState, setInputState] = useState({
    emailInput: '',
    passwordInput: '',
  });

  const [btnState, setBtnState] = useState(true);

  useEffect(() => {
    const { emailInput, passwordInput } = inputState;
    const regexEmail = /\S+@\S+\.\S+/;
    const validateEmail = regexEmail.test(emailInput);
    const validatePassword = passwordInput.length > MIN_NUMERO_PASSWORD;
    const validateLogin = validateEmail && validatePassword;
    setBtnState(!validateLogin);
  }, [inputState]);

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setLocalStorage('user', { email: inputState.emailInput });
    setLocalStorage('mealsToken', 1);
    setLocalStorage('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <fieldset>
      <form>
        <input
          placeholder="email"
          type="email"
          data-testid="email-input"
          name="emailInput"
          value={ inputState.emailInput }
          onChange={ handleChange }
        />
        <input
          placeholder="password"
          type="password"
          data-testid="password-input"
          name="passwordInput"
          value={ inputState.passwordInput }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ btnState }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </fieldset>
  );
}

export default Login;
