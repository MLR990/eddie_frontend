import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { League } from '../../../types/api';

export const getLeagues = (): Promise<League[]> => {
  return api.get('/leagues');
};

export const getLeaguesQueryOptions = () => {
  return queryOptions({
    queryKey: ['leagues'],
    queryFn: () => getLeagues(),
  });
};

type UseLeaguesOptions = {
  queryConfig?: QueryConfig<typeof getLeaguesQueryOptions>;
};

export const useLeagues = ({ queryConfig }: UseLeaguesOptions = {}) => {
  return useQuery({
    ...getLeaguesQueryOptions(),
    ...queryConfig,
  });
};
