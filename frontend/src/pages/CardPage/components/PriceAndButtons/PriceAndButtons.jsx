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
  canUseInBouquet,
  addToStack,
  deleteFromStack,
  inCart,
  inBouquet,
}) => {
  const isInStock = stockInfo === 'AVAILABLE';

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
                onClick={() => addToStack('cart')}
              />
            )}
            {inCart && (
              <Button
                variant="primary"
                label="У кошику"
                padding="padding-bg"
                icon={<ICONS.cartChecked />}
                onClick={() => deleteFromStack('cart')}
              />
            )}
            {canUseInBouquet ? (
              <>
                {inBouquet ? (
                  <>
                    <div className={styles.bouquetDesktop}>
                      <Button
                        variant="no-border"
                        label="Додано в букет"
                        padding="padding-header-sm"
                        reverse="true"
                        icon={<ICONS.inBouquet />}
                        onClick={() => deleteFromStack('bouquet')}
                      />
                    </div>
                    <div className={styles.bouquetMobile}>
                      <IconButton
                        icon={<ICONS.inBouquet />}
                        onClick={() => deleteFromStack('bouquet')}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.bouquetDesktop}>
                      <Button
                        variant="no-border"
                        label="Додати до букету"
                        padding="padding-header-sm"
                        reverse="true"
                        icon={<ICONS.toBouquet />}
                        onClick={() => addToStack('bouquet')}
                      />
                    </div>
                    <div className={styles.bouquetMobile}>
                      <IconButton
                        icon={<ICONS.BouquetIcon />}
                        onClick={() => addToStack('bouquet')}
                      />
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
        </>
      ) : (
        <div className={styles.price}>
          <DiscountPrice
            oldPrice={oldPrice}
            actualPrice={actualPrice}
            isActive="UNAVAILABLE"
          />
          <p className={styles.outOfStock}>Нема в наявності</p>
        </div>
      )}
    </div>
  );
};
export default PriceAndButtons;
