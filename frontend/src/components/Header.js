import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../scss/Header.scss'

const Header = () => {
  const [sticky, setSticky] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <header>
      <div className="container-top">
        <NavLink to="/">
          <img
            className="logo"
            src="images/logo.svg"
            alt="логотип магазину 'Квітково'"
          />
        </NavLink>

        <div className="text-icon">
          <img src="images/location-icon.svg" alt="location icon" />
          <p className="city">Київ</p>
        </div>
        <div className="text-icon">
          <img src="images/phone-icon.svg" alt="phone reciever" />
          <p>(093) 777-77-77</p>
        </div>
        <ul>
          <li>
            <NavLink className="links promotions" to="/promotions">
              Акції
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/about">
              Про нас
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/delivery">
              Доставка та оплата
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/handling">
              Догляд за квітами
            </NavLink>
          </li>
          <li className="vertical-line"></li>
          <li className="access-icon">
            <img
              src="images/access-icon.svg"
              alt="person with open arms for accessibility"
            />
          </li>
          <li>
            <button className="btn-language">Укр</button>
          </li>
        </ul>
      </div>

      <div className={`container-bottom ${sticky ? 'sticky' : ''}`}>
        <button className="btn-catalogue">Каталог товарів</button>

        <div className="search">
          <button type="submit" className="search-button">
            <img
              className="search-icon"
              src="images/search-icon.svg"
              alt="magnifying glass icon"
            />
          </button>

          <input className="search-field" type="search" placeholder="Пошук" />
        </div>

        <div className="text-icon">
          <p>Зібрати букет</p>
          <img
            src="images/bouquet-icon.svg"
            alt="three roses wraped in a boquete"
          />
        </div>

        <div className="text-icon">
          <p>Увійти</p>
          <img
            src="images/person-icon.svg"
            alt="person`s head and shoulders outline icon"
          />
        </div>

        <div className="cart">
          <img src="images/cart-icon.svg" alt="cart outline icon" />
        </div>
      </div>
    </header>
  )
}
export default Header
