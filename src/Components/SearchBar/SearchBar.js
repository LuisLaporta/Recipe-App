import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';
import getRecipe from '../../Services/GetRecipesApi';
import '../../css/searchBar.css';

function SearchBar() {
  const { setSearchedRecipe, searchedRecipe } = useContext(RecipesContext);
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

  const handleClick = async () => {
    const recipe = await getRecipe({ inputSearch, typeRadio, pathname });
    setSearchedRecipe(recipe);
  };

  return (
    <div className="searchBar-container">
      <input
        type="search"
        placeholder="Search"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setInputsearch(value) }
        className="search-input"
      />
      <div className="filter-search-container">
        <div className="flex-filter">
          <label htmlFor="ingredient" className="ingredient-search-radio">
            <input
              id="ingredient"
              type="radio"
              name="radio-search"
              value="Ingredient"
              data-testid="ingredient-search-radio"
              onChange={ ({ target: { value } }) => setTypeRadio(value) }
            />
            <p className="p-cont">Ingredient</p>
          </label>
          <label htmlFor="name">
            <input
              id="name"
              type="radio"
              name="radio-search"
              value="Name"
              data-testid="name-search-radio"
              onChange={ ({ target: { value } }) => setTypeRadio(value) }
              className="name-search-radio"
            />
            <p className="p-cont">Name</p>
          </label>
          <label htmlFor="firstLetter">
            <input
              id="firstLetter"
              type="radio"
              name="radio-search"
              value="First Letter"
              data-testid="first-letter-search-radio"
              onChange={ ({ target: { value } }) => setTypeRadio(value) }
              className="first-letter-search-radio"
            />
            <p className="p-cont">First Letter</p>
          </label>
        </div>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="exec-search-btn"
          className="btn-search"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
