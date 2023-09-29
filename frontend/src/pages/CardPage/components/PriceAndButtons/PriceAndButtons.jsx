import React from 'react';
import styles from './PriceAndButtons.module.scss';
/* eslint-disable-next-line max-len */
import DiscountPrice from '../../../../components/ui-kit/components/DiscountPrice';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import Button from '../../../../components/ui-kit/components/Button';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const PriceAndButtons = () => {
  const { width } = useWindowSize();
  return (
    <div>
      <div className={styles.desktopContainer}>
        <div className={styles.price}>
          <DiscountPrice oldPrice={4864} actualPrice={4000} />
        </div>

        <div className={styles.buttons}>
          <Button
            variant="primary"
            label="Додати у кошик"
            padding="padding-sm"
            icon={<ICONS.toCart />}
          />
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
        </div>
      </div>
      {width < 767 ? (
        <>
          <div className={styles.priceMobile}>
            <DiscountPrice oldPrice={4864} actualPrice={4000} />
            <span className={styles.bouquetMobile}>
              {' '}
              <IconButton icon={<ICONS.BouquetIcon />} />
            </span>
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
      ) : null}
    </div>
  );
};
export default PriceAndButtons;
