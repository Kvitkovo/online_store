import { useCallback, useEffect } from 'react';

export const useScroll = ({ scrollOnMount = false, ...options }) => {
  const scroll = useCallback(() => window.scrollTo(options), [options]);

  useEffect(() => {
    scrollOnMount && scroll();
  }, [scroll, scrollOnMount]);

  return scroll;
};
