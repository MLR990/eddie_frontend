import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';
import {
  getTeamQueryOptions,
  useTeam,
} from '../../../../features/teams/api/get-team';
import { Spinner } from '../../../../components/ui/spinner';
import { ContentLayout } from '../../../../components/layouts/content-layout';
import { TeamView } from '../../../../features/teams/components/team-view';

export const teamLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const teamId = params.teamId as string;

    const teamQuery = getTeamQueryOptions(teamId);

    const promises = [
      queryClient.getQueryData(teamQuery.queryKey) ??
        (await queryClient.fetchQuery(teamQuery)),
    ] as const;

    const [discussion] = await Promise.all(promises);

    return {
      discussion,
    };
  };

export const TeamRoute = () => {
  const params = useParams();
  const teamId = params.teamId as string;
  const teamQuery = useTeam({
    teamId,
  });

  if (teamQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!teamQuery.data) return null;

  return (
    <>
      <ContentLayout title={teamQuery.data.name}>
        <TeamView teamId={teamId} />
        <div className='mt-8'>
          <ErrorBoundary
            fallback={
              <div>Failed to load comments. Try to refresh the page.</div>
            }
          >
            {/* <Comments discussionId={discussionId} /> */}
          </ErrorBoundary>
        </div>
      </ContentLayout>
    </>
  );
};
