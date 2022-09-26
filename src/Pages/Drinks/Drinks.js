import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Recipes from '../../Components/Recipes/Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" disabledSearch />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
