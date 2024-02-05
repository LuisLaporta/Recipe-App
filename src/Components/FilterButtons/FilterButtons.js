import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';

import RecipesContext from '../../Context/RecipesContext';
import requestRecipesApi from '../../Services/RequestRecipesApi';
import useRequestApi from '../../Hooks/useRequestApi';
import getIcon from '../../Services/GetIcon';
import '../../css/filter.css';

const MAX_CATEGORY_LENGTH = 5;

function FilterButtons({ searchBarVisible }) {
  const [filterButtons, setFilterButtons] = useState({
    allCategories: [],
    selectedCategories: [],
  });
  const [filterButton, setFilterButton] = useState('all');
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState({});

  const { updateRecipeList, changeCategory } = useContext(RecipesContext);

  useEffect(() => {
    const fetchFilterButtons = async () => {
      const data = await requestRecipesApi(
        pathname === '/meals'
          ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
          : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      act(() => {
        setFilterButtons({ ...filterButtons, allCategories: data.drinks || data.meals });
        setIcon(getIcon(pathname));
        setLoading(false);
      });
    };
    fetchFilterButtons();
  }, []);

  useEffect(() => {
    const categoryList = filterButtons.allCategories.slice(0, MAX_CATEGORY_LENGTH);
    act(() => {
      setFilterButtons({ ...filterButtons, selectedCategories: categoryList });
    });
  }, [filterButtons.allCategories]);

  useRequestApi(pathname, filterButton, updateRecipeList, filterButton);

  return (
    <div>
      {loading ? <div /> : (
        <section
          className={ searchBarVisible ? 'drop-down flex' : 'filter-container flex' }
        >
          <div>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ () => {
                setFilterButton('all');
                changeCategory('all');
              } }
            >
              <img src={ icon[0] } alt="All" />
            </button>
            <p>All</p>
          </div>
          {filterButtons?.selectedCategories.map((category, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => (
                  filterButton === category.strCategory
                    ? act(() => {
                      setFilterButton('all');
                      changeCategory('all');
                    })
                    : act(() => {
                      setFilterButton(category.strCategory);
                      changeCategory(category.strCategory);
                    })
                ) }
              >
                <img src={ icon[category.strCategory] } alt={ category.strCategory } />
              </button>
              <p>{category.strCategory}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

FilterButtons.propTypes = {
  searchBarVisible: PropTypes.bool.isRequired,
};

export default FilterButtons;
