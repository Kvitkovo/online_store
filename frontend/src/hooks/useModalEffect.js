import { useEffect } from 'react';

export const useModalEffect = (isOpenCart, isOpenMyBouquet) => {
  useEffect(() => {
    if (isOpenCart || isOpenMyBouquet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpenCart, isOpenMyBouquet]);
};
