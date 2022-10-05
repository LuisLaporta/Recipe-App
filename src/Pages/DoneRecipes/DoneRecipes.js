import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';
import shareButton from '../../images/shareIcon.svg';
import './DoneRecipes.css';

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
      setDoneRecipes({
        ...doneRecipes,
        meals: listOfDoneRecipes?.filter((recipe) => recipe.type === 'meal'),
        drinks: listOfDoneRecipes?.filter((recipe) => recipe.type === 'drink'),
        all: listOfDoneRecipes,
      });
    } else {
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
      <Header title="Done Recipes" disabledSearch={ false } />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => handleFilter('meals') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleFilter('drinks') }
        >
          Drinks
        </button>
      </section>
      <section>
        {doneRecipes[filterSelected].map((recipe, index) => (
          <div
            key={ index }
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                className="recipe-image"
              />
            </Link>
            <h3
              role="presentation"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            >
              {recipe.name}
            </h3>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Done in: ${recipe.doneDate}`}
            </p>
            {recipe.tags.map((tag, indexTag) => (
              <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </p>
            ))}
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              src={ shareButton }
              onClick={ () => shareRecipe(recipe.type, recipe.id) }
            >
              <img src={ shareButton } alt="share" />
            </button>
            {copiedLink === recipe.id && <p>Link copied!</p>}
          </div>))}
      </section>
    </div>
  );
}

// url = /meals/52771

export default DoneRecipes;
