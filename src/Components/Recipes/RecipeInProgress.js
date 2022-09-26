import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// const LIMIT = 20;

function RecipeInProgress() {
  const [obj, setObj] = useState({});
  // const [ingredients, setIngredients] = useState([]);
  const { pathname } = useLocation();
  const local = pathname.split('/');

  const getApi = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${local[2]}`);
    const data = await response.json();
    return setObj(data.meals[0]);
  };

  useEffect(() => {
    getApi();
  }, []);

  // const structuringRecipe = () => {
  //   let array = [];
  //   let nArray = [];
  //   for (let i = 0; i < LIMIT; i + i) {
  //     const num = 1 + i;
  //     nArray = [...nArray, num];
  //   }
  //   nArray.map((n) => {
  //     const ingredient = `strIngredient${n}`;
  //     const measure = `strMeasure${n}`;
  //     const arrayIngredients = obj[ingredient];
  //     const arrayMeasures = obj[measure];
  //     const instructions = `${arrayMeasures} ${arrayIngredients}`;
  //     const result = instructions !== 'null null' && instructions !== ' '
  //       ? array = [...array, instructions] : ' ';
  //     return result;
  //   });
  //   setIngredients(array);
  // };

  // useEffect(() => {
  //   structuringRecipe();
  // }, [obj]);

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
        {/* {ingredients.map((m, index) => (
          <p key={ index }>{m}</p>
        ))} */}
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
