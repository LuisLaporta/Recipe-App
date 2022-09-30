import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareButton from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';

function ButtonShareAndFavorite({ mealId, drinkId }) {
  const { pathname } = useLocation();
  const [copiedLink, setCopiedLink] = useState('');
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinksID, setDataDrinksID] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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
    };
    const validFetch = () => (mealId === undefined ? fetchDrinks() : fetchMeals());

    const validButton = () => {
      const valids = [];
      const ARRAY_IDS = [mealId, drinkId];
      const LS = getLocalStorage('favoriteRecipes');
      LS?.forEach((done) => {
        valids.push(ARRAY_IDS.includes(done.id));
      });
      setIsFavorite(valids.includes(true));
    };

    validButton();
    validFetch();
  }, []);

  const screen = pathname.includes('meals') ? 'meals' : 'drinks';

  const handleClickShare = () => {
    const path = pathname === `/${screen}/${mealId || drinkId}/in-progress`
      ? `/${screen}/${mealId || drinkId}` : pathname;
    navigator.clipboard.writeText(`${window.location.origin}${path}`);
    setCopiedLink('Link copied!');
  };

  const handleClickFavorite = () => {
    const currentFavorite = getLocalStorage('favoriteRecipes');
    setIsFavorite(!isFavorite);
    if (currentFavorite === null) {
      setLocalStorage('favoriteRecipes', []);
    }
    const currentFavorite2 = getLocalStorage('favoriteRecipes');
    const favorite = {
      id: dataDrinksID.length === 0 ? dataMeals[0].idMeal : dataDrinksID[0].idDrink,
      type: dataDrinksID.length === 0 ? 'meal' : 'drink',
      nationality: mealId ? dataMeals[0].strArea : '',
      category: dataDrinksID.length === 0
        ? dataMeals[0].strCategory : dataDrinksID[0].strCategory,
      alcoholicOrNot: drinkId !== undefined
        ? dataDrinksID[0].strAlcoholic : '',
      name: dataDrinksID.length === 0 ? dataMeals[0].strMeal : dataDrinksID[0].strDrink,
      image: dataDrinksID.length === 0
        ? dataMeals[0].strMealThumb : dataDrinksID[0].strDrinkThumb,
    };
    setLocalStorage('favoriteRecipes', [...currentFavorite2, favorite]);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickShare }
        data-testid="share-btn"
      >
        <img src={ shareButton } alt="share button" />
      </button>
      <h1>{copiedLink}</h1>
      <button
        type="button"
        onClick={ handleClickFavorite }
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeart : whiteHeart }
      >
        <img src={ isFavorite ? blackHeart : whiteHeart } alt="favorite button" />
      </button>
    </div>
  );
}

ButtonShareAndFavorite.propTypes = {
  mealId: PropTypes.string.isRequired,
  drinkId: PropTypes.string.isRequired,
};

export default ButtonShareAndFavorite;
