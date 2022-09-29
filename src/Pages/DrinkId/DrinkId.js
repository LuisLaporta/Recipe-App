import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';

function DrinkId({ match: { params: { id } } }) {
  const [RecommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecommendedRecipes(data);
    };
    fetchRecommendedRecipes();
  }, []);
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
