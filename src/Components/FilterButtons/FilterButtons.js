import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import RecipesContext from '../../Context/RecipesContext';
import requestRecipesApi from '../../Services/RequestRecipesApi';
import useRequestApi from '../../Hooks/useRequestApi';

const MAX_CATEGORY_LENGTH = 5;

function FilterButtons() {
  const [filterButtons, setFilterButtons] = useState({
    allCategories: [],
    selectedCategories: [],
  });
  const [filterButton, setFilterButton] = useState('all');
  const { pathname } = useLocation();

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
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          setFilterButton('all');
          changeCategory('all');
        } }
      >
        All
      </button>
      {filterButtons?.selectedCategories.map((category, index) => (
        <button
          key={ index }
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
          {category.strCategory}
        </button>
      ))}
    </section>
  );
}

export default FilterButtons;
