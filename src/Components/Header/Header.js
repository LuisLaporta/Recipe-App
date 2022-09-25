import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, disabledSearch }) {
  const [searchBar, setSearchBar] = useState(false);

  const history = useHistory();
  return (
    <div>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </button>
      {disabledSearch && (
        <button type="button" onClick={ () => setSearchBar(!searchBar) }>
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {searchBar && <SearchBar />}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  disabledSearch: PropTypes.bool.isRequired,
};

export default Header;
