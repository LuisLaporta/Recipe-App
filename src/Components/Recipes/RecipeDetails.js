import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import requestRecipesApi from '../../Services/RequestRecipesApi';
import './RecipeDetails.css';
import { getLocalStorage } from '../../Services/LocalStorage';
import ButtonShareAndFavorite from './ButtonShareAndFavorite';

const MAX_RECOMMENDATIONS = 6;

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState({
    allRecommendations: [],
    selectedRecommendations: [],
  });
  const [recipeIsDone, setRecipeIsDone] = useState(false);
  const [isInProgressRecipes, setIsInProgressRecipes] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const response = pathname.includes('/meals')
        ? await requestRecipesApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        : await requestRecipesApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      return pathname.includes('/meals')
        ? setRecipeDetails(response.meals[0])
        : setRecipeDetails(response.drinks[0]);
    };
    fetchApi();
  }, [pathname]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = pathname.includes('/meals')
        ? await requestRecipesApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        : await requestRecipesApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecommendations({
        ...recommendations,
        allRecommendations: response.drinks || response.meals,
      });
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const { allRecommendations } = recommendations;
    if (allRecommendations.length > 0) {
      const randomRecomendations = [];
      for (let index = 0; index < MAX_RECOMMENDATIONS; index += 1) {
        randomRecomendations.push(allRecommendations[index]);
      }
      setRecommendations({
        ...recommendations,
        selectedRecommendations: randomRecomendations,
      });
    }
  }, [recommendations.allRecommendations]);

  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes');
    if (doneRecipes !== null) {
      const isDone = doneRecipes?.some(
        (recipe) => recipe.id === id,
      );
      setRecipeIsDone(isDone);
    }
  }, []);

  useEffect(() => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes !== null) {
      const isRecipeInProgress = pathname.includes('/meals')
        ? inProgressRecipes?.meals[id] !== undefined
        : inProgressRecipes?.drinks[id] !== undefined;
      setIsInProgressRecipes(isRecipeInProgress);
    }
  }, []);

  const ingredientsKeys = Object.keys(recipeDetails).filter(
    (key) => key.includes('strIngredient'),
  );

  const ingredientsKeysFiltered = ingredientsKeys.filter(
    (key) => recipeDetails[key] !== null && recipeDetails[key] !== '',
  );

  return (
    <main className="main-description">
      <header
        className="header-details"
        style={ {
          backgroundImage: `url(${recipeDetails.strMealThumb
            || recipeDetails.strDrinkThumb})`,
        } }
      >
        <div className="info-header">
          <h2 data-testid="recipe-category" className="recipe-category">
            {pathname.includes('/meals')
              ? recipeDetails.strCategory
              : recipeDetails.strAlcoholic}
          </h2>
          <ButtonShareAndFavorite recipeDetails={ recipeDetails } />
        </div>
        <div className="header-details-title">
          <h1 data-testid="recipe-title" className="title">
            {recipeDetails.strMeal || recipeDetails.strDrink}
          </h1>
        </div>
      </header>

      <div className="div-ingredients-recipe-details">
        <h3 className="ingredient-titlte typography">Ingredients</h3>
        <div className="ingredients-recipe-details details-tipo">
          <ul>
            {ingredientsKeysFiltered.map((key, index) => {
              const measurements = recipeDetails[`strMeasure${index + 1}`];
              return (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {recipeDetails[key]}
                  {measurements !== null && ` - ${measurements}`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="div-instructions-recipe-details">
        <h3 className="instructions-title typography">Instructions</h3>
        <div className="instructions-recipe-details details-tipo">
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <div className="recipe-details-youtube">
            {recipeDetails.strYoutube && (
              <iframe
                data-testid="video"
                width="300"
                src={ recipeDetails.strYoutube.replace('watch?v=', 'embed/') }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>

      <div className="div-recommendation-recipe-details">
        <h3 className="reco-title typography">Recommended</h3>
        <section className="section-recommendation">
          {recommendations.selectedRecommendations.map((recommendation, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recommendation-card"
              onClick={ () => (
                pathname.includes('/meals')
                  ? history.push(`/drinks/${recommendation.idDrink}`)
                  : history.push(`/meals/${recommendation.idMeal}`)
              ) }
              role="presentation"
            >
              <img
                data-testid={ `${index}-recomendation-card-img` }
                src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
                alt={ recommendation.strMeal || recommendation.strDrink }
              />
              <div className="rec-title">
                <h4 data-testid={ `${index}-recommendation-title` }>
                  {recommendation.strMeal || recommendation.strDrink}
                </h4>
              </div>
            </div>
          ))}
        </section>
      </div>

      {!recipeIsDone && (
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(
            `${pathname}/in-progress`,
          ) }
        >
          {isInProgressRecipes ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </main>
  );
}

export default RecipeDetails;
