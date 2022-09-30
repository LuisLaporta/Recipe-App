import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';
import Carrousel from '../../Components/Carrousel/Carrousel';

function MealId({ match: { params: { id } } }) {
  return (
    <div>
      <RecipeDetails mealId={ id } />
      <Carrousel mealId={ id } />
    </div>
  );
}

MealId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MealId;
