import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Carrousel.css';
import PropTypes from 'prop-types';

const LIMIT_ITENS_CAROSEL = 6;

function Carrousel({ mealId }) {
  const [RecommendedRecipesMeals, setRecommendedRecipesMeals] = useState([]);
  const [RecommendedRecipesDrinks, setRecommendedRecipesDrinks] = useState([]);
  console.log(RecommendedRecipesMeals);
  useEffect(() => {
    const fetchRecommendedRecipesMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecommendedRecipesMeals(data.meals.slice(0, LIMIT_ITENS_CAROSEL));
    };
    const fetchRecommendedRecipesDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecommendedRecipesDrinks(data.drinks.slice(0, LIMIT_ITENS_CAROSEL));
    };
    // const validFetch = () => (mealId === undefined
    //   ? fetchRecommendedRecipesDrinks() : fetchRecommendedRecipesMeals());
    // validFetch();
    fetchRecommendedRecipesDrinks();
    fetchRecommendedRecipesMeals();
  }, []);

  return (
    <div>
      {mealId === undefined ? (
        <div className="container">
          {RecommendedRecipesMeals.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div
              key={ idMeal }
              className="caroseul"
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="images"
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {strMeal}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="container">
          {RecommendedRecipesDrinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div
              key={ idDrink }
              className="caroseul"
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="images"
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {strDrink}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Carrousel.propTypes = {
  // drinkId: PropTypes.string.isRequired,
  mealId: PropTypes.string.isRequired,
};

export default Carrousel;
