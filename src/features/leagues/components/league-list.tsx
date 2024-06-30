import { Spinner } from '../../../components/ui/spinner';
import { Table } from '../../../components/ui/table';
import { useLeagues } from '../api/get-leagues';

export const LeagueList = () => {
  const leaguesQuery = useLeagues();

  if (leaguesQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!leaguesQuery.data) return null;

  return (
    <Table
      data={leaguesQuery.data.data.leagues}
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
      ]}
    />
  );
};
