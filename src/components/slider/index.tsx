import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';

import { MovieInfo } from '@api/movie';
import { callImagePath } from '@utils/image';
import { windowSizeDataStore } from '@store/window';
import prevImg from '@public/images/icon-left.png';
import nextImg from '@public/images/icon-right.png';
import Link from 'next/link';

type SliderParams = {
  title: string;
  contents: MovieInfo[];
};

const Slider = ({ title, contents }: SliderParams) => {
  let timer: NodeJS.Timeout;
  const { width, size, padding } = useRecoilValue(windowSizeDataStore);
  const [leaving, setLeaving] = useState(false);
  const [idx, setIdx] = useState(0);

  // 초기에 width가 0으로 할당되어 계산되지 못하기 때문에 초기값 설정
  const cardWidth = width ? (width - 2 * padding - 12 * (size - 1)) / size : 0;
  const cardHeight = (cardWidth * 56.25) / 100;
  const contentLength = contents.length ?? 0;

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const prevVod = () => {
    if (leaving) return;
    toggleLeaving();

    // 이전 페이지가 한페이지의 갯수만큼 안될 시에 그 갯수만큼 이동
    const count = idx - size < 0 ? idx : size;

    setIdx((prev) => prev - count);
    timer = setTimeout(() => {
      toggleLeaving();
    }, 1000);
  };

  const nextVod = () => {
    if (leaving) return;
    toggleLeaving();

    // 다음 페이지가 한페이지의 갯수만큼 안될 때 그 갯수만큼 이동
    const count =
      idx + size > contentLength - size
        ? (contentLength - (idx + size)) % size
        : size;

    setIdx((prev) => prev + count);

    timer = setTimeout(() => {
      toggleLeaving();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <SliderContainer>
      <SliderTitle>{title}</SliderTitle>
      <SliderWrapper height={cardHeight}>
        {idx > 0 && (
          <PrevButton disabled={idx <= 0} $padding={padding} onClick={prevVod}>
            <Image src={prevImg} width={35} height={35} />
          </PrevButton>
        )}
        <AnimatePresence initial={false}>
          <Row
            animate={{
              x: -idx * (cardWidth + 12),
            }}
            transition={{ type: 'tween', duration: 1 }}
          >
            {contents.map((content) => (
              <Card key={content.id} content={content} />
            ))}
          </Row>
        </AnimatePresence>
        {idx < contentLength - size && (
          <NextButton
            disabled={idx >= contentLength - size}
            $padding={padding}
            onClick={nextVod}
          >
            <Image src={nextImg} width={35} height={35} />
          </NextButton>
        )}
      </SliderWrapper>
    </SliderContainer>
  );
};

const Card: React.FC<{ content: MovieInfo }> = ({ content }) => {
  const { id, title, poster_path, backdrop_path } = content;

  return (
    <CardContainer
      whileHover={{
        scale: 1.2,
        zIndex: 1,
        transition: {
          delay: 0.3,
          duration: 0.3,
          type: 'tween',
        },
      }}
    >
      <CardWrapper>
        <Link href={'/tv/' + id}>
          <CardImage
            src={callImagePath({ id: backdrop_path, format: 'original' })}
            alt={title}
          />
        </Link>
      </CardWrapper>
    </CardContainer>
  );
};

const CardContainer = styled(motion.div)`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.black.darker};
  width: calc((100% - 60px - 12px) / 2);
  @media (min-width: 768px) {
    width: calc((100% - 60px - 24px) / 3);
  }
  @media (min-width: 1024px) {
    width: calc((100% - 120px - 36px) / 4);
  }
  @media (min-width: 1920px) {
    width: calc((100% - 120px - 60px) / 6);
  }
`;

const CardWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const SliderContainer = styled.section`
  position: relative;
  top: -60px;
  left: 30px;
  @media (min-width: 1024px) {
    left: 60px;
  }
  margin-bottom: 36px;
`;

const SliderTitle = styled.h3`
  color: ${({ theme }) => theme.black.darker};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const SliderWrapper = styled.div<{ height: number }>`
  position: relative;
  height: ${({ height }) => height}px;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
`;

const MoveButton = styled.button<{ $padding: number }>`
  position: absolute;
  border: none;
  outline: none;
  z-index: 10;
  padding: 0;
  top: 50%;
  background-color: transparent;
  cursor: pointer;
`;

const PrevButton = styled(MoveButton)`
  /* left: ${({ $padding }) => -$padding}px; */
  left: -30px;
  @media (min-width: 1024px) {
    left: -60px;
  }
  transform: translate(17.5px, -17.5px);
`;

const NextButton = styled(MoveButton)`
  /* right: ${({ $padding }) => $padding}px; */
  right: 30px;
  @media (min-width: 1024px) {
    right: 60px;
  }
  transform: translate(-17.5px, -17.5px);
`;

export default Slider;
