import React, { useContext, useState } from 'react';

import SearchBar from '../../Components/SearchBar/SearchBar';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';
import RecipesContext from '../../Context/RecipesContext';
import FilterButtons from '../../Components/FilterButtons/FilterButtons';
import useRequestApi from '../../Hooks/useRequestApi';
import '../../css/food.css';

function Drinks() {
  const { updateRecipeList } = useContext(RecipesContext);

  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const handleSearchIconClick = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  useRequestApi('/drinks', 'all', updateRecipeList);

  return (
    <div className={ `app-container ${searchBarVisible ? 'search-bar-visible' : ''}` }>
      <Header title="Drinks" disabledSearch={ handleSearchIconClick } disabled />
      {searchBarVisible && <SearchBar />}
      <FilterButtons searchBarVisible={ searchBarVisible } />
      <Recipes searchBarVisible={ searchBarVisible } />
      <Footer />
    </div>
  );
}

export default Drinks;
