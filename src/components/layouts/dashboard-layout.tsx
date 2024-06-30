import { Home, Folder, PanelLeft, User2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown';
import { useLeagues } from '../../features/leagues/api/get-leagues';
import SiteContext from '../../store/SiteContext';
import { useContext } from 'react';
import { League } from '../../types/api';
import {
  getTeamsQueryOptions,
  useTeams,
} from '../../features/teams/api/get-teams';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const siteCtx = useContext(SiteContext);
  const currentLeague = siteCtx.league ? siteCtx.league.name : 'All Leagues';

  const leaguesQuery = useLeagues();

  const queryClient = useQueryClient();

  function handleSetLeague(league?: League) {
    siteCtx.setLeague(league);
    queryClient.refetchQueries({
      queryKey: getTeamsQueryOptions().queryKey,
    });
  }

  const navigation = [
    { name: 'Home', to: '.', icon: Home },
    { name: 'Teams', to: './teams', icon: Folder },
    { name: 'Players', to: './players', icon: Folder },
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <div className='flex h-16 shrink-0 items-center px-4'>LOGO</div>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                  isActive && 'bg-gray-900 text-white'
                )
              }
            >
              <item.icon
                className={cn(
                  'text-gray-400 group-hover:text-gray-300',
                  'mr-4 size-6 shrink-0'
                )}
                aria-hidden='true'
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-60'>
        <header className='sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6'>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='size-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              side='left'
              className='bg-black pt-10 text-white sm:max-w-60'
            >
              <nav className='grid gap-6 text-lg font-medium'>
                <div className='flex h-16 shrink-0 items-center px-4'>
                  {/* <Logo /> */}
                </div>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      cn(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                        isActive && 'bg-gray-900 text-white'
                      )
                    }
                  >
                    <item.icon
                      className={cn(
                        'text-gray-400 group-hover:text-gray-300',
                        'mr-4 size-6 shrink-0'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
          {currentLeague}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='overflow-hidden rounded-full'
              >
                <span className='sr-only'>Open user menu</span>
                <User2 className='size-6 rounded-full' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleSetLeague(undefined)}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                All Leagues
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {leaguesQuery.data &&
                leaguesQuery.data.data.leagues.map((x) => (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleSetLeague(x)}
                      className={cn('block px-4 py-2 text-sm text-gray-700')}
                    >
                      {x.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='overflow-hidden rounded-full'
              >
                <span className='sr-only'>Open user menu</span>
                <User2 className='size-6 rounded-full' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                // onClick={() => navigate('./profile')}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                // onClick={() => logout.mutate({})}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          {children}
        </main>
      </div>
    </div>
  );
}
