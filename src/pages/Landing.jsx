import axios from 'axios';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

import { useQuery } from '@tanstack/react-query';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

// const searchCok
export const loader = (queryClient) => {
  return async ({ request }) => {
    const url = new URL(request.url);
    // URL object provides convenient methods to work with URLs and allows easy access to query parameters.

    const searchTerm = url.searchParams.get('search') || '';
    // searchParams: It is a property of the URL object that provides access to the query parameters in the URL. It returns a URLSearchParams object.

    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };
};

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
