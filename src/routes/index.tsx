import { Route, Routes } from 'react-router-dom';
import { lazyImport } from '../utils/lazy-import';

const { LandingRoute } = lazyImport(() => import('./landing'), 'LandingRoute');
const { NotFoundRoute } = lazyImport(
  () => import('./not-found'),
  'NotFoundRoute'
);
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingRoute />} />

      <Route path='*' element={<NotFoundRoute />} />
    </Routes>
  );
};
