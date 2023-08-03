import '../scss/Carousel.scss'

const Carousel = () => {
  const data = [
    { src: './images/banner-01.jpg', alt: 'перший банер' },
    { src: './images/banner-02.jpg', alt: 'другий банер' },
    { src: './images/banner-03.jpg', alt: 'третій банер' },
  ]
  return (
    <div className="carousel">
      <img
        src="http://localhost:3000/images/button_left.jpg"
        alt="стрілка ліворуч"
        className="arrow arrow-left"
      ></img>
      {data.map((item, index) => {
        return (
          <img src={item.src} alt={item.alt} key={index} className="slide" />
        )
      })}
      <img
        src="./images/button_right.jpg"
        alt="стрілка праворуч"
        className="arrow arrow-right"
      ></img>
      <span className="indicators">
        {data.map((index) => {
          return (
            <button key={index} onClick={null} className="indicator"></button>
          )
        })}
      </span>
    </div>
  )
}

export default Carousel
