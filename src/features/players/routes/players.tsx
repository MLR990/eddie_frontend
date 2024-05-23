import { ContentLayout } from '../../../components/layouts/content-layout';
import { PlayersList } from '../components/players-list';

export const PlayersRoute = () => {
  return (
    <ContentLayout title='Players'>
      <div className='mt-4'>
        <PlayersList />
      </div>
    </ContentLayout>
  );
};
