export const callImagePath = ({
  id = '',
  format = 'original',
}: {
  id?: string;
  format?: string;
}) => {
  return `https://image.tmdb.org/t/p/${format}${id}`;
};
