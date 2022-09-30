import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';
import Carrousel from '../../Components/Recipes/Carrousel';
import ButtonStartRecipe from '../../Components/Recipes/ButtonStartRecipe';

function DrinkId({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeDetails drinkId={ id } />
      <Carrousel drinkId={ id } />
      <ButtonStartRecipe />
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
