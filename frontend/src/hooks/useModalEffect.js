import { useEffect } from 'react';

export const useModalEffect = (isActive) => {
  useEffect(() => {
    if (isActive) document.body.classList.add('disableScroll');
    return () => {
      document.body.classList.remove('disableScroll');
    };
  }, [isActive]);
};
