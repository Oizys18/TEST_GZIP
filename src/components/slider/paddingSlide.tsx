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

const PaddingSlider = ({ title, contents }: SliderParams) => {
  let timer: NodeJS.Timeout;
  const { width, maxWidth, size, padding } =
    useRecoilValue(windowSizeDataStore);

  const [leaving, setLeaving] = useState(false);
  const [idx, setIdx] = useState(0);

  // 초기에 width가 0으로 할당되어 계산되지 못하기 때문에 초기값 설정
  // CardContainer와 크기가 다른 이유는 해당 width는 윈도우 가로 값이기 때문에 전체 크기에서 패딩값을 제거해야 일치함
  const cardWidth = width
    ? width < maxWidth
      ? (width - 20 * (size - 1) - 2 * padding) / size
      : (maxWidth - 20 * (size - 1)) / size
    : 0;
  console.log(width, maxWidth, size, padding, cardWidth);
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
      {idx > 0 && (
        <PrevButton height={cardHeight} disabled={idx <= 0} onClick={prevVod}>
          <Image src={prevImg} width={35} height={35} />
        </PrevButton>
      )}
      <SliderWrapper height={cardHeight}>
        <AnimatePresence initial={false}>
          <Row
            initial={{
              x: 0,
            }}
            animate={{
              x: -idx * (cardWidth + 20),
            }}
            transition={{ type: 'tween', duration: 1 }}
          >
            {contents.map((content) => (
              <Card key={content.id} content={content} />
            ))}
          </Row>
        </AnimatePresence>
      </SliderWrapper>
      {idx < contentLength - size && (
        <NextButton
          height={cardHeight}
          disabled={idx >= contentLength - size}
          onClick={nextVod}
        >
          <Image src={nextImg} width={35} height={35} />
        </NextButton>
      )}
    </SliderContainer>
  );
};

const Card: React.FC<{ content: MovieInfo }> = ({ content }) => {
  const { id, title, poster_path, backdrop_path } = content;

  return (
    <CardContainer>
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

const CardContainer = styled.div`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.black.darker};
  // 전체 공간중 카드 갯수보다 하나 작은 갯수만큼의 갭을 가지기 때문에 해당 크기를 가지게 됨
  width: calc((100% - 40px) / 3);
  @media (min-width: 1024px) {
    width: calc((100% - 60px) / 4);
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
  transition: transform 0.3s;
  :hover {
    z-index: 1;
    transform: scale(1.2);
  }
`;

const SliderContainer = styled.div`
  position: relative;
  margin-bottom: 36px;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const SliderTitle = styled.h3`
  color: ${({ theme }) => theme.black.darker};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const SliderWrapper = styled.div<{ height?: number }>`
  position: relative;
  height: ${({ height }) => height}px;
  overflow: hidden;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  @media (max-width: 768px) {
    overflow-x: scroll;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MoveButton = styled.button<{ height: number }>`
  position: absolute;
  border: none;
  outline: none;
  z-index: 10;
  padding: 0;
  top: calc((100% + 40px) / 2);
  background-color: transparent;
  cursor: pointer;
`;

const PrevButton = styled(MoveButton)`
  left: -40px;
  @media (max-width: 1024px) {
    display: none;
  }
  transform: translateY(-17.5px);
`;

const NextButton = styled(MoveButton)`
  right: -40px;
  @media (max-width: 1024px) {
    display: none;
  }
  transform: translateY(-17.5px);
`;

export default PaddingSlider;
