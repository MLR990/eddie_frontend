import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '../../../../components/layouts/content-layout';
import { getTeamsQueryOptions } from '../../../../features/teams/api/get-teams';
import { TeamList } from '../../../../features/teams/components/team-list';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';

export const teamsLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const leagueId = params.leagueId as string;

    const query = getTeamsQueryOptions(leagueId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const TeamsRoute = () => {
  const params = useParams();
  const leagueId = params.leagueId as string;

  return (
    <ContentLayout title='Teams'>
      <div className='flex justify-end'>{/* <CreateDiscussion /> */}</div>
      <div className='mt-4'>
        <TeamList leagueId={leagueId} />
      </div>
    </ContentLayout>
  );
};
