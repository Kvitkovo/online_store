import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import About from './pages/About';
import Shops from './pages/Shops';
import Delivery from './pages/Delivery';
import Handling from './pages/Handling';
import './App.scss';
// import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/about" element={<About />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/handling" element={<Handling />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
