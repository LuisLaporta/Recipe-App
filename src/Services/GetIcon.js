import mealsIcon from '../images/mealsIcon.svg';
import beefIcon from '../images/beffIcon.svg';
import goatIcon from '../images/goatIcon.svg';
import chickenIcon from '../images/chickenIcon.svg';
import breakIcon from '../images/breakIcon.svg';
import dessertIcon from '../images/dessertIcon.svg';

import drinksIcon from '../images/drinksIcon.svg';
import ordinaryIcon from '../images/ordinaryIcon.svg';
import cocktailIcon from '../images/cocktailIcon.svg';
import shakeIcon from '../images/shakeIcon.svg';
import otherIcon from '../images/otherIcon.svg';
import cocoaIcon from '../images/cocoaIcon.svg';

const getIcon = (path) => {
  switch (path) {
  case '/meals':
    return {
      0: mealsIcon,
      Beef: beefIcon,
      Goat: goatIcon,
      Chicken: chickenIcon,
      Breakfast: breakIcon,
      Dessert: dessertIcon,
    };
  case '/drinks':
    return {
      0: drinksIcon,
      'Ordinary Drink': ordinaryIcon,
      Cocktail: cocktailIcon,
      Shake: shakeIcon,
      'Other / Unknown': otherIcon,
      Cocoa: cocoaIcon,
    };
  default:
    return { message: 'Error' };
  }
};

export default getIcon;
