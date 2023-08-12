import { useNavigation, Form } from 'react-router-dom';
import styled from 'styled-components';

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSubmitted = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form className='form'>
        <input
          type='search'
          name='search'
          className='form-input'
          defaultValue={searchTerm}
        />
        <button type='submit' className='btn' disabled={isSubmitted}>
          {isSubmitted ? 'searching...' : 'search'}
        </button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 6rem;
  .form {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .form-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
export default SearchForm;
