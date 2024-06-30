import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { Team } from '../../../types/api';

export const getTeams = (leagueId?: string): Promise<Team[]> => {
  const url = leagueId ? `/teams?league=${leagueId}` : '/teams/?limit=1000';

  return api.get(url);
};

export const getTeamsQueryOptions = (leagueId?: string) => {
  return queryOptions({
    queryKey: ['teams', leagueId],
    queryFn: () => getTeams(leagueId),
  });
};

type UseTeamsOptions = {
  leagueId?: string;
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

export const useTeams = ({ leagueId, queryConfig }: UseTeamsOptions) => {
  return useQuery({
    ...getTeamsQueryOptions(leagueId),
    ...queryConfig,
  });
};
