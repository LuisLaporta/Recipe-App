import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';

function ListIngredients({ index, m, local, idRecipe, finishiRecipe }) {
  const [done, setDone] = useState(true);
  const meals = { [idRecipe]: [] };
  const drinks = { [idRecipe]: [] };

  useEffect(() => {
    setDone(false);
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
    setDone(!done);
    let inProgress = {};
    const teste = getLocalStorage('inProgressRecipes');

    if (local === 'meals' && !done) {
      teste.meals[idRecipe] = [...teste.meals[idRecipe], name];
      inProgress = { meals: teste.meals, drinks: teste.drinks };
      setLocalStorage('inProgressRecipes', inProgress);
      finishiRecipe(teste.meals[idRecipe]);
    }
    if (local === 'drinks' && !done) {
      teste.drinks[idRecipe] = [...teste.drinks[idRecipe], name];
      inProgress = { drinks: teste.drinks, meals: teste.meals };
      setLocalStorage('inProgressRecipes', inProgress);
      finishiRecipe(teste.drinks[idRecipe]);
    }
  };

  return (
    <div>
      <label
        key={ index }
        htmlFor={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ `label-check ${done ? 'checked' : ''}` }
      >
        <input
          type="checkbox"
          name={ m }
          id={ index }
          checked={ done }
          onChange={ ({ target }) => handleChange(target) }
          className="input-check"
        />
        <p>{m}</p>
      </label>
    </div>
  );
}

ListIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  m: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
  finishiRecipe: PropTypes.func.isRequired,
};

export default ListIngredients;
