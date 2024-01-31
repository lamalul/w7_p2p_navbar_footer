import '../../Styles/styles.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Skelet/Header';
import Footer from '../Skelet/Footer';
import Home from '../Skelet//Home';
import Contact from '../Skelet//Contact';
import AboutUs from '../Skelet//AboutUs';
import Sidebar from '../Skelet//Sidebar';

//https://www.freecodecamp.org/news/how-to-use-props-in-reactjs/
//https://chat.openai.com/share/cd4c1d38-7195-4b3f-9431-a34e39ad1c4e
//https://www.coursera.org/learn/react-basics/lecture/Bj28Z/using-props-in-components

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="content-container">

          {/* Main content area */}
          <div className="main">
            <Routes>
              <Route path="/" element={<Home greeting="Huhu" />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>

          {/* Include the Sidebar component */}
          <div className="sidebar">
            <Sidebar greeting="Hi" />
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
