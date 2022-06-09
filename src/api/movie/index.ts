import { base } from '../index';

export type MoviesResult<T> = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MovieInfo = {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  title: string;
};

type Company = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type MovieDetail = Omit<MovieInfo, 'title'> & {
  production_companies: Company[];
  name: string;
};

const getNowPlayingMovie = async () => {
  const { data } = await base.get<MoviesResult<MovieInfo>>(
    `/movie/now_playing?api_key=2fb4869329ce0b1d1dc8d9ebeb00790a&language=en-US`,
  );
  return data;
};

const getUpcomingMovie = async () => {
  const { data } = await base.get<MoviesResult<MovieInfo>>(
    `/movie/upcoming?api_key=2fb4869329ce0b1d1dc8d9ebeb00790a&language=en-US`,
  );
  return data;
};

export { getNowPlayingMovie, getUpcomingMovie };
