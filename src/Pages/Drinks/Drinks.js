import React from 'react';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" disabledSearch />
      <Recipes />
    </div>
  );
}

export default Drinks;
