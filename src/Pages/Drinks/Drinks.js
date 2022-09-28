import React, { useContext } from 'react';

import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';
import RecipesContext from '../../Context/RecipesContext';
// import requestRecipesApi from '../../Services/RequestRecipesApi';
import FilterButtons from '../../Components/FilterButtons/FilterButtons';
import useRequestApi from '../../Hooks/useRequestApi';

function Drinks() {
  const { updateRecipeList } = useContext(RecipesContext);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     const data = await requestRecipesApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //     updateRecipeList(data.drinks);
  //   };
  //   fetchRecipes();
  // }, []);

  useRequestApi('/drinks', 'all', updateRecipeList);

  return (
    <div>
      <Header title="Drinks" disabledSearch />
      <FilterButtons />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
