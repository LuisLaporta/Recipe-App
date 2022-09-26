import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClickDoneRecipes = () => {
    const doneRecipes = 'done-recipes';
    history.push(doneRecipes);
  };

  const handleClickFavoriteRecipes = () => {
    const favoriteRecipes = 'favorite-recipes';
    history.push(favoriteRecipes);
  };

  const handleClickLogout = () => {
    localStorage.clear();
    const logout = '/';
    history.push(logout);
  };

  return (
    <div>
      <Header title="Profile" disabledSearch={ false } />
      <Footer />
      <div>
        <p data-testid="profile-email">
          E-mail:
          {user?.email}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
