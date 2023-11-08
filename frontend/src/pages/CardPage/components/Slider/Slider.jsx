/* eslint-disable import/no-unresolved */
import React, { useCallback, useRef, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import Card from '../../../../components/common/Card/Card';
// eslint-disable-next-line max-len
import { GetProducts } from '../../../../services/products/productsAccess.service';
import { register } from 'swiper/element/bundle';

const Slider = React.memo(({ data }) => {
  const [viewedGoods, setViewedGoods] = useState([]);
  const swiperElRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slideNext();
  }, []);
  const getRecentGoods = useCallback(() => {
    setViewedGoods([]);
    data.forEach(async (id) => {
      const product = await GetProducts(id);
      setViewedGoods((state) => {
        if (state.length < data.length - 1) {
          return [...state, product];
        } else {
          return state;
        }
      });
    });
  }, [data]);

  useEffect(() => {
    getRecentGoods();
  }, [getRecentGoods]);

  useEffect(() => {
    register();

    const params = {
      spaceBetween: 20,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        868: {
          slidesPerView: 3,
        },
        1190: {
          slidesPerView: 4,
        },
      },
      injectStyles: [
        `.swiper-wrapper {z-index: 0;} 
        :host {
          z-index: 0;
        } 
        .swiper {overflow-y: visible}`,
      ],
    };

    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  });

  return (
    <div className={styles.sliderContainer}>
      {viewedGoods.length > 4 && (
        <div className={`${styles.arrowContainer} ${styles.arrowLeft}`}>
          <IconButton
            icon={<ICONS.ArrowLeftIcon />}
            isRound={true}
            isOpacity={true}
            onClick={handlePrev}
          />
        </div>
      )}
      <div>
        <swiper-container ref={swiperElRef} init="false">
          {viewedGoods.map((card) => {
            return (
              <swiper-slide key={card.id}>
                <Card
                  image={
                    card.images?.length > 0
                      ? card.images[0]?.urlSmall
                      : '../images/no_image.jpg'
                  }
                  title={card.title}
                  discount={card.discount}
                  oldPrice={card.price}
                  price={card.priceWithDiscount}
                  id={card.id}
                />
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
      {viewedGoods.length > 4 && (
        <div className={`${styles.arrowContainer} ${styles.arrowRight}`}>
          <IconButton
            icon={<ICONS.ArrowRightIcon />}
            isRound={true}
            isOpacity={true}
            onClick={handleNext}
          />
        </div>
      )}
    </div>
  );
});
export default Slider;
