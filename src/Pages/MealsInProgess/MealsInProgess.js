import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../../Components/Recipes/RecipeInProgress';

function MealsInProgess({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeInProgress mealId={ id } />
    </div>
  );
}

MealsInProgess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MealsInProgess;
