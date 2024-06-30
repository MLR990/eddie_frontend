import { Pen } from 'lucide-react';

import { useTeam } from '../api/get-team';
import { updateTeamInputSchema, useUpdateTeam } from '../api/update-team';
import { useNotifications } from '../../../components/ui/notifications';
import { Button } from '../../../components/ui/button';
import { Form, FormDrawer, Input } from '../../../components/ui/form';

type UpdateTeamProps = {
  teamId: string;
};

export const UpdateTeam = ({ teamId }: UpdateTeamProps) => {
  const { addNotification } = useNotifications();
  const discussionQuery = useTeam({ teamId });
  const updateTeamMutation = useUpdateTeam({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Team Updated',
        });
      },
    },
  });

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
    <FormDrawer
      isDone={updateTeamMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className='size-4' />} size='sm'>
          Update Team
        </Button>
      }
      title='Update Team'
      submitButton={
        <Button
          form='update-team'
          type='submit'
          size='sm'
          isLoading={updateTeamMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id='update-team'
        onSubmit={(values) => {
          updateTeamMutation.mutate({
            data: values,
            teamId,
          });
        }}
        options={{
          defaultValues: {
            name: discussionQuery.data?.name ?? '',
            city: discussionQuery.data?.city ?? '',
            nickname: discussionQuery.data?.nickname ?? '',
            championships: discussionQuery.data?.championships ?? 0,
            color1: discussionQuery.data?.color1 ?? '',
            color2: discussionQuery.data?.color2 ?? '',
            color3: discussionQuery.data?.color3 ?? '',
            colorText: discussionQuery.data?.colorText ?? '',
            venue: discussionQuery.data?.venue?._id ?? '',
          },
        }}
        schema={updateTeamInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label='Name'
              error={formState.errors['name']}
              registration={register('name')}
            />
            <Input
              label='City'
              error={formState.errors['city']}
              registration={register('city')}
            />
            <Input
              label='Nickname'
              error={formState.errors['nickname']}
              registration={register('nickname')}
            />
            <Input
              label='Championships'
              error={formState.errors['championships']}
              registration={register('championships')}
              type='number'
            />
            <Input
              label='Color1'
              error={formState.errors['color1']}
              registration={register('color1')}
            />
            <Input
              label='Color2'
              error={formState.errors['color2']}
              registration={register('color2')}
            />
            <Input
              label='Color3'
              error={formState.errors['color3']}
              registration={register('color3')}
            />
            <Input
              label='ColorText'
              error={formState.errors['colorText']}
              registration={register('colorText')}
            />
            <Input
              label='VenueId'
              error={formState.errors['venue']}
              registration={register('venue')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
    // </Authorization>
  );
};
