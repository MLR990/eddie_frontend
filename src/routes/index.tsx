import { Route, Routes } from 'react-router-dom';
import { lazyImport } from '../utils/lazy-import';

const { LandingRoute } = lazyImport(() => import('./landing'), 'LandingRoute');

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<LandingRoute />} />
    </Routes>
  );
};
