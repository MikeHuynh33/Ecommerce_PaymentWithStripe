import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Footer from "./components/Footer";
function App() {
  const [visible, setvisible] = useState(false);
  function handleToggle() {
    if (visible === true) {
      setvisible(false);
    } else {
      setvisible(true);
    }
  }
  return (
    <>
      <NavBar visiblehandler={handleToggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route
          path="/Products"
          element={<Products visible={visible} visiblehandler={handleToggle} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
