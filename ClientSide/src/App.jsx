import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
function App() {
  const [visible, setvisible] = useState(false);
  const [itemInCart, setItemInCart] = useState(0);
  function handleToggle() {
    if (visible === true) {
      setvisible(false);
    } else {
      setvisible(true);
    }
  }
  return (
    <>
      <NavBar visiblehandler={handleToggle} itemInCart={itemInCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<Home />} />
        <Route
          path="/Products"
          element={
            <Products
              visible={visible}
              visiblehandler={handleToggle}
              setItemInCart={setItemInCart}
            />
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
