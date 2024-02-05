import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setLocalStorage } from '../../Services/LocalStorage';
import iconLogin from '../../images/iconLogin.svg';
import subIcon from '../../images/subIconLogin.svg';
import '../../css/login.css';

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
    setLocalStorage('doneRecipes', []);
    setLocalStorage('favoriteRecipes', []);
    setLocalStorage('inProgressRecipes', {
      drinks: {},
      meals: {},
    });
    history.push('/meals');
  };

  return (
    <section className="login-container">
      <div className="icon-container">
        <img src={ iconLogin } alt="Icon Login" className="icon-login" />
      </div>
      <img src={ subIcon } alt="Tomato icon" className="subIcon-login" />
      <h1 className="title-login">LOGIN</h1>
      <form>
        <input
          placeholder="email"
          type="email"
          data-testid="email-input"
          name="emailInput"
          value={ inputState.emailInput }
          onChange={ handleChange }
          className="email-input input"
        />
        <input
          placeholder="password"
          type="password"
          data-testid="password-input"
          name="passwordInput"
          value={ inputState.passwordInput }
          onChange={ handleChange }
          className="pass-input input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ btnState }
          onClick={ handleClick }
          className="btn-login"
        >
          ENTER
        </button>
      </form>
    </section>
  );
}

export default Login;
