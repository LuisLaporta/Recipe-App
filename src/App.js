import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/RecipesProvider';
import Login from './Pages/Login/Login';
import Meals from './Pages/Foods/Meals';
import Drinks from './Pages/Drinks/Drinks';
import DrinkId from './Pages/DrinkId/DrinkId';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';
import MealId from './Pages/MealId/MealId';
import MealsInProgess from './Pages/MealsInProgess/MealsInProgess';
import DrinksInProgess from './Pages/DrinksInProgess/DrinksInProgess';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ MealId } />
        <Route exact path="/drinks/:id" component={ DrinkId } />
        <Route exact path="/meals/:id/in-progress" component={ MealsInProgess } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgess } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
