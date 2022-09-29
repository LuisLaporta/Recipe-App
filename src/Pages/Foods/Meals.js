import React, { useContext } from 'react';

// import requestRecipesApi from '../../Services/RequestRecipesApi';
import RecipesContext from '../../Context/RecipesContext';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';
import FilterButtons from '../../Components/FilterButtons/FilterButtons';
import useRequestApi from '../../Hooks/useRequestApi';

function Meals() {
  const { updateRecipeList } = useContext(RecipesContext);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     const data = await requestRecipesApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //     updateRecipeList(data.meals);
  //   };
  //   fetchRecipes();
  // }, []);

  useRequestApi('/meals', 'all', updateRecipeList);

  return (
    <div>
      <Header title="Meals" disabledSearch />
      <FilterButtons />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
