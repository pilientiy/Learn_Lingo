import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ThemeProvider from '../../utils/ThemeProvider';
import Loader from '../Loader/Loader';
import css from './App.module.css';

export default function App() {
  const Home = lazy(() => import('../../pages/Home/Home'));
  const Teachers = lazy(() => import('../../pages/Teachers/Teachers'));
  const Favorites = lazy(() => import('../../pages/Favorites/Favorites'));
  const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));
 
  return (
    <div className={css.container}>
      <ThemeProvider>
          <Header />
          <Suspense fallback={<Loader />}> 
          <Routes>
            <Route path='/' element={<Home />}/>
              <Route path='/teachers' element={<Teachers />} />
              <Route path='/favorites' element={<PrivateRoute component={<Favorites />} redirectTo='/login' />} /> 
            <Route path='*' element={<NotFound />} />
          </Routes>
          </Suspense>
        </ThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
        }}
      />
    </div>
  )
};


