import { Spinner } from '../../../components/ui/spinner';
import { formatDate } from '../../../utils/format';
import { useTeam } from '../api/get-team';
import { UpdateTeam } from './update-team';

export const TeamView = ({ teamId }: { teamId: string }) => {
  const teamQuery = useTeam({
    teamId,
  });

  if (teamQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!teamQuery.data) return null;
  const mainColor = teamQuery.data.color1;
  const secondColor = teamQuery.data.color2;
  const textColor = teamQuery.data.colorText;
  return (
    <div>
      <span className='text-xs font-bold'>
        {/* {formatDate(teamQuery.data.createdAt)} */}
      </span>
      {/* {teamQuery.data.author && (
        <span className="ml-2 text-sm font-bold">
          by {teamQuery.data.author.firstName}{' '}
          {teamQuery.data.author.lastName}
        </span>
      )} */}
      <div className='mt-6 flex flex-col space-y-16'>
        <div className='flex justify-end'>
          <UpdateTeam teamId={teamId} />
        </div>
        <div>
          <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
            <div
              className='px-4 py-5 sm:px-6'
              style={{
                backgroundColor: mainColor,
                border: '3px solid',
                borderColor: secondColor,
                color: textColor,
              }}
            >
              <div className='mt-1 max-w-2xl text-sm '>
                {teamQuery.data.name}
                {teamQuery.data.code}
                {teamQuery.data.city}
                {teamQuery.data.championships}
                {teamQuery.data.nickname}
                {teamQuery.data.color1}
                {teamQuery.data.color2}
                {teamQuery.data.color3}
                {teamQuery.data.colorText}
                {/* <MDPreview value={teamQuery.data} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
