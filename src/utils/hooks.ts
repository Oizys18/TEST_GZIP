import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { windowSizeDataStore } from '@store/window';

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useRecoilState(windowSizeDataStore);
  const MAX_WIDTH = 1600;
  // Handler to call on window resize
  const handleResize = () => {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      size: calculateSize(window.innerWidth, MAX_WIDTH),
      padding: calculatePadding(window.innerWidth, MAX_WIDTH),
      maxWidth: MAX_WIDTH,
    });
  };

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function calculateSize(width: number, maxWidth: number) {
  if (width >= maxWidth) {
    return 4;
  } else {
    return 3;
  }
}

export function calculatePadding(width: number, maxWidth: number) {
  if (width >= maxWidth) {
    return 0;
  } else {
    return 20;
  }
}
