import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/Recipes/RecipeDetails';
import Carrousel from '../../Components/Recipes/Carrousel';
import ButtonStartRecipe from '../../Components/Recipes/ButtonStartRecipe';
import ButtonShareAndFavorite from '../../Components/Recipes/ButtonShareAndFavorite';

function MealId({ match: { params: { id } } }) {
  return (
    <div>
      <ButtonShareAndFavorite mealId={ id } />
      <RecipeDetails mealId={ id } />
      <Carrousel mealId={ id } />
      <ButtonStartRecipe mealId={ id } />
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
