import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import About from './pages/About';
import Delivery from './pages/Delivery';
import './App.scss';
import Footer from './components/Footer';
import ROUTES from './constants/routers';
import Header from './components/Layouts/Header';
import Care from './pages/Care';
import Contacts from './pages/Contacts';
import Faq from './pages/Faq';
import OrderStatus from './pages/OrderStatus';
import Partner from './pages/Partner';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.promotions} element={<Promotions />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.delivery} element={<Delivery />} />
            <Route path={ROUTES.care} element={<Care />} />
            <Route path={ROUTES.contacts} element={<Contacts />} />
            <Route path={ROUTES.faq} element={<Faq />} />
            <Route path={ROUTES.orderStatus} element={<OrderStatus />} />
            <Route path={ROUTES.partner} element={<Partner />} />
            <Route path={ROUTES.privacy} element={<Privacy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
