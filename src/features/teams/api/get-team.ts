import { useQuery, queryOptions } from '@tanstack/react-query';
import { Team } from '../../../types/api';
import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';

export const getTeam = ({ teamId }: { teamId: string }): Promise<Team> => {
  return api
    .get(`/teams/${teamId}`)
    .then((x) => x.data)
    .then((x) => x.team);
};

export const getTeamQueryOptions = (teamId: string) => {
  return queryOptions({
    queryKey: ['team', teamId],
    queryFn: () => getTeam({ teamId }),
  });
};

type UseTeamOptions = {
  teamId: string;
  queryConfig?: QueryConfig<typeof getTeamQueryOptions>;
};

export const useTeam = ({ teamId, queryConfig }: UseTeamOptions) => {
  return useQuery({
    ...getTeamQueryOptions(teamId),
    ...queryConfig,
  });
};
