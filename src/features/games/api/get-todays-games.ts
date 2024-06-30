import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { Game } from '../../../types/api';

export const getTodaysGames = (): Promise<Game[]> => {
  return api.get(`/games/todays-games`);
};

export const getTodaysGamesQueryOptions = () => {
  return queryOptions({
    queryKey: ['todays-games'],
    queryFn: () => getTodaysGames(),
  });
};

type UseTodaysGamesOptions = {
  queryConfig?: QueryConfig<typeof getTodaysGamesQueryOptions>;
};

export const useTodaysGames = ({ queryConfig }: UseTodaysGamesOptions) => {
  return useQuery({
    ...getTodaysGamesQueryOptions(),
    ...queryConfig,
  });
};
