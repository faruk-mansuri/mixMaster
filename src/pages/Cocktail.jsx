import axios from 'axios';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktail = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const response = await axios(`${singleCocktailUrl}${id}`);
      return response.data;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktail(id));
    return { id };
  };
};

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktail(id));

  // if (!data) return <h2>something went wrong...</h2>;
  if (!data) return <Navigate to='/' />;

  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`]) ingredients.push(data[`strIngredient${i}`]);
  }
  ingredients = ingredients.join(' , ');

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back Home
        </Link>
        <h3>{name}</h3>
      </header>

      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info:</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {ingredients}
          </p>
          <p>
            <span className='drink-data'>instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
  }
  .img {
    border-radius: var(--borderRadius);
  }
  .drink-info {
    padding-top: 2rem;
  }
  .drink p {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 2;
    margin-bottom: 1rem;
  }
  .drink-data {
    margin-right: 0.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }
  .img {
    display: inline-block;
    margin-right: 0.5rem;
  }
  @media (min-width: 992px) {
    .drink {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
      align-items: center;
    }
    .drink-info {
      padding-top: 0;
    }
  }
`;
export default Cocktail;
