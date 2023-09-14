import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    const onResize = () => {
      setWindowSize({ width: window.innerWidth });
    };
    window.addEventListener('resize', onResize);

    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return windowSize;
};
