import React from 'react';
import PropTypes from 'prop-types';
// import profileIcon from './images/profileIcon.svg';
// import searchIcon from './images/searchIcon.svg';

function Header({ title, disabledSearch }) {
  return (
    <div>
      <img
        src="./images/profileIcon.svg"
        alt="Profile Icon"
        data-testid="profile-top-btn"
      />
      {disabledSearch && (
        <img
          src="./images/searchIcon.svg"
          alt="Profile Icon"
          data-testid="search-top-btn"
        />
      )}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  disabledSearch: PropTypes.bool.isRequired,
};

export default Header;
