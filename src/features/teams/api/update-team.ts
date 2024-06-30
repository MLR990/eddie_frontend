import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Team } from '../../../types/api';
import { api } from '../../../lib/api-client';
import { MutationConfig } from '../../../lib/react-query';
import { getTeamQueryOptions } from './get-team';

export const updateTeamInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  city: z.string().min(1),
  nickname: z.string().min(1),
  championships: z.any(),
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  colorText: z.string(),
  venue: z.string(),
});

export type UpdateTeamInput = z.infer<typeof updateTeamInputSchema>;

export const updateTeam = ({
  data,
  teamId,
}: {
  data: UpdateTeamInput;
  teamId: string;
}): Promise<Team> => {
  return api.patch(`/teams/${teamId}`, data);
};

type UseUpdateTeamsOptions = {
  mutationConfig?: MutationConfig<typeof updateTeam>;
};

export const useUpdateTeam = ({
  mutationConfig,
}: UseUpdateTeamsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: ['team'],
      });
      queryClient.refetchQueries({
        queryKey: ['teams'],
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTeam,
  });
};
