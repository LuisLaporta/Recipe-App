import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';

import RecipesContext from '../../Context/RecipesContext';
import '../../css/recipes.css';

const LIMIT_NUMBER = 12;

function Recipes({ searchBarVisible }) {
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
    <div
      className={
        searchBarVisible ? 'drop-down  flex-recipe'
          : 'recipes-container flex-recipe'
      }
    >
      { recipesFound?.map((recipe, index) => (
        <div
          key={ index }
          role="presentation"
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
          onClick={ () => goToDetails(pathname, recipe) }
        >
          <img
            src={ pathname === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ pathname === '/meals' ? recipe.strMeal : recipe.strDrink }
            data-testid={ `${index}-card-img` }
            className="img-recipe"
          />
          <h3 data-testid={ `${index}-card-name` } className="recipe-name">
            {history.location.pathname === '/meals' ? recipe.strMeal : recipe.strDrink}
          </h3>
        </div>
      ))}
      <div className="free" />
    </div>
  );
}

Recipes.propTypes = {
  searchBarVisible: PropTypes.bool.isRequired,
};

export default Recipes;
