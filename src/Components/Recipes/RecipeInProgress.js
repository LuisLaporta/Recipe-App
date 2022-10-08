import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocation, useHistory } from 'react-router-dom';
import ListIngredients from './ListIngredients';
import ButtonShareAndFavorite from './ButtonShareAndFavorite';

const arrayNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

function RecipeInProgress({ recipeDetails }) {
  const [obj, setObj] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [finishi, setFinishi] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { pathname } = useLocation();
  const local = pathname.split('/');
  const correctUrl = local[1] === 'meals' ? 'themealdb' : 'thecocktaildb';
  const correctThumb = local[1] === 'meals' ? obj.strMealThumb : obj.strDrinkThumb;
  const history = useHistory();

  const getApi = async () => {
    const response = await fetch(`https://www.${correctUrl}.com/api/json/v1/1/lookup.php?i=${local[2]}`);
    const data = await response.json();
    const correctInfo = local[1] === 'meals' ? data.meals : data.drinks;
    return setObj(correctInfo[0]);
  };

  const finishiRecipe = (inprogress) => {
    setFinishi(inprogress);
  };

  useEffect(() => {
    getApi();
    finishiRecipe();
  }, []);

  const structuringRecipe = () => {
    let array = [];
    arrayNum.map((n) => {
      const ingredient = `strIngredient${n}`;
      const measure = `strMeasure${n}`;
      const arrayIngredients = obj[ingredient];
      const arrayMeasures = obj[measure];
      const instructions = `${arrayMeasures} ${arrayIngredients}`;
      const valid = instructions !== 'null null' && instructions !== ' null';
      const valid2 = instructions.trim() !== '' && instructions !== 'undefined undefined';
      const result = valid && valid2 ? array = [...array, instructions] : '';
      return result;
    });
    setIngredients(array);
  };

  useEffect(() => {
    structuringRecipe();
  }, [obj]);

  useEffect(() => {
    setDisabled(finishi?.length !== ingredients.length);
  }, [finishi]);

  return (
    <div>
      <img src={ correctThumb } alt="Algo" data-testid="recipe-photo" />
      <img alt="Category" />
      <h3 data-testid="recipe-category">{obj.strCategory}</h3>
      <h1 data-testid="recipe-title">{obj.strMeal}</h1>
      <ButtonShareAndFavorite recipeDetails={ recipeDetails } />
      <fieldset>
        INGREDIENTES
        {ingredients?.map((m, index) => (
          <ListIngredients
            key={ index }
            index={ index }
            m={ m }
            local={ local[1] }
            idRecipe={ local[2] }
            finishiRecipe={ finishiRecipe }
          />
        ))}
      </fieldset>
      <h2>Instructions</h2>
      <p data-testid="instructions">{obj.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ () => history.push('/done-recipes') }
      >
        FINISH RECIPE
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipeDetails: PropTypes.shape({}).isRequired,
};

export default RecipeInProgress;
