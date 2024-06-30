import { Spinner } from '../../../components/ui/spinner';
import { Table } from '../../../components/ui/table';
import { formatDate } from '../../../utils/format';
import { useTodaysGames } from '../api/get-todays-games';

export const TodaysGames = () => {
  const todaysGamesQuery = useTodaysGames({});
  if (todaysGamesQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!todaysGamesQuery.data) return null;

  return (
    <Table
      data={todaysGamesQuery.data.data.games}
      columns={[
        {
          title: 'League',
          field: 'league',
          Cell({ entry: { league } }) {
            return <span>{league.name}</span>;
          },
        },
        {
          title: 'Away',
          field: 'awayTeam',
          Cell({ entry: { awayTeam } }) {
            return (
              <span
                style={{
                  backgroundColor: awayTeam.color1,
                  color: awayTeam.colorText,
                  border: `2px solid ${awayTeam.color2}`,
                  display: 'flex',
                  minHeight: '2rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '20px',
                }}
              >
                {awayTeam.name}
              </span>
            );
          },
        },
        {
          title: 'Away Score',
          field: 'awayScore',
          Cell({ entry: { awayScore } }) {
            return <span>{awayScore}</span>;
          },
        },
        {
          title: 'Home',
          field: 'homeTeam',
          Cell({ entry: { homeTeam } }) {
            return (
              <span
                style={{
                  backgroundColor: homeTeam.color1,
                  color: homeTeam.colorText,
                  border: `2px solid ${homeTeam.color2}`,
                  display: 'flex',
                  minHeight: '2rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '20px',
                }}
              >
                {homeTeam.name}
              </span>
            );
          },
        },
        {
          title: 'Home Score',
          field: 'homeScore',
          Cell({ entry: { homeScore } }) {
            return <span>{homeScore}</span>;
          },
        },

        {
          title: '',
          field: '',
          Cell({ entry: { gameDay, gameStatus } }) {
            return <span>{gameStatus ? gameStatus : formatDate(gameDay)}</span>;
          },
        },
      ]}
    />
  );
};
