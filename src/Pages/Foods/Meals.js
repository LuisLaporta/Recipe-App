import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" disabledSearch />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
