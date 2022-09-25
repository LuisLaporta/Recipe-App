import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import getRecipe from '../Services/GetRecipesApi';

function RecipesProvider({ children }) {
  const [searchedRecipe, setSearchedRecipe] = useState([]);

  const contextValue = {
    searchedRecipe,
    setSearchedRecipe,
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
