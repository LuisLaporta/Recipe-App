import { useEffect } from 'react';
import { act } from 'react-dom/test-utils';

import requestRecipesApi from '../Services/RequestRecipesApi';

const useRequestApi = (pathname, filterButton, accessoryFunction, dependencyArray) => {
  useEffect(() => {
    const fetchItemsByCategory = async () => {
      const data = filterButton === 'all'
        ? await requestRecipesApi(
          pathname === '/meals'
            ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
            : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        )
        : await requestRecipesApi(
          pathname === '/meals'
            ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterButton}`
            : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterButton}`,
        );

      act(() => {
        accessoryFunction(data.meals || data.drinks);
      });
    };
    fetchItemsByCategory();
  }, [dependencyArray === undefined ? null : dependencyArray]);
};

export default useRequestApi;
