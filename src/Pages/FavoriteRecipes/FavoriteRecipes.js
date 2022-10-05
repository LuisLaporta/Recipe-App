import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';

import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';
import icon from '../../images/shareIcon.svg';
import favIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [typeBtn, setTypeBtn] = useState('');
  const [idOfRecipeCopied, setIdOfRecipeCopied] = useState('0');
  const HIDDEN_COPIED_MESSAGE_TIME = 3000;

  useEffect(() => {
    const selectedFav = getLocalStorage('favoriteRecipes');
    setFavoriteList(selectedFav);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIdOfRecipeCopied('0'), HIDDEN_COPIED_MESSAGE_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [idOfRecipeCopied]);

  const removeFavorites = (id) => {
    const selectedFavorite = getLocalStorage('favoriteRecipes');
    const selectedRecipe = selectedFavorite.filter(
      (recipe) => recipe.id !== id,
    );
    setLocalStorage('favoriteRecipes', selectedRecipe);
    setFavoriteList(selectedRecipe);
  };

  const shareRecipe = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setIdOfRecipeCopied(id);
  };

  return (
    <section className="FavoriteRecipe">
      <div className="filterContainer">
        <button
          type="button"
          className="filter-food"
          onClick={ () => setTypeBtn('meal') }
          data-testid="filter-by-meal-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setTypeBtn('drink') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setTypeBtn('') }
        >
          All
        </button>
      </div>

      <div className="favCardsContainer">
        {favoriteList.length > 0
          && favoriteList
            .filter((element) => (!typeBtn ? element : element.type === typeBtn))
            .map((recipe, index) => (
              <section key={ index }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="card"
                    width="300px"
                  />
                </Link>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h4 data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </h4>
                </Link>
                <h2 data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot}
                </h2>
                <input
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="image"
                  src={ icon }
                  alt="shareIcon"
                  onClick={ () => shareRecipe(recipe.type, recipe.id) }
                />
                {recipe.id === idOfRecipeCopied && <span>Link copied!</span>}
                <input
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="image"
                  src={ favIcon }
                  alt="favoriteIcon"
                  onClick={ () => removeFavorites(recipe.id) }
                />
              </section>
            ))}
      </div>
    </section>
  );
}
export default FavoriteRecipes;
