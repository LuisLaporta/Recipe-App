import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ListIngredients({ index, m }) {
  const [check, setCheck] = useState(false);

  return (
    <div>
      <label
        key={ index }
        htmlFor={ index }
        style={ { textDecoration: check ? 'line-through' : 'none' } }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          name={ m }
          id={ index }
          onChange={ () => setCheck(!check) }
        />
        {m}
      </label>
    </div>
  );
}

ListIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  m: PropTypes.string.isRequired,
};

export default ListIngredients;
