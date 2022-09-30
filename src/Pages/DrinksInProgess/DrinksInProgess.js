import React from 'react';
import RecipeInProgress from '../../Components/Recipes/RecipeInProgress';

function DrinksInProgess({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeInProgress drinkId={ id } />
    </div>
  );
}

export default DrinksInProgess;
