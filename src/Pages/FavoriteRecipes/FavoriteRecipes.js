import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import icon from '../../images/shareIcon.svg';
import favIcon from '../../images/blackHeartIcon.svg';
import allIcon from '../../images/allIcon.svg';
import foodIcon from '../../images/mealsIcon.svg';
import drinkIcon from '../../images/drinksIcon.svg';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import '../../css/favorite.css';

function FavoriteRecipes() {
  const [msg, setMsg] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [typeBtn, setTypeBtn] = useState('');
  const hiddenCopiedMessageTime = 3000;

  const shareRecipe = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setMsg(true);
    setTimeout(() => setMsg(false), hiddenCopiedMessageTime);
  };

  const selectedFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setFavorite(selectedFav);
  }, []);

  const removeFavorites = (id) => {
    const selectedFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const selectedRecipe = selectedFavorite.filter(
      (recipe) => recipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(selectedRecipe));
    setFavorite(selectedRecipe);
  };
  return (
    <section className="FavoriteRecipe">
      <Header title="Favorite" disabled={ false } />
      <section className="filterContainer">
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setTypeBtn('') }
          >
            <img src={ allIcon } alt="All Icon" />
          </button>
          <p>All</p>
        </div>
        <div>
          <button
            type="button"
            className="filter-food"
            onClick={ () => setTypeBtn('meal') }
            data-testid="filter-by-meal-btn"
          >
            <img src={ foodIcon } alt="Food Icon" />
          </button>
          <p>Food</p>
        </div>
        <div>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setTypeBtn('drink') }
          >
            <img src={ drinkIcon } alt="Drink Icon" />
          </button>
          <p>Drinks</p>
        </div>
      </section>
      {msg && <span>Link copied!</span>}
      <section className="favCardsContainer">
        {favorite
          && favorite
            .filter((element) => (!typeBtn ? element : element.type === typeBtn))
            .map((recipe, index) => (
              <div key={ index } className="card">
                <div className="img-info">
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt="card"
                      className="img-card"
                    />
                  </Link>
                  <div className="info-card">
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
                      className="inp-share"
                      onClick={ () => shareRecipe(recipe.type, recipe.id) }
                    />
                    <input
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      type="image"
                      src={ favIcon }
                      alt="favoriteIcon"
                      className="inp-fav"
                      onClick={ () => removeFavorites(recipe.id) }
                    />
                  </div>
                </div>
              </div>
            ))}
      </section>
      <div className="free" />
      <Footer />
    </section>
  );
}
export default FavoriteRecipes;
