import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';
import shareButtonImage from '../../images/shareIcon.svg';
import whiteFavoriteButtonImage from '../../images/whiteHeartIcon.svg';
import blackFavoriteButtonImage from '../../images/blackHeartIcon.svg';

function ButtonShareAndFavorite({ recipeDetails }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavoritedRecipe, setIsFavoritedRecipe] = useState(false);

  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes) {
      const isFavorited = favoriteRecipes?.some((recipe) => recipe.id === id);
      setIsFavoritedRecipe(isFavorited);
    } else {
      setLocalStorage('favoriteRecipes', []);
    }
  }, []);

  const shareRecipe = () => {
    const mealOrDrink = pathname.includes('/meals') ? '/meals/' : '/drinks/';
    navigator.clipboard.writeText(window.location.origin + mealOrDrink + id);
    setCopiedLink(true);
  };

  const addAndRemoveFavoriteRecipe = () => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes) {
      const recipe = {
        id: recipeDetails.idMeal || recipeDetails.idDrink,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: recipeDetails.strArea || '',
        category: recipeDetails.strCategory || '',
        alcoholicOrNot: recipeDetails.strAlcoholic || '',
        name: recipeDetails.strMeal || recipeDetails.strDrink,
        image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      };
      if (isFavoritedRecipe) {
        const newFavoriteRecipes = favoriteRecipes.filter(
          (favoriteRecipe) => favoriteRecipe.id !== id,
        );
        setLocalStorage('favoriteRecipes', newFavoriteRecipes);
        setIsFavoritedRecipe(false);
      } else {
        setLocalStorage('favoriteRecipes', [...favoriteRecipes, recipe]);
        setIsFavoritedRecipe(true);
      }
    } else {
      setLocalStorage('favoriteRecipes', [...favoriteRecipes, recipe]);
      setIsFavoritedRecipe(true);
    }
  };

  return (
    <section className="share-favorite">
      <button
        type="button"
        className="button-back"
        onClick={ () => window.history.back() }
      >
        <img src="https://img.icons8.com/material-rounded/72/arrow-pointing-left.png" alt="button-back" />
      </button>

      <button
        className="favorite-button"
        type="button"
        data-testid="favorite-btn"
        onClick={ addAndRemoveFavoriteRecipe }
        src={ isFavoritedRecipe ? blackFavoriteButtonImage : whiteFavoriteButtonImage }
      >
        <img
          src={ isFavoritedRecipe ? blackFavoriteButtonImage : whiteFavoriteButtonImage }
          alt="favorite"
        />
      </button>

      <button
        className="share-button"
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
        src={ () => shareButtonImage() }
      >
        <img
          src={ shareButtonImage }
          alt="share"
        />
      </button>
      {copiedLink && <span className="link-copied">Link copied!</span>}

    </section>
  );
}

ButtonShareAndFavorite.propTypes = {
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
  }).isRequired,
};

export default ButtonShareAndFavorite;
