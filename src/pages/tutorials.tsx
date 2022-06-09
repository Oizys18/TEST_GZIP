import type { NextPage, GetServerSideProps } from 'next';

import { PageContainer } from '@components/common/base';
import Header from '@components/common/Header';

const Tutorials: NextPage<{
  data: string;
  resolvedUrl: string;
}> = ({ resolvedUrl }) => {
  return (
    <PageContainer>
      <Header selectItem={resolvedUrl} />
      good
    </PageContainer>
  );
};

export default Tutorials;

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  return { props: { data: '1111', resolvedUrl } };
};
