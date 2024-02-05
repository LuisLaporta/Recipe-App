import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinksIcon.svg';
import mealIcon from '../../images/mealsIcon.svg';
import '../../css/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer-container">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img
          src={ drinkIcon }
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
          className="drinkIcon"
        />
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
        <img
          src={ mealIcon }
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
          className="mealIcon"
        />
      </button>
    </footer>
  );
}

export default Footer;
