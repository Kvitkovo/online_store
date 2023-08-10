import '../scss/Card.scss'
const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image} alt="букет" />
      <h3>{props.title}</h3>
      <div className="discount">{props.discount}%</div>
      <div className="card-info">
        <p>Ціна</p>
        <div className="old-price">{props.oldPrice} грн</div>
        <div className="card-flex-bottom">
          <div className="actual-price">
            {props.price}
            <span>грн</span>
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
