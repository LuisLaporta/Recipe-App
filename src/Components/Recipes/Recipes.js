import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';

const LIMIT_NUMBER = 12;

function Recipes() {
  const { searchedRecipe } = useContext(RecipesContext);
  const [recipesFound, setRecipesFound] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const limitRecipes = searchedRecipe?.slice(0, LIMIT_NUMBER);
    setRecipesFound(limitRecipes);
  }, [searchedRecipe]);

  return (
    <div>
      { recipesFound?.map((recipe, index) => (
        <div
          key={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ pathname === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ pathname === '/meals' ? recipe.strMeal : recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {pathname === '/meals' ? recipe.strMeal : recipe.strDrink}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
