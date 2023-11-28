import React from 'react';
import styles from './PriceAndButtons.module.scss';
/* eslint-disable-next-line max-len */
import DiscountPrice from '../../../../components/ui-kit/components/DiscountPrice';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import Button from '../../../../components/ui-kit/components/Button';

const PriceAndButtons = ({
  actualPrice,
  oldPrice,
  stockInfo,
  addToConstructor,
  addToCart,
  inCart,
}) => {
  const isInStock = stockInfo === 'AVAILABLE';

  const addToBouquete = addToConstructor === true;
  return (
    <div className={styles.desktopContainer}>
      {isInStock ? (
        <>
          <div className={styles.price}>
            <DiscountPrice oldPrice={oldPrice} actualPrice={actualPrice} />
          </div>
          <div className={styles.buttons}>
            {!inCart && (
              <Button
                variant="primary"
                label="Додати у кошик"
                padding="padding-sm"
                icon={<ICONS.toCart />}
                onClick={addToCart}
              />
            )}
            {inCart && (
              <Button
                variant="primary"
                label="У кошику"
                padding="padding-bg"
                icon={<ICONS.cartChecked />}
                onClick={addToCart}
              />
            )}
            {addToBouquete ? (
              <>
                <div className={styles.bouquetDesktop}>
                  <Button
                    variant="no-border"
                    label="Додати до букету"
                    padding="padding-header-sm"
                    reverse="true"
                    icon={<ICONS.toBouquet />}
                  />
                </div>
                <div className={styles.bouquetTablet}>
                  {' '}
                  <IconButton icon={<ICONS.BouquetIcon />} />
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <DiscountPrice
            oldPrice={oldPrice}
            actualPrice={actualPrice}
            isActive="NO_ACTIVE"
          />
          <p className={styles.outOfStock}>Нема в наявності</p>
        </>
      )}
    </div>
  );
};
export default PriceAndButtons;
