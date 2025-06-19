export interface Player {
  id: string;
  gameName: string;
  realName: string;
  nationality: string;
  role: "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";
  birthYear?: number;
  retiredYear?: number;
  currentTeam?: string;
  photo?: string; // pas fait encore
}

export interface Team {
  id: string;
  name: string;
  region: string;
  founded?: number;
  disbanded?: boolean;
  logo?: string;
}

export interface RosterPlayer {
  gameName: string;
  tagLine: string;
  realName: string;
  role: "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";
}
export interface WorldsChampion {
  year: number;
  teamId: string;
  playerIds: string[];
  location: string;
  prizePool: number;
  viewership?: number;
  finalScore: string;
  runnerUp: string;
  region?: string;
  roster?: RosterPlayer[];
}

export interface Tournament {
  year: number;
  location: string;
  startDate: string;
  endDate: string;
  teams: number;
  prizePool: number;
  viewership?: number;
  patch: string;
}

export interface RiotPlayerData {
  puuid: string;
  gameName: string;
  tagLine: string;
  summonerId: string;
  tier: string;
  rank: string;
  leaguePoints: number;
}
