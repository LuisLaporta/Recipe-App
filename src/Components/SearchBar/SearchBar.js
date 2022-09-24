import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';

function SearchBar() {
  const { fetchSearchedRecipe, searchedRecipe } = useContext(RecipesContext);
  const [inputSearch, setInputsearch] = useState('');
  const [typeRadio, setTypeRadio] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (searchedRecipe?.length === 1) {
      const redirect = pathname === '/meals'
        ? `/meals/${searchedRecipe[0].idMeal}`
        : `/drinks/${searchedRecipe[0].idDrink}`;

      history.push(redirect);
    }
  }, [searchedRecipe]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setInputsearch(value) }
      />
      <div>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="radio-search"
            value="Ingredient"
            data-testid="ingredient-search-radio"
            onChange={ ({ target: { value } }) => setTypeRadio(value) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="radio-search"
            value="Name"
            data-testid="name-search-radio"
            onChange={ ({ target: { value } }) => setTypeRadio(value) }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            type="radio"
            name="radio-search"
            value="First Letter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => setTypeRadio(value) }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        onClick={ () => fetchSearchedRecipe({ inputSearch, typeRadio, pathname }) }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
