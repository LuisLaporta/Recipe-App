import requestRecipesApi from './RequestRecipesApi';

const getRecipe = async ({ typeRadio, inputSearch, pathname }) => {
  const correctPath = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
  let URL;

  switch (typeRadio) {
  case 'Ingredient':
    URL = `https://www.${correctPath}.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    break;
  case 'Name':
    URL = `https://www.${correctPath}.com/api/json/v1/1/search.php?s=${inputSearch}`;
    break;
  case 'First Letter':
    URL = inputSearch.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : `https://www.${correctPath}.com/api/json/v1/1/search.php?f=${inputSearch}`;
    break;
  default:
    console.log('Error');
  }

  const data = await requestRecipesApi(URL);
  let recipes = pathname === '/meals' ? data.meals : data.drinks;
  if (!recipes) {
    recipes = [];
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  return recipes;
};

export default getRecipe;
