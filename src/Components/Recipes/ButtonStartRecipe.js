import React from 'react';
import './ButtonStartRecipe.css';

function ButtonStartRecipe() {
  return (
    <div>
      <button
        className="button"
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default ButtonStartRecipe;
