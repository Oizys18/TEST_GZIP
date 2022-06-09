import type { NextPage, GetServerSideProps } from 'next';

const Search: NextPage<{
  data: string;
}> = (props) => {
  console.log(props);
  return <div></div>;
};

export default Search;

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  return { props: { data: '1111' } };
};
