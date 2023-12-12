/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React, { useRef, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import { register } from 'swiper/element/bundle';
import { GetProducts } from '../../../../services/products/productsAccess.service';
import { useParams } from 'react-router-dom';
import './swiper.scss';
import Slide from './Slide';

const Slider = React.memo(({ data }) => {
  const { myId } = useParams();
  const swiperElRef = useRef(null);
  const showNavigation = data.length > 5;
  const [receivedData, setReceivedData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setReceivedData([]);

    const fetchDataForAll = async () => {
      try {
        const requests = data.map(async (id) => {
          if (myId !== id) {
            const response = await GetProducts(id);
            if (isMounted) {
              setReceivedData((prev) => [...prev, response]);
            }
          }
        });

        await Promise.all(requests);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDataForAll();

    return () => {
      isMounted = false;
    };
  }, [data, myId]);

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
          className={
            `${styles.arrowContainer} ${styles.arrowLeft}` +
            ' swiper-button-prev'
          }
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
          {!isLoading &&
            receivedData.map((card) => <Slide card={card} key={card.alias} />)}
        </swiper-container>
        {showNavigation && (
          <div className={`swiper-pagination ${styles.pagination}`}> </div>
        )}
      </div>
      {showNavigation && (
        <div
          className={
            `${styles.arrowContainer} ${styles.arrowRight}` +
            ' swiper-button-next'
          }
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
