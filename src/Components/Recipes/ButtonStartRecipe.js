import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';
import './ButtonStartRecipe.css';

const MOCK_DONE_RECIPES = [{
  id: '52977',
  type: 'meal',
  nationality: '',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  doneDate: '30/09/2022',
  tags: [],
},
{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  doneDate: '30/09/2022',
  tags: [],
},
];

const MOCK_RECIPES_INPROGRESS = {
  drinks: {
    17222: [],
  },
  meals: {
    53060: [],
  },
};

function ButtonStartRecipe({ mealId, drinkId }) {
  const [alldoneRecipes, setAllDoneRecipes] = useState([]);
  const [allMealsProgressRecipes, setMealsProgressRecipes] = useState([]);
  const [allDrinksProgressRecipes, setDrinksProgressReicpes] = useState([]);

  useEffect(() => {
    setLocalStorage('doneRecipes', MOCK_DONE_RECIPES);
    setLocalStorage('inProgressRecipes', MOCK_RECIPES_INPROGRESS);

    setAllDoneRecipes(getLocalStorage('doneRecipes'));

    const drinksProgressRecipes = () => {
      const LS = getLocalStorage('inProgressRecipes');
      const arrKeysConverted = Object.keys(LS.drinks);
      setDrinksProgressReicpes(arrKeysConverted);
    };

    const mealsProgressRecipes = () => {
      const LS = getLocalStorage('inProgressRecipes');
      const arrKeysConverted = Object.keys(LS.meals);
      setMealsProgressRecipes(arrKeysConverted);
    };

    drinksProgressRecipes();
    mealsProgressRecipes();
  }, []);

  const history = useHistory();
  const { pathname } = useLocation();

  const validButton = () => {
    const valids = [];
    const ARRAY_IDS = [mealId, drinkId];
    alldoneRecipes.forEach((done) => {
      valids.push(ARRAY_IDS.includes(done.id));
    });
    return !valids.includes(true);
  };

  const validButtonProgress = () => {
    const valids = [];
    const ARRAY_IDS = [mealId, drinkId];
    allDrinksProgressRecipes.forEach((done) => {
      valids.push(ARRAY_IDS.includes(done));
    });
    allMealsProgressRecipes.forEach((done) => {
      valids.push(ARRAY_IDS.includes(done));
    });
    return valids.includes(true);
  };

  console.log(validButton());

  return (
    <div>
      {validButton() && (
        <button
          className="button"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          {validButtonProgress() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}

      {/* {validButton() && (
        <button
          className="button"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          Start Recipe
        </button>
      )}
      {validButtonProgress() && (
        <button
          className="button"
          data-testid="start-recipe-btn"
          type="button"
        >
          Continue Recipe
        </button>
      )} */}

    </div>
  );
}

ButtonStartRecipe.propTypes = {
  mealId: PropTypes.string.isRequired,
  drinkId: PropTypes.string.isRequired,
};

export default ButtonStartRecipe;
