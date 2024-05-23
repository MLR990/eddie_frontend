import { Outlet, Route, Routes } from 'react-router-dom';
import { lazyImport } from '../utils/lazy-import';
import { DashboardLayout } from '../components/layouts/dashboard-layout';
import { Suspense } from 'react';
import { Spinner } from '../components/ui/spinner';

const { PlayersRoute } = lazyImport(
  () => import('../features/players'),
  'PlayersRoute'
);
const { DashboardRoute } = lazyImport(
  () => import('./dashboard'),
  'DashboardRoute'
);
const { LandingRoute } = lazyImport(() => import('./landing'), 'LandingRoute');
const { NotFoundRoute } = lazyImport(
  () => import('./not-found'),
  'NotFoundRoute'
);

const MainApp = () => {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className='flex size-full items-center justify-center'>
            <Spinner size='xl' />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingRoute />} />
      <Route path='/app' element={<MainApp />}>
        <Route path='/app/players' element={<PlayersRoute />} />
        <Route path='/app/' element={<DashboardRoute />} />
      </Route>
      <Route path='*' element={<NotFoundRoute />} />
    </Routes>
  );
};
