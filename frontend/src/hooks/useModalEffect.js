import { useEffect } from 'react';

export const useModalEffect = (isOpenCart) => {
  useEffect(() => {
    if (isOpenCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpenCart]);
};
