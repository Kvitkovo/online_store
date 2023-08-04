import '../scss/Carousel.scss'
import { useEffect, useState } from 'react'

const Carousel = () => {
  const data = [
    { src: './images/banner-01.jpg', alt: 'перший банер' },
    { src: './images/banner-02.jpg', alt: 'другий банер' },
    { src: './images/banner-03.jpg', alt: 'третій банер' },
  ]

  const [slide, setSlide] = useState(0)

  useEffect(() => {
    let slider = setInterval(
      () =>
        setSlide((prevState) =>
          slide === data.length - 1 ? 0 : prevState + 1
        ),
      8000
    )
    return () => {
      clearInterval(slider)
    }
  })

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1)
  }

  return (
    <div className="carousel">
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
        )
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
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={
                slide === index ? 'indicator' : 'indicator indicator-inactive'
              }
            ></button>
          )
        })}
      </span>
    </div>
  )
}

export default Carousel
