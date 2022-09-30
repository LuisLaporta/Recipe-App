import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../../Components/Recipes/RecipeInProgress';

function DrinksInProgess({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeInProgress drinkId={ id } />
    </div>
  );
}

DrinksInProgess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinksInProgess;
