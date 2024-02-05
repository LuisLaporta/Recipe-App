import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';

import { useLocation, useHistory } from 'react-router-dom';
import ListIngredients from './ListIngredients';
import ButtonShareAndFavorite from './ButtonShareAndFavorite';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';

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
    console.log(recipeDetails);
  }, [finishi]);

  const finishRecipe = () => {
    const dones = getLocalStorage('doneRecipes');
    const recipe = {
      id: recipeDetails.idMeal || recipeDetails.idDrink,
      type: pathname.includes('/meals') ? 'meal' : 'drink',
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.strMeal || recipeDetails.strDrink,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      doneDate: new Date(),
      tags: typeof recipeDetails.strTags === 'string' ? [recipeDetails.strTags]
        : recipeDetails.strTags,
    };
    console.log(recipe);
    setLocalStorage('doneRecipes', [...dones, recipe]);
    history.push('/done-recipes');
  };

  return (
    <div>
      <header
        className="header-details"
        style={ { backgroundImage: `url(${correctThumb})` } }
      >
        <div className="info-header">
          <h2
            data-testid="recipe-category"
            className="recipe-category"
          >
            {obj.strCategory}
          </h2>
          <ButtonShareAndFavorite recipeDetails={ recipeDetails } />
        </div>
        <div className="header-details-title">
          <h1 data-testid="recipe-title" className="title">{obj.strMeal}</h1>
        </div>
      </header>

      <div>
        <h3 className="ingredient-titlte typography">Ingredients</h3>
        <div className="ingredients-recipe-details details-tipo">
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
        </div>

      </div>
      <div className="div-recommendation-recipe-details">
        <h3 className="instructions-title typography">Instructions</h3>
        <div className="instructions-recipe-details details-tipo">
          <p data-testid="instructions">{obj.strInstructions}</p>
        </div>
      </div>
      <div className="kuhaku" />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ finishRecipe }
        className="start-recipe-btn"
      >
        FINISH RECIPE
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipeDetails: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strTags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default RecipeInProgress;
