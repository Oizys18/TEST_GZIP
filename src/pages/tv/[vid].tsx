import { motion } from 'framer-motion';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';

import { InnerWrapper, PaddingPageContainer } from '@components/common/base';
import { callImagePath } from '@utils/image';
import Header from '@components/common/Header';
import { getPopularTv, getTvDetailInfo } from '@api/tv';
import { useWindowSize } from '@utils/hooks';
import PaddingSlider from '@components/slider/paddingSlide';

const TvDetail: NextPage = () => {
  useWindowSize();

  const router = useRouter();
  const { vid } = router.query;
  const id = vid as string;
  const { data: detailTvData } = useQuery(['detailTv'], () =>
    getTvDetailInfo({ tvId: id }),
  );

  const { data: popularTvData } = useQuery(['popularTv'], getPopularTv);

  return (
    <>
      <Header selectItem="" />
      <PaddingPageContainer>
        <InnerWrapper>
          <ImageSection>
            <ImageTv
              src={callImagePath({
                id: `${detailTvData?.backdrop_path}` ?? '',
                format: 'original',
              })}
            />
            <ImageTitle>{detailTvData?.name}</ImageTitle>
            <ImageDescription>{detailTvData?.overview}</ImageDescription>
          </ImageSection>
          <PaddingSlider
            title="Now Playing Tv"
            contents={popularTvData?.results ?? []}
          />
        </InnerWrapper>
      </PaddingPageContainer>
    </>
  );
};

export default TvDetail;

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
  query,
}) => {
  const { vid } = query;
  const id = vid as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['detailTv'], () =>
    getTvDetailInfo({ tvId: id }),
  );
  await queryClient.prefetchQuery(['popularTv'], getPopularTv);

  return { props: { dehydratedState: dehydrate(queryClient), resolvedUrl } };
};

const ImageTv = styled(motion.img)`
  width: 100%;
  height: auto;
`;

const ImageSection = styled.section`
  position: relative;
`;

const ImageTitle = styled.h2`
  position: absolute;
  top: 7.5%;
  left: 5%;
  font-size: 62px;
  font-weight: bold;
`;

const ImageDescription = styled.span`
  position: absolute;
  bottom: 40px;
  left: 20%;
  display: inline-block;
  width: 45%;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.47;
  color: ${({ theme }) => theme.white.lighter};
`;
