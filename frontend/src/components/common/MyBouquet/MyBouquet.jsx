import React, { useCallback, useMemo, useState } from 'react';

import Modals from '../Modals';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';
import Divider from '../../ui-kit/components/Divider';
import MyBouquetItem from './components/MyBouquetItem';
import MyBouquetEmpty from './components/MyBuoquetEmpty';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer';
import { ICONS } from '../../ui-kit/icons';
import styles from './MyBouquet.module.scss';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../../../redux/slices/cartSlice';
import ConfirmationPopup from './components/ConfirmationPopup';

const MyBouquet = React.memo(({ toggleMyBouquet }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bouquetItems, cartItems } = useSelector(
    (state) => state.cartSliceReducer,
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const hasItems = bouquetItems.length > 0;

  const totalSum = useMemo(
    () =>
      bouquetItems.reduce(
        (sum, obj) => sum + obj.priceWithDiscount * obj.cardQuantity,
        0,
      ),
    [bouquetItems],
  );
  const totalAmount = useMemo(
    () => bouquetItems.reduce((sum, obj) => sum + +obj.cardQuantity, 0),
    [bouquetItems],
  );
  const clearAll = useCallback(() => {
    if (hasItems) {
      dispatch(clearCart({ type: 'bouquet' }));
    }
    setModalOpen(false);
  }, [dispatch, hasItems]);

  const addMore = useCallback(() => {
    toggleMyBouquet();
    navigate('/categories/15');
  }, [navigate, toggleMyBouquet]);

  const addBouquetToCart = useCallback(() => {
    const createdBouquets = cartItems
      .filter((item) => item.title.includes('Свій букет'))
      .sort((a, b) => Number(a.id) - Number(b.id));
    const lastIdx = +createdBouquets[createdBouquets.length - 1]?.id;
    const findIdx = lastIdx ? lastIdx + 1 : 1;
    const formatedIdx = findIdx.toString().padStart(3, '0');
    dispatch(
      addToCart({
        info: {
          id: formatedIdx,
          title: `Свій букет #${formatedIdx}`,
          cardQuantity: 1,
          discount: 0,
          image: '/images/new_bouquet.jpg',
          price: totalSum,
          priceWithDiscount: totalSum,
          orderItemsCompositions: JSON.parse(localStorage.getItem('bouquet')),
        },
        type: 'cart',
      }),
    );
    clearAll();
    toggleMyBouquet();
  }, [cartItems, clearAll, dispatch, toggleMyBouquet, totalSum]);

  const handleDeleteAll = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <Modals type="myBouquet" onClick={toggleMyBouquet}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <p className={styles.title}>
            {width > 867 ? 'Створення власного букету' : 'Створення букету'}
          </p>
          <IconButton
            icon={<ICONS.CloseIcon className={styles.icon} />}
            onClick={toggleMyBouquet}
          />
        </div>
        {hasItems ? <MyBouquetItem items={bouquetItems} /> : <MyBouquetEmpty />}
      </div>
      <div className={styles.bottomBlock}>
        <div className={styles.changeItems}>
          <span
            className={hasItems ? styles.deleteAll : styles.noActiveDelete}
            onClick={handleDeleteAll}
            disabled={!hasItems}
          >
            Видалити все
          </span>
          {isModalOpen && (
            <ConfirmationPopup
              setIsOpen={setModalOpen}
              confirmedAction={clearAll}
              action={'Видалити'}
            />
          )}
          <Button
            label={width > 867 ? 'Додати компонент' : 'Додати'}
            variant="secondary"
            padding="padding-sm"
            icon={<ICONS.addComponent />}
            onClick={addMore}
          />
        </div>
        <div className={styles.divider}>
          <Divider />
        </div>

        <div className={styles.bottom}>
          <div className={styles.total}>
            <p>Разом:</p>
            <div>
              <b>{totalAmount}</b>
              <span>шт</span>
              <b className={styles.sum}>{totalSum}</b>
              <span>грн</span>
            </div>
          </div>
          <div className={styles.button}>
            <Button
              label="Зібрати букет"
              variant={hasItems ? 'primary' : 'disabled'}
              padding="padding-even"
              onClick={addBouquetToCart}
              disabled={bouquetItems.length === 0}
            />
          </div>
        </div>
      </div>
      {width < 868 && <Footer />}
    </Modals>
  );
});

export default MyBouquet;
