import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetProducts } from '../services/products/productsAccess.service';
import { initiateCart } from '../redux/slices/cartSlice';

export const usePopups = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenMyBouquet, setIsOpenMyBouquet] = useState(false);

  const dispatch = useDispatch();
  const getPrevData = useCallback(
    async (type) => {
      const prevList = JSON.parse(localStorage.getItem(type)) || [];

      const cartList = [];
      for (const item of prevList) {
        const { id, cardQuantity, orderItemsCompositions } = item;
        if (orderItemsCompositions) {
          const price = orderItemsCompositions.reduce((acc, item) => {
            acc + item.cardQuantity * item.priceWithDiscount;
          }, 0);
          const newItem = {
            id: id,
            title: `Свій букет #${id}`,
            cardQuantity: cardQuantity,
            discount: 0,
            image: '/images/new_bouquet.jpg',
            price: price,
            priceWithDiscount: price,
            orderItemsCompositions: orderItemsCompositions,
          };

          cartList.push(newItem);
        } else {
          const info = await GetProducts(item.id);
          const { id, images, title, price, priceWithDiscount } = info;
          const newItem = {
            id: id,
            title: title,
            price: price,
            priceWithDiscount: priceWithDiscount,
            image: images[0] ? images[0].urlSmall : '/images/no_image.jpg',
            cardQuantity: item.cardQuantity,
          };

          cartList.push(newItem);
        }
      }

      dispatch(
        initiateCart({
          items: cartList,
          type: type,
        }),
      );
    },
    [dispatch],
  );

  const toggleCart = () => {
    setIsOpenCart((prev) => !prev);
  };

  const toggleMyBouquet = () => {
    setIsOpenMyBouquet((prev) => !prev);
  };

  return {
    isOpenCart,
    isOpenMyBouquet,
    toggleCart,
    toggleMyBouquet,
    getPrevData,
  };
};
