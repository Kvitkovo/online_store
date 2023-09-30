import styles from './Carousel.module.scss';
import React, { useEffect, useState } from 'react';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    let slider = setInterval(
      () =>
        setSlide((prevState) =>
          slide === data.length - 1 ? 0 : prevState + 1,
        ),
      8000,
    );
    return () => {
      clearInterval(slider);
    };
  }, [slide, data.length]);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  // the required distance between touchStart and touchEnd to be detected as
  //  a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    // otherwise the swipe is fired even with usual touch events
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      isLeftSwipe ? prevSlide() : nextSlide();
    }
  };
  return (
    <div
      className={styles.carousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.arrow + ' ' + styles['arrow-left']}>
        <IconButton
          icon={<ICONS.ArrowLeftIcon />}
          isRound={true}
          isOpacity={true}
          onClick={prevSlide}
        />
      </div>
      {data.map((item, index) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={item.src}
            className={
              slide === index
                ? `${styles.slide}`
                : `${styles['slide-hidden'] + ' ' + styles.slide}`
            }
          />
        );
      })}
      <div className={styles.arrow + ' ' + styles['arrow-right']}>
        <IconButton
          icon={<ICONS.ArrowRightIcon />}
          isRound={true}
          isOpacity={true}
          onClick={nextSlide}
        />
      </div>
      <span className={styles.indicators}>
        {data.map((item, index) => {
          return (
            <div
              key={item.src}
              onClick={() => setSlide(index)}
              className={
                slide === index
                  ? `${styles.indicator}`
                  : `${styles.indicator + ' ' + styles['indicator-inactive']}`
              }
            ></div>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;
