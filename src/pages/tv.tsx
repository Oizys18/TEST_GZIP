import type { NextPage, GetServerSideProps } from 'next';

import { PageContainer } from '@components/common/base';
import Header from '@components/common/Header';

const TVshows: NextPage<{
  data: string;
  resolvedUrl: string;
}> = ({ resolvedUrl }) => {
  return (
    <PageContainer>
      <Header selectItem={resolvedUrl} />
      bye
    </PageContainer>
  );
};

export default TVshows;

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  return { props: { data: '1111', resolvedUrl } };
};
