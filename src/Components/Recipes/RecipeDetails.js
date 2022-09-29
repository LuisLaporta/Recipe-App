import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeDetails({ mealId, drinkId }) {
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinksID, setDataDrinksID] = useState([]);
  console.log(mealId);
  console.log(drinkId);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      setDataMeals(data.meals);
    };

    const fetchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
      const data = await response.json();
      setDataDrinksID(data.drinks);
      console.log(dataDrinksID);
    };
    const validFetch = () => (mealId === undefined ? fetchDrinks() : fetchMeals());
    validFetch();
  }, []);

  return (
    <div>
      {mealId === undefined ? (
        <div>
          {dataDrinksID?.map((drink) => (
            <div key={ drink.strDrink }>
              <img
                data-testid="recipe-photo"
                alt={ drink.strDrink }
                src={ drink.strDrinkThumb }
              />
              <h3
                data-testid="recipe-title"
              >
                {drink.strDrink}
              </h3>
              <h4
                data-testid="recipe-category"
              >
                {drink.strAlcoholic}
              </h4>
              <ul style={ { listStyle: 'none' } }>
                <li data-testid="0-ingredient-name-and-measure">
                  {`${drink.strMeasure1} ${drink.strIngredient1}`}
                </li>
                <li data-testid="1-ingredient-name-and-measure">
                  {`${drink.strMeasure2} ${drink.strIngredient2}`}
                </li>
                <li data-testid="2-ingredient-name-and-measure">
                  {`${drink.strMeasure3} ${drink.strIngredient3}`}
                </li>
                <li data-testid="3-ingredient-name-and-measure">
                  {`${drink.strMeasure4} ${drink.strIngredient4}`}
                </li>
                <li data-testid="4-ingredient-name-and-measure">
                  {`${drink.strMeasure5} ${drink.strIngredient5}`}
                </li>
                <li data-testid="5-ingredient-name-and-measure">
                  {`${drink.strMeasure6} ${drink.strIngredient6}`}
                </li>
                <li data-testid="6-ingredient-name-and-measure">
                  {`${drink.strMeasure7} ${drink.strIngredient7}`}
                </li>
                <li data-testid="7-ingredient-name-and-measure">
                  {`${drink.strMeasure8} ${drink.strIngredient8}`}
                </li>
                <li data-testid="8-ingredient-name-and-measure">
                  {`${drink.strMeasure9} ${drink.strIngredient9}`}
                </li>
                <li data-testid="9-ingredient-name-and-measure">
                  {`${drink.strMeasure10} ${drink.strIngredient10}`}
                </li>
                <li data-testid="10-ingredient-name-and-measure">
                  {`${drink.strMeasure11} ${drink.strIngredient11}`}
                </li>
                <li data-testid="11-ingredient-name-and-measure">
                  {`${drink.strMeasure12} ${drink.strIngredient12}`}
                </li>
                <li data-testid="12-ingredient-name-and-measure">
                  {`${drink.strMeasure13} ${drink.strIngredient13}`}
                </li>
                <li data-testid="13-ingredient-name-and-measure">
                  {`${drink.strMeasure14} ${drink.strIngredient14}`}
                </li>
                <li data-testid="14-ingredient-name-and-measure">
                  {`${drink.strMeasure15} ${drink.strIngredient15}`}
                </li>
                <li data-testid="15-ingredient-name-and-measure">
                  {`${drink.strMeasure16} ${drink.strIngredient16}`}
                </li>
                <li data-testid="16-ingredient-name-and-measure">
                  {`${drink.strMeasure17} ${drink.strIngredient17}`}
                </li>
                <li data-testid="17-ingredient-name-and-measure">
                  {`${drink.strMeasure18} ${drink.strIngredient18}`}
                </li>
                <li data-testid="18-ingredient-name-and-measure">
                  {`${drink.strMeasure19} ${drink.strIngredient19}`}
                </li>
                <li data-testid="19-ingredient-name-and-measure">
                  {`${drink.strMeasure20} ${drink.strIngredient20}`}
                </li>
              </ul>
              <p data-testid="instructions">
                {drink.strInstructions}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {
            dataMeals.map((recipe) => (
              <div key={ recipe.strMeal }>
                <img
                  data-testid="recipe-photo"
                  alt={ recipe.strMeal }
                  src={ recipe.strMealThumb }
                />
                <h3
                  data-testid="recipe-title"
                >
                  {recipe.strMeal}
                </h3>
                <h4
                  data-testid="recipe-category"
                >
                  {recipe.strCategory}
                </h4>
                <ul style={ { listStyle: 'none' } }>
                  <li data-testid="0-ingredient-name-and-measure">
                    {`${recipe.strMeasure1} ${recipe.strIngredient1}`}
                  </li>
                  <li data-testid="1-ingredient-name-and-measure">
                    {`${recipe.strMeasure2} ${recipe.strIngredient2}`}
                  </li>
                  <li data-testid="2-ingredient-name-and-measure">
                    {`${recipe.strMeasure3} ${recipe.strIngredient3}`}
                  </li>
                  <li data-testid="3-ingredient-name-and-measure">
                    {`${recipe.strMeasure4} ${recipe.strIngredient4}`}
                  </li>
                  <li data-testid="4-ingredient-name-and-measure">
                    {`${recipe.strMeasure5} ${recipe.strIngredient5}`}
                  </li>
                  <li data-testid="5-ingredient-name-and-measure">
                    {`${recipe.strMeasure6} ${recipe.strIngredient6}`}
                  </li>
                  <li data-testid="6-ingredient-name-and-measure">
                    {`${recipe.strMeasure7} ${recipe.strIngredient7}`}
                  </li>
                  <li data-testid="7-ingredient-name-and-measure">
                    {`${recipe.strMeasure8} ${recipe.strIngredient8}`}
                  </li>
                  <li data-testid="8-ingredient-name-and-measure">
                    {`${recipe.strMeasure9} ${recipe.strIngredient9}`}
                  </li>
                  <li data-testid="9-ingredient-name-and-measure">
                    {`${recipe.strMeasure10} ${recipe.strIngredient10}`}
                  </li>
                  <li data-testid="10-ingredient-name-and-measure">
                    {`${recipe.strMeasure11} ${recipe.strIngredient11}`}
                  </li>
                  <li data-testid="11-ingredient-name-and-measure">
                    {`${recipe.strMeasure12} ${recipe.strIngredient12}`}
                  </li>
                  <li data-testid="12-ingredient-name-and-measure">
                    {`${recipe.strMeasure13} ${recipe.strIngredient13}`}
                  </li>
                  <li data-testid="13-ingredient-name-and-measure">
                    {`${recipe.strMeasure14} ${recipe.strIngredient14}`}
                  </li>
                  <li data-testid="14-ingredient-name-and-measure">
                    {`${recipe.strMeasure15} ${recipe.strIngredient15}`}
                  </li>
                  <li data-testid="15-ingredient-name-and-measure">
                    {`${recipe.strMeasure16} ${recipe.strIngredient16}`}
                  </li>
                  <li data-testid="16-ingredient-name-and-measure">
                    {`${recipe.strMeasure17} ${recipe.strIngredient17}`}
                  </li>
                  <li data-testid="17-ingredient-name-and-measure">
                    {`${recipe.strMeasure18} ${recipe.strIngredient18}`}
                  </li>
                  <li data-testid="18-ingredient-name-and-measure">
                    {`${recipe.strMeasure19} ${recipe.strIngredient19}`}
                  </li>
                  <li data-testid="19-ingredient-name-and-measure">
                    {`${recipe.strMeasure20} ${recipe.strIngredient20}`}
                  </li>
                </ul>
                <p data-testid="instructions">
                  {recipe.strInstructions}
                </p>
                <iframe
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ recipe.strYoutube }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))
          }
        </div>
      )}

      {console.log(dataMeals)}
      {console.log(dataDrinksID)}
    </div>
  );
}

RecipeDetails.propTypes = {
  mealId: PropTypes.string.isRequired,
  drinkId: PropTypes.string.isRequired,
};

export default RecipeDetails;
