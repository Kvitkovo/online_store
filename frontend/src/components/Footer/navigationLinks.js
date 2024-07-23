import React from 'react';
import { ICONS } from '../ui-kit/icons';
import ROUTES from '../../constants/routers';

export const kvitkovoLinks = [
  { route: ROUTES.about, text: 'Про нас' },
  { route: ROUTES.contacts, text: 'Контакти' },
  { route: ROUTES.partner, text: 'Стати партнером' },
  { route: ROUTES.privacy, text: 'Політика конфіденційності' },
];

export const clientLinks = [
  { route: ROUTES.delivery, text: 'Доставка та оплата' },
  { route: ROUTES.promotions, text: 'Акції в Kvitkovo' },
  { route: ROUTES.care, text: 'Догляд за квітами' },
  { route: ROUTES.faq, text: 'Поширені запитання' },
];

export const socialsLinks = [
  { icon: <ICONS.facebook />, url: 'https://uk-ua.facebook.com/' },
  { icon: <ICONS.instagram />, url: 'https://www.instagram.com/' },
  { icon: <ICONS.youtube />, url: 'https://www.youtube.com/' },
];
