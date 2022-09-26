import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" disabledSearch={ false } />
      <Footer />
      <div>
        <h3 data-testid="profile-email">
          E-mail:
        </h3>
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
