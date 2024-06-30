import { useContext } from 'react';
import { Link } from '../../../components/ui/link';
import { Spinner } from '../../../components/ui/spinner';
import { Table } from '../../../components/ui/table';
import { useTeams } from '../api/get-teams';
import SiteContext from '../../../store/SiteContext';

export const TeamList = () => {
  const siteCtx = useContext(SiteContext);
  const currentLeague = siteCtx.league ? siteCtx.league.name : 'All Leagues';

  const teamsQuery = useTeams({ leagueId: siteCtx.league?._id });

  if (teamsQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!teamsQuery.data) return null;

  return (
    <>
      {currentLeague}
      <Table
        data={teamsQuery.data.data.teams}
        columns={[
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'City',
            field: 'city',
          },
          {
            title: 'Nickname',
            field: 'nickname',
          },
          {
            title: 'Code',
            field: 'code',
          },
          {
            title: 'Championships',
            field: 'championships',
          },
          {
            title: 'Color1',
            field: 'color1',
          },
          {
            title: 'Venue',
            field: 'venue',
            Cell({ entry: { venue } }) {
              if (venue) {
                return (
                  <span>
                    {venue.name} ({venue.latitude}, {venue.longitude})
                  </span>
                );
              }
              return <span style={{ color: 'red' }}>No Stadium for Team</span>;
            },
          },
          {
            title: '',
            field: '_id',
            Cell({ entry: { _id } }) {
              return <Link to={`./${_id}`}>View</Link>;
            },
          },
        ]}
      />
    </>
  );
};
