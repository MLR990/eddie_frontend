export type BaseEntity = {
  _id: string;
  // createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  teamId: string;
  bio: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type League = Entity<{
  name: string;
}>;

export type Team = Entity<{
  name: string;
  code: string;
  city: string;
  nickname: string;
  color1: string;
  color2: string;
  color3: string;
  colorText: string;
  championships: number;
  league: string;
  venue: Venue;
}>;

export type Venue = Entity<{
  name: string;
  latitude: string;
  longitude: string;
}>;

export type Game = Entity<{
  homeTeam: Team;
  homeScore: number;
  awayTeam: Team;
  awayScore: number;
  venue: Venue;
}>;
