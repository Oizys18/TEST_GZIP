import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export const PaddingPageContainer = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding-top: 68px;
  min-height: 100vh;
  background-color: white;
`;

export const PageContainer = styled.main`
  width: 100vw;
  padding-top: 68px;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: white;
`;

export const InnerWrapper = styled.section`
  max-width: 1680px;
  margin: 0 auto;
`;

const LogoSvg = styled(motion.svg)`
  width: 110px;
  height: 32px;
  cursor: pointer;
`;

const logoVariants: Variants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1, 0, 1],
    transition: {
      duration: 2,
    },
  },
};

export const Logo: React.FC = () => {
  const router = useRouter();
  return (
    <LogoSvg
      width="110"
      height="32"
      viewBox="0 0 110 32"
      variants={logoVariants}
      initial="normal"
      whileHover="active"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => router.push('/')}
    >
      <g fillRule="nonzero" fill="rgb(255, 255, 255)">
        <motion.path d="M54.491 16.59a8.28 8.28 0 0 0-.539-2.72 7.097 7.097 0 0 0-1.312-2.157 6.99 6.99 0 0 0-1.95-1.522 8.193 8.193 0 0 0-2.434-.84 9.93 9.93 0 0 0-1.537-.153c-.467-.009-.934.027-1.401.045l.018-.099c.17-1.074.413-2.156.53-3.24.099-.92.197-1.834.233-2.764.027-.716-.206-1.298-.772-1.754-.405-.331-.926-.51-1.42-.287-.827.367-1.626.788-2.417 1.226a27.815 27.815 0 0 0-4.744 3.338c-2.04 1.781-3.8 3.884-5.121 6.255-5.005 8.484-2.12 20.18 9.38 19.312 7.403-.376 13.675-7.276 13.486-14.64zm-3.073 1.217c-.467 4.465-3.845 8.689-8.212 9.96-2.938.814-6.613.724-8.85-1.567-1.78-1.816-2.264-4.465-2.004-6.962.8-6.81 6.209-12.232 12.229-15.087a74.482 74.482 0 0 0-2.821 8.555c2.003-.233 3.863-.636 5.741-.385 2.866.322 4.223 2.685 3.917 5.486zM101.586 13.797c3.25-1.731 5.503-4.266 5.227-7.278-.926-10.167-26.043-4.76-24.885 3.93.302 2.28 1.727 3.816 3.748 4.744-3.58 1.545-6.063 3.948-5.947 7.075.472 12.843 30.226 11.297 30.271-.486.018-4.346-3.642-6.925-8.414-7.985z" />
        <motion.path d="M18.596 10.184v-.236c1.9-.355 3.548-.71 5.15-1.137L21.785 1 6.565 2.591l.252 12.885-6.222.418c-1.09 2.501-2.18 14.895 11.346 15.368 16.705.59 18.569-18.541 6.655-21.078zM58.448 4.028c-.93 3.64-2.02 7.676-2.915 11.316 0 .01-.036.117-.027.117.009 0 .062.009.07.009 3.005.332 6.151.619 9.173.619-3.173 4.376-6.097 9.003-8.516 13.863l-.071.126-.018.036v.009h.098c2.995 0 6 .053 8.994.08 2.819.027 5.646.045 8.464.063h.017c.346 0 .594-.359.736-.637.886-1.659 1.33-3.533 1.737-5.353.31-1.426.611-2.852.895-4.287.487-2.501.46-2.753.682-4.707.293-2.664.665-6.053.949-8.699L58.448 4.028zM74.542 17.03c-.036.413-.071.825-.098 1.229-.106 1.748-.133 3.497-.195 5.237-.009.314-.088 3.694.027 3.694h-.86c-3.084-.018-9.358-.063-12.256-.08 2.854-5.103 6.567-9.775 9.686-14.698-1.444.188-3.03.413-4.475.556-2.357.126-4.741-.009-7.09-.206.16-.601 1.276-4.914 1.4-5.399 1.906.26 12.584 1.606 14.711 1.875-.16 1.488-.753 6.69-.85 7.792z" />
      </g>
    </LogoSvg>
  );
};

export const Banner = styled.div<{ bgPhoto?: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${({ theme }) => theme.white.lighter};
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${({ bgPhoto }) => bgPhoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: black;
  margin-bottom: 80px;
  padding: 30px;
  @media (min-width: 1024px) {
    padding: 60px;
  }
`;

export const Title = styled.h2`
  font-size: 5vw;
  margin-bottom: 24px;
  font-weight: bold;
`;

export const Overview = styled.p`
  font-size: 1.2vw;
  width: 50%;
  margin-bottom: 40px;
  word-break: keep-all;
`;
