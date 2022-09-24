import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="search" placeholder="Search" data-testid="search-input" />
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            name="ingredient"
            value="Ingredient"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            name="name"
            value="Name"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            name="firstLetter"
            value="First Letter"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

export default SearchBar;
