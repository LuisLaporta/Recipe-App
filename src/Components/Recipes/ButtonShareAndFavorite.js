import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareButton from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

function ButtonShareAndFavorite() {
  const { pathname } = useLocation();
  const [copiedLink, setCopiedLink] = useState('');

  const handleClickShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
    setCopiedLink('Link copied!');
  };

  // const handleClickFavorite = () => {
  // }

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickShare }
        data-testid="share-btn"
      >
        <img src={ shareButton } alt="share button" />
      </button>
      <h1>{copiedLink}</h1>
      <button
        type="button"
        // onClick={ handleClickFavorite }
        data-testid="favorite-btn"
        src={ whiteHeart }
      >
        <img src={ whiteHeart } alt="favorite button" />
      </button>
    </div>
  );
}

export default ButtonShareAndFavorite;
