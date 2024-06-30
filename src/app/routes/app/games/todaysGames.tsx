import { ContentLayout } from '../../../../components/layouts/content-layout';
import { TodaysGames } from '../../../../features/games/components/todays-games';

export const TodaysGamesRoute = () => {
  return (
    <ContentLayout title="Today's Games">
      <div className='mt-4'>
        <TodaysGames />
      </div>
    </ContentLayout>
  );
};
