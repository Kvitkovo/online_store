import '../scss/Card.scss'
const Card = () => {
  return (
    <div className="card">
      <img src="./images/bouquet.jpg" alt="букет" />
      <h3>Букет “101 троянда”</h3>
      <span>15%</span>
      <div className="card-info">
        <div>
          <p>Ціна</p>
          <p>
            4864 <span>грн</span>
          </p>
        </div>
        <div className="card-flex">
          <p>
            4864 <span>грн</span>
          </p>
          <div>
            <img src="./images/bouquet-card.svg" alt="додати в букет" />
            <img src="./images/cart-card.svg" alt="додати в корзину" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
