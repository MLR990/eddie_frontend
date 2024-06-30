import { ContentLayout } from '../../../../components/layouts/content-layout';
import { PlayersList } from '../../../../features/players/components/players-list';

// export const playersLoader = (queryClient: QueryClient) => async () => {
//   const query = getPl();

//   return (
//     queryClient.getQueryData(query.queryKey) ??
//     (await queryClient.fetchQuery(query))
//   );
// };

export const PlayersRoute = () => {
  return (
    <ContentLayout title='Players'>
      <div className='flex justify-end'>{/* <CreateDiscussion /> */}</div>
      <div className='mt-4'>
        <PlayersList />
      </div>
    </ContentLayout>
  );
};
