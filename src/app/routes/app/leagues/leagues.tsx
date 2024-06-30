import { QueryClient } from '@tanstack/react-query';

import { getLeaguesQueryOptions } from '../../../../features/leagues/api/get-leagues';
import { ContentLayout } from '../../../../components/layouts/content-layout';
import { LeagueList } from '../../../../features/leagues/components/league-list';

export const leaguesLoader = (queryClient: QueryClient) => async () => {
  const query = getLeaguesQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const LeaguesRoute = () => {
  return (
    <ContentLayout title='Discussions'>
      <div className='flex justify-end'>{/* <CreateDiscussion /> */}</div>
      <div className='mt-4'>
        <LeagueList />
      </div>
    </ContentLayout>
  );
};
