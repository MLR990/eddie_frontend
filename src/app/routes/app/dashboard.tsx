import { ContentLayout } from '../../../components/layouts/content-layout';

export const DashboardRoute = () => {
  return (
    <ContentLayout title='Dashboard'>
      <h1 className='text-xl'>Welcome to the dashboard</h1>
      <h4 className='my-3'>Keep checking in to see the latest updates.</h4>
    </ContentLayout>
  );
};
