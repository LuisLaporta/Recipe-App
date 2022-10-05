import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import RecipesContext from '../../Context/RecipesContext';

const LIMIT_NUMBER = 12;

function Recipes() {
  const { searchedRecipe, categorySelected } = useContext(RecipesContext);

  const [recipesFound, setRecipesFound] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const limitRecipes = searchedRecipe?.slice(0, LIMIT_NUMBER);
    act(() => {
      setRecipesFound(limitRecipes);
    });
  }, [searchedRecipe]);

  const { pathname } = history.location;

  const goToDetails = (pathName, recipe) => (
    history.push(`${pathName}/${recipe.idMeal || recipe.idDrink}`)
  );

  return (
    <div>
      { recipesFound?.map((recipe, index) => (
        <div
          key={ index }
          role="presentation"
          data-testid={ `${index}-recipe-card` }
          onClick={ () => goToDetails(pathname, recipe) }
        >
          <img
            src={ pathname === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ pathname === '/meals' ? recipe.strMeal : recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {history.location.pathname === '/meals' ? recipe.strMeal : recipe.strDrink}
          </h3>
          <h4 data-testid={ `${index}-card-category` }>
            { categorySelected === 'all' ? recipe.strCategory : categorySelected }
          </h4>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
