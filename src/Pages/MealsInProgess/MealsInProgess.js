import React from 'react';
import RecipeInProgress from '../../Components/Recipes/RecipeInProgress';

function MealsInProgess({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeInProgress mealId={ id } />
    </div>
  );
}

export default MealsInProgess;
