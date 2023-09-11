import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Handling from './pages/Handling';
import './App.scss';
import ROUTES from './components/constants/routers';
import Header from './components/Header';

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
            <Route path={ROUTES.handling} element={<Handling />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
