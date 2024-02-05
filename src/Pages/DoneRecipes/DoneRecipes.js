import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { format } from 'date-fns';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';
import shareButton from '../../images/shareIcon.svg';
import allIcon from '../../images/allIcon.svg';
import foodIcon from '../../images/mealsIcon.svg';
import drinkIcon from '../../images/drinksIcon.svg';
import './DoneRecipes.css';
import '../../css/favorite.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState({
    meals: [],
    drinks: [],
    all: [],
  });

  const [filterSelected, setFilterSelected] = useState('all');

  const [copiedLink, setCopiedLink] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const listOfDoneRecipes = getLocalStorage('doneRecipes');
    if (listOfDoneRecipes !== null) {
      setDoneRecipes((prevDoneRecipes) => ({
        ...prevDoneRecipes,
        meals: listOfDoneRecipes.filter((recipe) => recipe.type === 'meal'),
        drinks: listOfDoneRecipes.filter((recipe) => recipe.type === 'drink'),
        all: listOfDoneRecipes || [],
      }));
    } else {
      setDoneRecipes({
        meals: [],
        drinks: [],
        all: [],
      });
      setLocalStorage('doneRecipes', []);
    }
  }, []);

  const handleFilter = (filter) => {
    setFilterSelected(filter);
  };

  const shareRecipe = (type, id) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    setCopiedLink(id);
  };

  return (
    <div>
      <Header title="Done" disabled={ false } />
      <section className="filterContainer">
        <div>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => handleFilter('all') }
          >
            <img src={ allIcon } alt="All Icon" />
          </button>
          <p>All</p>
        </div>
        <div>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            onClick={ () => handleFilter('meals') }
          >
            <img src={ foodIcon } alt="Food Icon" />
          </button>
          <p>Food</p>
        </div>
        <div>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => handleFilter('drinks') }
          >
            <img src={ drinkIcon } alt="Drink Icon" />
          </button>
          <p>Drinks</p>
        </div>
      </section>
      <section className="favCardsContainer">
        { doneRecipes[filterSelected]
        && doneRecipes[filterSelected].length > 0 ? (
            doneRecipes[filterSelected].map((recipe, index) => (
              <div
                key={ index }
                className="card"
              >
                <div className="img-info">
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                      className="img-card"
                    />
                  </Link>
                  <div className="info-card">
                    <h4
                      role="presentation"
                      data-testid={ `${index}-horizontal-name` }
                      onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                    >
                      {recipe.name}
                    </h4>
                    <h2 data-testid={ `${index}-horizontal-top-text` }>
                      {recipe.type === 'meal'
                        ? `${recipe.nationality} - ${recipe.category}`
                        : recipe.alcoholicOrNot}
                    </h2>
                    <p
                      className="info-date"
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      { `Done in: ${format(new Date(recipe.doneDate), 'dd/MM/yyyy')}`}
                    </p>
                    <div>
                      <input
                        data-testid={ `${index}-horizontal-share-btn` }
                        type="image"
                        src={ shareButton }
                        alt="shareIcon"
                        className="inp-share"
                        onClick={ () => shareRecipe(recipe.type, recipe.id) }
                      />
                    </div>
                  </div>
                </div>
                {copiedLink === recipe.id && <p>Link copied!</p>}
              </div>
            ))
          ) : (<p>{}</p>
          )}
      </section>
      <div className="free" />
      <Footer />
    </div>
  );
}

export default DoneRecipes;
