import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';

function DrinkId({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeDetails drinkId={ id } />
    </div>
  );
}

DrinkId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkId;
