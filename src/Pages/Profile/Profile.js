import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
// import Login from '../Login/Login';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  // console.log(user);

  return (
    <div>
      <Header title="Profile" disabledSearch={ false } />
      <Footer />
      <div>
        <p data-testid="profile-email">
          E-mail:
          {user && user.email}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
