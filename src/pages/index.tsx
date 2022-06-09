import type { NextPage, GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import {
  PageContainer,
  Banner,
  Title,
  Overview,
} from '@components/common/base';
import Header from '@components/common/Header';
import Slider from '@components/slider';
import { getNowPlayingMovie, getUpcomingMovie } from '@api/movie';
import { callImagePath } from '@utils/image';
import { useWindowSize } from '@utils/hooks';
import { getPopularTv, getTopRatedTv } from '@api/tv';
import styled from 'styled-components';
const Home: NextPage<{
  resolvedUrl: string;
}> = ({ resolvedUrl }) => {
  useWindowSize();

  const { data: nowPlayingMoviesData } = useQuery(
    ['nowPlayingMovies'],
    getNowPlayingMovie,
  );
  const { data: popularMoviesData } = useQuery(
    ['upcomingMovies'],
    getUpcomingMovie,
  );
  const { data: popularTvData } = useQuery(['popularTv'], getPopularTv);
  const { data: topRatedTvData } = useQuery(['topRatedTv'], getTopRatedTv);

  return (
    <PageContainer>
      <Header selectItem={resolvedUrl} />
      <>
        {/* <Banner
          bgPhoto={callImagePath({
            id: nowPlayingMoviesData?.results[0].backdrop_path,
          })}
        >
          <Title>{nowPlayingMoviesData?.results[0].title}</Title>
          <Overview>{nowPlayingMoviesData?.results[0].overview}</Overview>
        </Banner>

        <Slider
          title="Now Playing Movies"
          contents={nowPlayingMoviesData?.results ?? []}
        />
        <Slider
          title="Upcoming Movies"
          contents={popularMoviesData?.results ?? []}
        />
        <Slider
          title="Now Playing Tv"
          contents={popularTvData?.results ?? []}
        />
        <Slider title="Top Rated Tv" contents={topRatedTvData?.results ?? []} /> */}
        <Hello>
          <div>Hello</div>
          <img src="images/1.jpeg" alt="" />
          <img src="images/2.jpeg" alt="" />
          <img src="images/3.jpeg" alt="" />
          <img src="images/4.jpeg" alt="" />
          <img src="images/5.jpeg" alt="" />
        </Hello>
      </>
    </PageContainer>
  );
};

export default Home;

const Hello = styled.div`
  color: black;
  height: 500px;
  padding: 50px;
  font-weight: bold;
`;

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['nowPlayingMovies'], getNowPlayingMovie);
  await queryClient.prefetchQuery(['upcomingMovies'], getUpcomingMovie);
  await queryClient.prefetchQuery(['topRatedTv'], getTopRatedTv);
  await queryClient.prefetchQuery(['popularTv'], getPopularTv);

  return { props: { dehydratedState: dehydrate(queryClient), resolvedUrl } };
};
