import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import recipeIcon from '../../images/recipe.svg';
import titleApp from '../../images/titlteApp.svg';
import drinksIcon from '../../images/drinksIcon.svg';
import mealsIcon from '../../images/mealsIcon.svg';
import profileIcon2 from '../../images/profileIcon2.svg';
import favIcon from '../../images/favIcon.svg';
import doneIcon from '../../images/doneIcon.svg';
import '../../css/header.css';

function Header({ title, disabledSearch, disabled }) {
  const history = useHistory();
  const icons = {
    Drinks: drinksIcon,
    Meals: mealsIcon,
    Profile: profileIcon2,
    Favorite: favIcon,
    Done: doneIcon,
  };

  return (
    <section className="header-container">
      <div className="title-container">
        <img src={ recipeIcon } alt="icon recipe" className="recipe-icon" />
        <img src={ titleApp } alt="Title App" className="recipe-title" />
        {disabled && (
          <button
            type="button"
            onClick={ disabledSearch }
            src={ searchIcon }
            data-testid="search-top-btn"
            className="btn search-btn"
          >
            <img
              src={ searchIcon }
              alt="Search Icon"
            />
          </button>
        )}
        <button
          type="button"
          onClick={ () => history.push('/profile') }
          className="btn profile-btn"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </button>
      </div>
      <div className="sub-conatiner">
        <img src={ icons[title] } alt="Drinks Icon" className="icon-page" />
        <h1 data-testid="page-title" className="title-page">{title}</h1>
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  disabledSearch: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Header;
