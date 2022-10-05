import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import RecipeInProgress from '../../Components/Recipes/RecipeInProgress';
import requestRecipesApi from '../../Services/RequestRecipesApi';

function MealsInProgess() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = pathname.includes('/meals')
        ? await requestRecipesApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        : await requestRecipesApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      return pathname.includes('/meals')
        ? setRecipeDetails(response.meals[0])
        : setRecipeDetails(response.drinks[0]);
    };
    fetchApi();
  }, [pathname]);

  return (
    <div>
      <RecipeInProgress recipeDetails={ recipeDetails } />
    </div>
  );
}

export default MealsInProgess;
