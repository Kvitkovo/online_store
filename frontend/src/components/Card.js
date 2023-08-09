import '../scss/Card.scss'
const Card = () => {
  return (
    <div className="card">
      <img src="./images/bouquet.jpg" alt="букет" />
      <h3>Букет “101 троянда”</h3>
      <div className="discount">15%</div>
      <div className="card-info">
        <p>Ціна</p>
        <div className="old-price">4864 грн</div>
        <div className="card-flex-bottom">
          <div className="actual-price">
            4864<span>грн</span>
          </div>
          <div className="icons">
            <img
              src="./images/bouquet-card.svg"
              alt="додати в букет"
              className="bouquet"
            />
            <img
              src="./images/cart-card.svg"
              alt="додати в корзину"
              className="cart"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
