import { MovieDetail, MovieInfo, MoviesResult } from '@api/movie';
import { base } from '../index';

const getTopRatedTv = async () => {
  const { data } = await base.get<MoviesResult<MovieInfo>>(
    `/tv/top_rated?api_key=2fb4869329ce0b1d1dc8d9ebeb00790a&language=en-US`,
  );
  return data;
};

const getPopularTv = async () => {
  const { data } = await base.get<MoviesResult<MovieInfo>>(
    `/tv/popular?api_key=2fb4869329ce0b1d1dc8d9ebeb00790a&language=en-US`,
  );
  return data;
};

const getTvDetailInfo = async ({ tvId }: { tvId: string }) => {
  const { data } = await base.get<MovieDetail>(
    `/tv/${tvId}?api_key=2fb4869329ce0b1d1dc8d9ebeb00790a&language=en-US`,
  );
  return data;
};

export { getTopRatedTv, getPopularTv, getTvDetailInfo };
