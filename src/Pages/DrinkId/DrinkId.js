import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';
import Carrousel from '../../Components/Recipes/Carrousel';
import ButtonStartRecipe from '../../Components/Recipes/ButtonStartRecipe';
import ButtonShareAndFavorite from '../../Components/Recipes/ButtonShareAndFavorite';

function DrinkId({ match: { params: { id } } }) {
  return (
    <div>
      <ButtonShareAndFavorite drinkId={ id } />
      <RecipeDetails drinkId={ id } />
      <Carrousel drinkId={ id } />
      <ButtonStartRecipe drinkId={ id } />
    </div>
  );
}

DrinkId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkId;
