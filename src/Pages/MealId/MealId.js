import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';

function MealId({ match: { params: { id } } }) {
  const [RecommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecommendedRecipes(data);
    };
    fetchRecommendedRecipes();
  }, []);

  return (
    <div>
      <RecipeDetails mealId={ id } />
    </div>
  );
}

MealId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MealId;
