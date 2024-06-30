import { createContext, useReducer } from 'react';
import { League } from '../types/api';

const SiteContext = createContext({
  league: undefined,
  setLeague: (league: League) => {},
});

function siteReducer(state, action) {
  if (action.type === 'SET_LEAGUE') {
    return { ...state, league: action.league };
  }
  return state;
}

export function SiteContextProvider({ children }) {
  const [site, dispatchSiteAction] = useReducer(siteReducer, {
    league: undefined,
  });

  function setLeague(league: League) {
    dispatchSiteAction({ type: 'SET_LEAGUE', league });
  }

  const siteContext = {
    league: site.league,
    setLeague,
  };
  return (
    <SiteContext.Provider value={siteContext}>{children}</SiteContext.Provider>
  );
}

export default SiteContext;
