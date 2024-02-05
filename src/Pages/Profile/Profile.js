import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import doneIcon from '../../images/doneIcon.svg';
import favIcon from '../../images/favIcon.svg';
import logIcon from '../../images/logoutIcon.svg';
import '../../css/profile.css';

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
        <p data-testid="profile-email" className="profile-email">
          {user?.email}
        </p>
        <div className="btn-container">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ handleClickDoneRecipes }
            className="btn-profile profile-done-btn"
          >
            <img
              src={ doneIcon }
              alt="Done Icon"
            />
            Done Recipes
          </button>
          <hr className="line" />
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ handleClickFavoriteRecipes }
            className="btn-profile profile-favorite-btn"
          >
            <img
              src={ favIcon }
              alt="Favorite Icon"
            />
            Favorite Recipes
          </button>
          <hr className="line" />
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClickLogout }
            className="btn-profile profile-logout-btn"
          >
            <img
              src={ logIcon }
              alt="Logout Icon"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
