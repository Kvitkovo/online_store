import '../scss/Carousel.scss';
import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const data = [
    { src: './images/banner-01.jpg', alt: 'перший банер' },
    { src: './images/banner-02.jpg', alt: 'другий банер' },
    { src: './images/banner-03.jpg', alt: 'третій банер' },
  ];

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
  });

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
      className="carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img
        src="http://localhost:3000/images/button_left.jpg"
        alt="стрілка ліворуч"
        className="arrow arrow-left"
        onClick={prevSlide}
      ></img>
      {data.map((item, index) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={index}
            className={slide === index ? 'slide' : 'slide slide-hidden'}
          />
        );
      })}
      <img
        src="./images/button_right.jpg"
        alt="стрілка праворуч"
        className="arrow arrow-right"
        onClick={nextSlide}
      ></img>
      <span className="indicators">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setSlide(index)}
              className={
                slide === index ? 'indicator' : 'indicator indicator-inactive'
              }
            ></div>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;
