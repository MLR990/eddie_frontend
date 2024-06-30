import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import { AppRoot } from './app/root';
import { leaguesLoader } from './app/leagues/leagues';
import { teamsLoader } from './app/teams/teams';
import { teamLoader } from './app/teams/team';

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: '/app',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { TodaysGamesRoute } = await import(
              './app/games/todaysGames'
            );
            return { Component: TodaysGamesRoute };
          },
          loader: teamsLoader(queryClient),
        },
        {
          path: 'leagues',
          lazy: async () => {
            const { LeaguesRoute } = await import('./app/leagues/leagues');
            return { Component: LeaguesRoute };
          },
          loader: leaguesLoader(queryClient),
        },

        {
          path: 'teams',
          lazy: async () => {
            const { TeamsRoute } = await import('./app/teams/teams');
            return { Component: TeamsRoute };
          },
          loader: teamsLoader(queryClient),
        },
        {
          path: 'players/',
          lazy: async () => {
            const { PlayersRoute } = await import('./app/players/players');
            return { Component: PlayersRoute };
          },
          // loader: teamLoader(queryClient),
        },
        {
          path: 'teams/:teamId',
          lazy: async () => {
            const { TeamRoute } = await import('./app/teams/team');
            return { Component: TeamRoute };
          },
          loader: teamLoader(queryClient),
        },
      ],
    },
  ]);
