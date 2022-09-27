import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ListIngredients from './ListIngredients';

const arrayNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

function RecipeInProgress() {
  const [obj, setObj] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const { pathname } = useLocation();
  const local = pathname.split('/');
  const correctUrl = local[1] === 'meals' ? 'themealdb' : 'thecocktaildb';

  const getApi = async () => {
    const response = await fetch(`https://www.${correctUrl}.com/api/json/v1/1/lookup.php?i=${local[2]}`);
    const data = await response.json();
    const correctInfo = local[1] === 'meals' ? data.meals : data.drinks;
    console.log(data);
    return setObj(correctInfo[0]);
  };

  useEffect(() => {
    getApi();
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
      const valid2 = instructions !== ' ' && instructions !== 'undefined undefined';
      const result = valid && valid2 ? array = [...array, instructions] : ' ';
      return result;
    });
    setIngredients(array);
  };

  useEffect(() => {
    structuringRecipe();
  }, [obj]);

  return (
    <div>
      <img alt="Algo" data-testid="recipe-photo" />
      <img alt="Category" />
      <h3 data-testid="recipe-category">{obj.strCategory}</h3>
      <button type="button" data-testid="share-btn">
        <img alt="Algo" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img alt="Algo" />
      </button>
      <h1 data-testid="recipe-title">{obj.strMeal}</h1>
      <fieldset>
        INGREDIENTES
        {ingredients?.map((m, index) => (
          <ListIngredients key={ index } index={ index } m={ m } />
        ))}
      </fieldset>
      <h2>Instructions</h2>
      <p data-testid="instructions">{obj.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        FINISH RECIPE
      </button>
    </div>
  );
}

export default RecipeInProgress;
