/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React, { useRef, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import Card from '../../../../components/common/Card/Card';
import { register } from 'swiper/element/bundle';
import { GetProducts } from '../../../../services/products/productsAccess.service';
import './swiper.scss';

const Slider = React.memo(({ data }) => {
  const swiperElRef = useRef(null);
  const showNavigation = data.length > 5;
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
    data.forEach(async (id) => {
      const responce = await GetProducts(id);

      setReceivedData((prev) => [responce, ...prev]);
    });
  }, [data]);

  useEffect(() => {
    register();

    const params = {
      spaceBetween: 20,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        510: {
          slidesPerView: 3,
        },
        710: {
          slidesPerView: 4,
        },
        868: {
          slidesPerView: 3,
        },
        1180: {
          slidesPerView: 4,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' +
                className +
                ' ' +
                styles.paginationBullet +
                '">' +
                '</span>'
              );
            },
          },
        },
      },
      injectStyles: [
        `.swiper-wrapper {z-index: 0;}
        :host {
          z-index: 0;
        }
        .swiper {
          padding: 0 10px 10px;
          transform: translateX(-10px);
        }`,
      ],
    };

    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {showNavigation && (
        <div
          className={`${styles.arrowContainer} ${styles.arrowLeft} swiper-button-prev`}
        >
          <IconButton
            icon={<ICONS.ArrowLeftIcon />}
            isRound={true}
            isOpacity={true}
            isShadow={true}
          />
        </div>
      )}
      <div>
        <swiper-container ref={swiperElRef} init={false}>
          {receivedData.map((card, idx, arr) => {
            return idx !== arr.length - 1 ? (
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
            ) : null;
          })}
        </swiper-container>
        {showNavigation && (
          <div className={`swiper-pagination ${styles.pagination}`}> </div>
        )}
      </div>
      {showNavigation && (
        <div
          className={`${styles.arrowContainer} ${styles.arrowRight} swiper-button-next`}
        >
          <IconButton
            icon={<ICONS.ArrowRightIcon />}
            isRound={true}
            isOpacity={true}
            isShadow={true}
          />
        </div>
      )}
    </div>
  );
});
export default Slider;
