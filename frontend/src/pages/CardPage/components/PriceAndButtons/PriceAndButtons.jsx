import React from 'react';
import styles from './PriceAndButtons.module.scss';
/* eslint-disable-next-line max-len */
import DiscountPrice from '../../../../components/ui-kit/components/DiscountPrice';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import Button from '../../../../components/ui-kit/components/Button';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const PriceAndButtons = ({
  actualPrice,
  oldPrice,
  stockInfo,
  addToConstructor,
}) => {
  const { width } = useWindowSize();
  const isInStock = stockInfo === 'AVAILABLE';
  const addToBouquete = addToConstructor === true;
  return (
    <div>
      <div className={styles.desktopContainer}>
        {isInStock ? (
          <>
            <div className={styles.price}>
              <DiscountPrice oldPrice={oldPrice} actualPrice={actualPrice} />
            </div>
            <div className={styles.buttons}>
              <Button
                variant="primary"
                label="Додати у кошик"
                padding="padding-sm"
                icon={<ICONS.toCart />}
              />
              {addToBouquete ? (
                <div className={styles.bouquetDesktop}>
                  <Button
                    variant="no-border"
                    label="Додати до букету"
                    padding="padding-header-sm"
                    reverse="true"
                    icon={<ICONS.toBouquet />}
                  />
                </div>
              ) : null}

              <>
                {addToBouquete ? (
                  <div className={styles.bouquetTablet}>
                    {' '}
                    <IconButton icon={<ICONS.BouquetIcon />} />
                  </div>
                ) : null}
              </>
            </div>
          </>
        ) : (
          <>
            <DiscountPrice
              oldPrice={oldPrice}
              actualPrice={actualPrice}
              isActive="NO_ACTIVE"
            />
            <p className={styles.outOfStock}>Немає в наявності</p>
          </>
        )}
      </div>
      {width < 767 && isInStock ? (
        <>
          <div className={styles.priceMobile}>
            <DiscountPrice oldPrice={oldPrice} actualPrice={actualPrice} />
            {addToBouquete ? (
              <span className={styles.bouquetMobile}>
                <IconButton icon={<ICONS.BouquetIcon />} />
              </span>
            ) : null}
          </div>
          <Button
            variant="primary"
            label="Додати у кошик"
            padding="padding-sm"
            icon={<ICONS.toCart />}
            onClick={() => alert('clicked cart')}
            isFullWidth={true}
          />
        </>
      ) : null}{' '}
      {!isInStock && width < 767 && (
        <>
          <DiscountPrice
            oldPrice={oldPrice}
            actualPrice={actualPrice}
            isActive="NO_ACTIVE"
          />
          <p className={styles.outOfStock}>Немає в наявності</p>
        </>
      )}
    </div>
  );
};
export default PriceAndButtons;
