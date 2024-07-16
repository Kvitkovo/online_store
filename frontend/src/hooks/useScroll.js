import { useEffect } from 'react';

export const useScroll = ({ scrollOnMount = false, ...options }) => {
  useEffect(() => {
    scrollOnMount && window.scrollTo(options);
  }, [options, scrollOnMount]);

  return () => window.scrollTo(options);
};
