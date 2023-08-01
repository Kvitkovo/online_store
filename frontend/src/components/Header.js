import React from 'react'
import { NavLink } from 'react-router-dom'
import '../scss/Header.scss'
import logo from '../Logo.png'

const Header = () => {
  return (
    <header>
      <div className="container-top">
        <img className="logo" src={logo} alt="логотип магазину 'Квітково'" />
        <div className="city-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 23C12 23 21 17 21 10C21 7.61305 20.0518 5.32387 18.364 3.63604C16.6761 1.94821 14.3869 1 12 1C9.61305 1 7.32387 1.94821 5.63604 3.63604C3.94821 5.32387 3 7.61305 3 10C3 17 12 23 12 23Z"
              stroke="#E1C429"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
              stroke="#E1C429"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="city">Київ</p>
        </div>
        <ul>
          <li>
            <NavLink to="/promotions" className="link">
              Акції
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="link">
              Про нас
            </NavLink>
          </li>
          <li>
            <NavLink to="/shops" className="link">
              Магазини
            </NavLink>
          </li>
          <li>
            <NavLink to="/delivery" className="link">
              Доставка та оплата
            </NavLink>
          </li>
          <li>
            <NavLink to="/handling" className="link">
              Догляд за квітами
            </NavLink>
          </li>
          <li className="vertical-line"></li>
          <li className="access-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8.65442 5.49644C8.62349 5.33536 8.60739 5.16995 8.60739 5.00129C8.60739 3.34373 10.1616 2 12.0787 2C13.9959 2 15.5501 3.34373 15.5501 5.00129C15.5501 5.17048 15.5339 5.3364 15.5029 5.49796L18.3164 4.59049C19.7692 4.12195 21.381 4.79262 21.8638 6.06651C22.3022 7.22323 21.651 8.47845 20.3602 8.96453L16.7072 10.3403V13.4529L18.8862 18.9211C19.3312 20.038 18.733 21.2658 17.4975 21.7706C16.0722 22.3529 14.3762 21.751 13.8352 20.4707L12.0822 16.3217L10.3319 20.4733C9.80809 21.7158 8.19108 22.3292 6.77885 21.8212C5.46985 21.3502 4.8102 20.0803 5.27267 18.9216L7.45027 13.4653V10.3444L3.62397 8.88788C2.25206 8.36565 1.62784 6.98192 2.22852 5.7945C2.80684 4.65129 4.31749 4.09793 5.66971 4.53398L8.65442 5.49644ZM10.343 5.00129C10.343 5.61501 10.7692 6.14269 11.3796 6.37522C11.8224 6.51659 12.3082 6.5197 12.7528 6.38455C13.3766 6.15704 13.8144 5.62336 13.8144 5.00129C13.8144 4.17251 13.0374 3.50064 12.0787 3.50064C11.1201 3.50064 10.343 4.17251 10.343 5.00129ZM10.7243 7.76554L5.06315 5.94001C4.57417 5.78232 4.02789 5.98243 3.81875 6.39583C3.60154 6.82523 3.82727 7.32561 4.32338 7.51447L8.66782 9.16823C8.9827 9.2881 9.18595 9.55748 9.18595 9.85495V13.5912C9.18595 13.6744 9.16991 13.7571 9.13849 13.8359L6.91341 19.4111C6.74999 19.8205 6.98309 20.2692 7.44567 20.4357C7.94471 20.6152 8.51612 20.3985 8.70123 19.9594L10.6103 15.4311C11.1108 14.2441 13.052 14.2435 13.5533 15.4302L15.4655 19.9559C15.6561 20.4069 16.2537 20.619 16.7558 20.4138C17.1911 20.2359 17.4019 19.8034 17.2451 19.4099L15.0188 13.823C14.9876 13.7443 14.9715 13.6617 14.9715 13.5786V9.84865C14.9715 9.55012 15.1763 9.27998 15.4928 9.16076L19.6671 7.58875C20.1369 7.4118 20.374 6.95487 20.2144 6.53379C20.0387 6.07006 19.4519 5.82593 18.9231 5.99649L13.3909 7.78075C12.9861 7.92376 12.5431 8.00257 12.0787 8.00257C11.5983 8.00257 11.1405 7.91816 10.7243 7.76554Z"
                fill="#E1C429"
              />
            </svg>
          </li>
        </ul>
      </div>

      <div className="container-bottom">
        <button className='btn-catalogue'>Каталог товарів</button>

        <div className="search">
          <button type="submit" className="search-button">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#1B1B1B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.9999 21L16.6499 16.65"
                stroke="#1B1B1B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <input className="search-field" type="search" placeholder="Пошук" />
        </div>

        <div className="bouquet">
          <p>Зібрати букет</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
          >
            <g clip-path="url(#clip0_216_3987)">
              <path
                d="M23.5953 15.0823L21.6677 14.0107C22.1802 12.4618 21.5545 10.7096 20.0873 9.86252C18.4548 8.91995 16.3728 9.44022 15.368 11.0134C14.9354 9.56181 13.589 8.5 11.9987 8.5C10.4095 8.5 9.06386 9.56022 8.63027 11.0103C8.15688 10.2699 7.43486 9.74027 6.58047 9.51133C4.70373 9.00845 2.77764 10.1202 2.27472 11.9973C2.09449 12.67 2.11699 13.3649 2.332 14.0109L0.404829 15.0823C-0.00781162 15.3049 -0.0881553 15.7454 0.0936728 16.0663C0.437501 16.6731 1.07458 16.3168 1.07927 16.3163C1.42384 16.1352 1.92578 16.2648 2.11122 16.5859L2.31419 16.9375H2.15495C1.71222 16.9375 1.37838 17.3429 1.46552 17.7785C2.3538 22.2203 5.6058 25.6466 9.57541 27.7566L7.19097 31.4128C6.88684 31.8791 7.22139 32.5 7.77991 32.5H16.2174C16.7742 32.5 17.1114 31.8805 16.8063 31.4128L14.422 27.7567C18.3693 25.6598 21.6373 22.251 22.5319 17.7785C22.6187 17.3443 22.2865 16.9375 21.8424 16.9375H21.6858L21.8888 16.5859C22.0744 16.2644 22.5766 16.1354 22.9208 16.3163C22.9255 16.3168 23.5627 16.6728 23.9064 16.0663C24.0862 15.749 24.0119 15.3069 23.5953 15.0823ZM17.6237 11.3125H16.9493C17.61 10.7417 18.5864 10.6198 19.3841 11.0804C20.1994 11.5511 20.5816 12.4877 20.3892 13.3617C19.2706 12.9421 18.035 12.9453 16.9236 13.3609C16.9547 13.0017 17.2565 12.7188 17.6237 12.7188C18.012 12.7188 18.3268 12.4039 18.3268 12.0156C18.3268 11.6273 18.012 11.3125 17.6237 11.3125ZM14.8112 12.7188H15.6348C15.5568 12.9387 15.5143 13.1755 15.5143 13.4219V14.8281C15.5143 15.7448 14.9264 16.5263 14.108 16.8166V16.2344C14.108 15.0865 13.713 14.0292 13.0518 13.1912C13.5828 12.884 14.1879 12.7188 14.8112 12.7188ZM11.9987 9.90625C12.94 9.90625 13.7391 10.5262 14.0097 11.3792C13.2867 11.4982 12.5999 11.7769 11.9977 12.197C11.4086 11.7855 10.7257 11.4996 9.98795 11.3782C10.2588 10.5257 11.0577 9.90625 11.9987 9.90625ZM9.18616 12.7188C11.1247 12.7188 12.7018 14.2959 12.7018 16.2344V16.9375H10.5924C9.4293 16.9375 8.48303 15.9912 8.48303 14.8281V13.4219C8.48303 13.1754 8.44014 12.9388 8.36209 12.7188H9.18616ZM3.63306 12.3612C3.9348 11.2351 5.09031 10.5679 6.21653 10.8696C6.53027 10.9537 6.81405 11.1056 7.05236 11.3125H6.3737C5.98539 11.3125 5.67058 11.6273 5.67058 12.0156C5.67058 12.4039 5.98539 12.7187 6.3737 12.7187C6.7405 12.7187 7.04219 13.0012 7.07369 13.36C5.9628 12.9453 4.72792 12.9426 3.61024 13.362C3.53767 13.0353 3.54395 12.6938 3.63306 12.3612ZM2.85508 15.329C3.28 15.1903 4.90938 13.6823 7.07884 14.9088C7.09609 15.6685 7.35456 16.3696 7.78183 16.9375H3.93799C3.39784 16.0579 3.31778 15.7071 2.85508 15.329ZM14.9194 31.0938H12.7018V30.3906C12.7018 30.0023 12.387 29.6875 11.9987 29.6875C11.6103 29.6875 11.2955 30.0023 11.2955 30.3906V31.0938H9.07792L10.9733 28.1875H13.024L14.9194 31.0938ZM13.2417 26.7812H10.7555C8.79981 25.8183 4.42164 23.1737 3.04759 18.3391H20.9497C19.5754 23.1745 15.1949 25.8194 13.2417 26.7812ZM20.0621 16.9375H16.2155C16.6425 16.37 16.9009 15.6695 16.9185 14.9104C19.0886 13.6808 20.7261 15.1924 21.145 15.329C20.686 15.704 20.6128 16.0407 20.0621 16.9375Z"
                fill="#E1C429"
              />
            </g>
            <defs>
              <clipPath id="clip0_216_3987">
                <rect
                  width="32"
                  height="32"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="bouquet">
          <p>Увійти</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M20 21.5V19.5C20 18.4391 19.5786 17.4217 18.8284 16.6716C18.0783 15.9214 17.0609 15.5 16 15.5H8C6.93913 15.5 5.92172 15.9214 5.17157 16.6716C4.42143 17.4217 4 18.4391 4 19.5V21.5"
              stroke="#E1C429"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z"
              stroke="#E1C429"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="29" viewBox="0 0 32 29" fill="none">
<path d="M9 28C9.55228 28 10 27.5523 10 27C10 26.4477 9.55228 26 9 26C8.44772 26 8 26.4477 8 27C8 27.5523 8.44772 28 9 28Z" stroke="#6CC25E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 28C20.5523 28 21 27.5523 21 27C21 26.4477 20.5523 26 20 26C19.4477 26 19 26.4477 19 27C19 27.5523 19.4477 28 20 28Z" stroke="#6CC25E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 7H5L7.68 20.39C7.77144 20.8504 8.02191 21.264 8.38755 21.5583C8.75318 21.8526 9.2107 22.009 9.68 22H19.4C19.8693 22.009 20.3268 21.8526 20.6925 21.5583C21.0581 21.264 21.3086 20.8504 21.4 20.39L23 12H6" stroke="#6CC25E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </div>
    </header>
  )
}
export default Header
