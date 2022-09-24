import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';

function SearchBar() {
  const { fetchSearchedRecipe } = useContext(RecipesContext);
  const [inputSearch, setInputsearch] = useState('');
  const [typeRadio, setTypeRadio] = useState('');

  const { location: { pathname } } = useHistory();

  const handleCLick = () => {
    fetchSearchedRecipe({ inputSearch, typeRadio, pathname });
  };
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
        onClick={ handleCLick }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
