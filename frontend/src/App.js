import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import About from './pages/About';
import Delivery from './pages/Delivery';
import './App.scss';
import Footer from './components/Footer';
import ROUTES from './constants/routers';
import Header from './components/Layouts/Header';
import CardPage from './pages/CardPage';
import Care from './pages/Care';
import ContactUsPage from './pages/ContactUsPage';
import Faq from './pages/Faq';
import Partner from './pages/Partner';
import Privacy from './pages/Privacy';
import ContactDetails from './components/account/ContactDetails';
import ChangeDetails from './components/account/ChangeDetails';
import Wrapper from './components/Wrapper';
import ProtectedRoutes from './components/ProtectedRoutes';
import ChangePassword from './components/account/ChangePassword';
import Orders from './components/account/Orders';
import SupportModal from './components/common/Support/SupportModal';
import Order from './components/Order/Order';
import RegisterConfirm from './components/login/RegisterConfirm';
/* eslint-disable max-len */
import ResetPasswordPage from './components/login/ResetPassword/ResetPasswordPage';
import CategoryPage from './pages/CategoryPage';
import SearchResult from './pages/SearchResult';
import PlacedOrder from './pages/PlacedOrder';
import Decor from './pages/Decor';
import OrderItemMobile from './components/account/Orders/components/OrderItemMobile';
import { useWindowSize } from './hooks/useWindowSize';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 510;
  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Wrapper>
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.promotions} element={<Promotions />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.delivery} element={<Delivery />} />
            <Route path={ROUTES.care} element={<Care />} />
            <Route path={ROUTES.contacts} element={<ContactUsPage />} />
            <Route path={ROUTES.faq} element={<Faq />} />
            <Route path={ROUTES.partner} element={<Partner />} />
            <Route path={ROUTES.privacy} element={<Privacy />} />
            <Route path={ROUTES.card} element={<CardPage />} />
            <Route path={ROUTES.order} element={<Order />} />
            <Route path={ROUTES.search} element={<SearchResult />} />
            <Route path={ROUTES.placedOrder} element={<PlacedOrder />} />
            <Route
              path={ROUTES.emailConfirmation}
              element={<RegisterConfirm />}
            />
            <Route
              path={ROUTES.passwordReset}
              element={<ResetPasswordPage />}
            />
            <Route path={ROUTES.specificCategory} element={<CategoryPage />} />
            <Route path={ROUTES.decor} element={<Decor />} />
            <Route
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  updateLoginStatus={updateLoginStatus}
                />
              }
            >
              <Routes>
                <Route
                  path={ROUTES.account}
                  element={
                    <ContactDetails updateLoginStatus={updateLoginStatus} />
                  }
                />
                <Route
                  path={ROUTES.changeDetails}
                  element={<ChangeDetails />}
                />
                <Route
                  path={ROUTES.changePassword}
                  element={<ChangePassword />}
                />
                <Route path={ROUTES.orders} element={<Orders />} />
                {isMobile && (
                  <Route
                    path={ROUTES.orderDetailed}
                    element={<OrderItemMobile />}
                  />
                )}
              </Routes>
            </Route>
          </Routes>
          <SupportModal />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
