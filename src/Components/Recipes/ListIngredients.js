import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';

function ListIngredients({ index, m, local, idRecipe }) {
  const [done, setDone] = useState('');
  const meals = { [idRecipe]: [] };
  const drinks = { [idRecipe]: [] };

  useEffect(() => {
    const teste = getLocalStorage('inProgressRecipes');
    if (!teste) setLocalStorage('inProgressRecipes', { meals, drinks });

    if (teste) {
      const correctAcess = local === 'meals' ? teste.meals : teste.drinks;
      return Object.keys(correctAcess).includes(idRecipe)
        ? setDone(correctAcess[idRecipe]?.includes(m))
        : setLocalStorage('inProgressRecipes', {
          meals: { ...teste.meals, [idRecipe]: [] },
          drinks: { ...teste.drinks, [idRecipe]: [] },
        });
    }
  }, []);

  const handleChange = (target) => {
    const { name } = target;
    console.log(target);
    setDone(!done);
    let inProgress = {};
    const teste = getLocalStorage('inProgressRecipes');

    if (local === 'meals' && !done) {
      teste.meals[idRecipe] = [...teste.meals[idRecipe], name];
      inProgress = { meals: teste.meals, drinks: teste.drinks };
      setLocalStorage('inProgressRecipes', inProgress);
    }
    if (local === 'drinks' && !done) {
      teste.drinks[idRecipe] = [...teste.drinks[idRecipe], name];
      inProgress = { drinks: teste.drinks, meals: teste.meals };
      setLocalStorage('inProgressRecipes', inProgress);
    }
  };

  return (
    <div>
      <label
        key={ index }
        htmlFor={ index }
        style={ { textDecoration: done ? 'line-through' : 'none' } }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          name={ m }
          id={ index }
          checked={ done }
          onChange={ ({ target }) => handleChange(target) }
        />
        {m}
      </label>
    </div>
  );
}

ListIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  m: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default ListIngredients;
