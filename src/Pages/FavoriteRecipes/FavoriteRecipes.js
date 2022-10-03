import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import icon from '../../images/shareIcon.svg';
import favIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [msg, setMsg] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [typeBtn, setTypeBtn] = useState('');
  const hiddenCopiedMessageTime = 3000;
  // imprimi na tela por 3 seg Link copied! e fovoritar
  const shareRecipe = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setMsg(true);
    setTimeout(() => setMsg(false), hiddenCopiedMessageTime);
  };
  // faz um useEffect localStorage
  const selectedFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setFavorite(selectedFav);
    // eslint-disable-next-line
  }, []);
  // remove favoritar
  const removeFavorites = (id) => {
    const selectedFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const selectedRecipe = selectedFavorite.filter(
      (recipe) => recipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(selectedRecipe));
    console.log(selectedRecipe);
    setFavorite(selectedRecipe);
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
        {msg && <span>Link copied!</span>}
      </div>
      <div className="favCardsContainer">
        {favorite
          && favorite
            .filter((element) => (!typeBtn ? element : element.type === typeBtn))
            .map((recipe, index) => {
              console.log(recipe);
              return (
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
                  <input
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    type="image"
                    src={ favIcon }
                    alt="favoriteIcon"
                    onClick={ () => removeFavorites(recipe.id) }
                  />
                </section>
              );
            })}
      </div>
    </section>
  );
}
export default FavoriteRecipes;
