const getRecipe = async ({ typeRadio, inputSearch }) => {
  let URL;

  switch (typeRadio) {
  case 'Ingredient':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    break;
  case 'Name':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    break;
  case 'First Letter':
    URL = inputSearch.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
    break;
  default:
    console.log('Error');
  }

  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export default getRecipe;
