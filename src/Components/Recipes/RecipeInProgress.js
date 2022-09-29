import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ListIngredients from './ListIngredients';
import ShareIcon from '../../images/shareIcon.svg';
import favorited from '../../images/blackHeartIcon.svg';
import desFavorited from '../../images/whiteHeartIcon.svg';
import { getLocalStorage, setLocalStorage } from '../../Services/LocalStorage';

const arrayNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

function RecipeInProgress() {
  const [obj, setObj] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [copiedLink, setCopiedLink] = useState('');
  const [liked, setLiked] = useState();
  const [finishi, setFinishi] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { pathname } = useLocation();
  const local = pathname.split('/');
  const correctUrl = local[1] === 'meals' ? 'themealdb' : 'thecocktaildb';
  const correctId = local[1] === 'meals' ? obj.idMeal : obj.idDrink;
  const correctThumb = local[1] === 'meals' ? obj.strMealThumb : obj.strDrinkThumb;
  const history = useHistory();

  const getApi = async () => {
    const response = await fetch(`https://www.${correctUrl}.com/api/json/v1/1/lookup.php?i=${local[2]}`);
    const data = await response.json();
    const correctInfo = local[1] === 'meals' ? data.meals : data.drinks;
    return setObj(correctInfo[0]);
  };

  const finishiRecipe = (inprogress) => {
    setFinishi(inprogress);
  };

  useEffect(() => {
    getApi();
    const favoritesRecipes = getLocalStorage('favoriteRecipes');
    const newFavorites = favoritesRecipes || [];
    const teste = newFavorites?.some((fav) => fav.id === correctId);
    setLiked(teste);
    finishiRecipe();
  }, []);

  const structuringRecipe = () => {
    let array = [];
    arrayNum.map((n) => {
      const ingredient = `strIngredient${n}`;
      const measure = `strMeasure${n}`;
      const arrayIngredients = obj[ingredient];
      const arrayMeasures = obj[measure];
      const instructions = `${arrayMeasures} ${arrayIngredients}`;
      const valid = instructions !== 'null null' && instructions !== ' null';
      const valid2 = instructions !== ' ' && instructions !== 'undefined undefined';
      const result = valid && valid2 ? array = [...array, instructions] : ' ';
      return result;
    });
    setIngredients(array);
  };

  useEffect(() => {
    structuringRecipe();
  }, [obj]);

  const shareRecipe = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${local[1]}/${local[2]}`);
    setCopiedLink('Link copied!');
  };

  useEffect(() => {
    setDisabled(finishi?.length !== ingredients.length);
  }, [finishi]);

  const addFavorite = (favoritesRecipes) => {
    const favorite = {
      id: local[1] === 'meals' ? obj.idMeal : obj.idDrink,
      type: local[1] === 'meals' ? 'meal' : 'drink',
      nationality: obj.strArea ? obj.strArea : '',
      category: obj.strCategory,
      alcoholicOrNot: obj.strAlcoholic ? obj.strAlcoholic : '',
      name: local[1] === 'meals' ? obj.srtMeal : obj.srtDrink,
      image: local[1] === 'meals' ? obj.strMealThumb : obj.strDrinkThumb,
    };
    const newFavorites = favoritesRecipes || [];
    setLocalStorage('favoriteRecipes', [...newFavorites, favorite]);
  };

  // const deletFavorite = (favoritesRecipes) => {
  //   const removeFavorite = favoritesRecipes.filter((recipe) => recipe.id !== correctId);
  //   setLocalStorage('favoriteRecipes', removeFavorite);
  // };

  const favoriteRecipe = () => {
    setLiked(!liked);
    const favoritesRecipes = getLocalStorage('favoriteRecipes');
    addFavorite(favoritesRecipes);
    // if (!liked) {
    //   addFavorite(favoritesRecipes);
    // }
    // else {
    //   deletFavorite(favoritesRecipes);
    // }
  };

  return (
    <div>
      <img src={ correctThumb } alt="Algo" data-testid="recipe-photo" />
      <img alt="Category" />
      <h3 data-testid="recipe-category">{obj.strCategory}</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        <img src={ ShareIcon } alt="Share Icon" />
      </button>
      <button
        type="button"
        onClick={ favoriteRecipe }
        data-testid="favorite-btn"
        src={ liked ? favorited : desFavorited }
      >
        {liked
          ? <img src={ favorited } alt="Favorite Icon" />
          : (
            <img src={ desFavorited } alt="Desfavorite Icon" />
          ) }
      </button>
      <h1>{copiedLink}</h1>
      <h1 data-testid="recipe-title">{obj.strMeal}</h1>
      <fieldset>
        INGREDIENTES
        {ingredients?.map((m, index) => (
          <ListIngredients
            key={ index }
            index={ index }
            m={ m }
            local={ local[1] }
            idRecipe={ local[2] }
            finishiRecipe={ finishiRecipe }
          />
        ))}
      </fieldset>
      <h2>Instructions</h2>
      <p data-testid="instructions">{obj.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ () => history.push('/done-recipes') }
      >
        FINISH RECIPE
      </button>
    </div>
  );
}

export default RecipeInProgress;
