import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const navigation = useNavigation(); // give info about state, what happening in application
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Navbar />
      <section className='page'>
        {isPageLoading ? <div className='loading'></div> : <Outlet />}
      </section>
    </>
  );
};

export default HomeLayout;
