import { useEffect } from 'react';

export const useModalEffect = ({
  isOpenCart,
  isOpenMyBouquet,
  isPhoneModalOpen,
  isMessageModalOpen,
}) => {
  useEffect(() => {
    if (
      isOpenCart ||
      isOpenMyBouquet ||
      isPhoneModalOpen ||
      isMessageModalOpen
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpenCart, isOpenMyBouquet, isPhoneModalOpen, isMessageModalOpen]);
};
