import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useViewportScroll,
} from 'framer-motion';
import { useRouter } from 'next/router';

import { Logo } from '@components/common/base';
import Link from 'next/link';

type ItemTypes = '/' | '/tv' | '/tutorials';
type HeaderProps = {
  selectItem: string;
};
type MenuType = {
  key: ItemTypes;
  name: string;
};

const homeMenuList: MenuType[] = [
  { key: '/', name: 'Home' },
  { key: '/tv', name: 'TV Shows' },
  { key: '/tutorials', name: 'Tutorials' },
];

const Header: React.FC<HeaderProps> = ({ selectItem }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();

  const toggleSearchOpen = () => setSearchOpen((prev) => !prev);

  // useEffect(() => {
  //   scrollY.onChange(() => {
  //     if (scrollY.get() > 68) {
  //       navAnimation.start({
  //         backgroundColor: 'rgba(21, 21, 21, 1)',
  //       });
  //     } else {
  //       navAnimation.start({
  //         backgroundColor: 'rgba(21, 21, 21, 0)',
  //       });
  //     }
  //   });
  // }, [scrollY]);

  return (
    <AnimatePresence>
      <Nav
        initial={{ backgroundColor: 'rgba(21, 21, 21, 1)' }}
        animate={navAnimation}
      >
        <Col>
          <Logo />
          <Items>
            {homeMenuList.map((menu, i) => (
              <Link key={`menu-${i}`} href={menu.key}>
                <Item
                  initial={{
                    color: 'rgb(200, 200, 200)',
                  }}
                  animate={{
                    color:
                      selectItem === menu.key
                        ? 'rgb(255, 255, 255)'
                        : 'rgb(200, 200, 200)',
                    transition: {
                      duration: 0.3,
                    },
                  }}
                >
                  {menu.name}
                </Item>
              </Link>
            ))}
          </Items>
        </Col>
        <Col>
          <Search>
            <label htmlFor="search">
              <motion.svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  x: searchOpen ? -175 : 0,
                }}
                transition={{
                  type: 'linear',
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
            </label>
            <Input
              id="search"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: searchOpen ? 1 : 0,
              }}
              transition={{ type: 'linear' }}
              onFocus={toggleSearchOpen}
              onBlur={toggleSearchOpen}
              type="text"
              name="search"
              placeholder="Search..."
            />
          </Search>
        </Col>
      </Nav>
    </AnimatePresence>
  );
};

export default Header;

const Nav = styled(motion.nav)`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 68px;
  top: 0;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.white.darker};
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled(motion.ul)`
  display: flex;
  align-items: center;
  margin-left: 50px;
`;

const Item = styled(motion.li)`
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(200, 200, 200);
  cursor: pointer;
`;

export const Search = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  label {
    display: flex;
    align-items: center;
  }
  svg {
    position: absolute;
    height: 25px;
    left: 180px;
    cursor: pointer;
  }
`;

export const Input = styled(motion.input)`
  transform-origin: right center;
  padding: 8px 16px;
  padding-left: 36px;
  font-size: 16px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.white.lighter};
  border: 1px solid ${({ theme }) => theme.white.lighter};
  border-radius: 2px;
  /* &::placeholder {
    color: ${({ theme }) => theme.white.darker};
  } */
`;
