import React from 'react';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" disabledSearch />
      <Recipes />
    </div>
  );
}

export default Meals;
