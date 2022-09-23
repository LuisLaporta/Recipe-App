import React, { useEffect, useState } from 'react';

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
    const validatePassword = passwordInput.length >= MIN_NUMERO_PASSWORD;
    const validateLogin = validateEmail && validatePassword;
    setBtnState(!validateLogin);
  }, [inputState]);

  const handleChange = ({ target: { name, value } }) => {
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        >
          Enter
        </button>
      </form>
    </fieldset>
  );
}

export default Login;
