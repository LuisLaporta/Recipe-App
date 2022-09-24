import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import profileIcon from './images/profileIcon.svg';
// import searchIcon from './images/searchIcon.svg';

function Header({ title, disabledSearch }) {
  const history = useHistory();
  return (
    <div>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src="./images/profileIcon.svg"
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </button>
      {disabledSearch && (
        <button type="button">
          <img
            src="./images/searchIcon.svg"
            alt="Profile Icon"
            data-testid="search-top-btn"
          />
        </button>
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
