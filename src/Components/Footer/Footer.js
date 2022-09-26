import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button">
        <img src={ mealIcon } alt="Meal Icon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
