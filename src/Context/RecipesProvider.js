import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';

import RecipesContext from './RecipesContext';
// import getRecipe from '../Services/GetRecipesApi';

function RecipesProvider({ children }) {
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const [categorySelected, setCategorySelected] = useState('all');

  const updateRecipeList = (recipe) => {
    act(() => {
      setSearchedRecipe(recipe);
    });
  };

  const changeCategory = (category) => {
    act(() => {
      setCategorySelected(category);
    });
  };

  const contextValue = {
    searchedRecipe,
    setSearchedRecipe,
    updateRecipeList,
    categorySelected,
    changeCategory,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
