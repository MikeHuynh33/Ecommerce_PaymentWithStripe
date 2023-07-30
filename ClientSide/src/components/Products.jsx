import React from "react";
import { useState, useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart";
const Products = ({ visible, visiblehandler, setItemInCart }) => {
  const [dataProducts, setdataProducts] = useState([]);
  const [cart, setcart] = useState([]);
  const [total, settotal] = useState(0);
  // addItemCart Handler
  function addItemCart(product) {
    const findExistingProduct = cart.find(
      (item) => item.item_ID === product.item_ID
    );
    if (findExistingProduct) {
      setcart(
        cart.map((item) =>
          item.item_ID === product.item_ID
            ? { ...item, quantity_cart: item.quantity_cart + 1 }
            : item
        )
      );
    } else {
      setcart([...cart, { ...product, quantity_cart: 1 }]);
    }
    // add +1 when button click;
    setItemInCart((prevCart) => prevCart + 1);
  }
  // Add Calculation for Total cost
  const calculateTotal = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity_cart,
      0
    );
    settotal(totalPrice);
  };
  // this useEffect will run after the initial render
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetch(
        "http://localhost:1111/api/list-of-item"
      );
      const data = await responseData.json();
      setdataProducts(data);
    };
    fetchData();
  }, []);

  // this useEffect will keep updating total cost , and re-render when cart changes.
  useEffect(() => {
    calculateTotal();
  }, [cart]);
  return (
    <div>
      <div className="flex mt-9 flex-wrap gap-5 justify-center">
        {dataProducts.map((product) => (
          <Product
            key={product.item_ID}
            product={product}
            onAddToCart={addItemCart}
          />
        ))}
      </div>
      <Cart
        itemList={cart}
        visible={visible}
        visiblehandler={visiblehandler}
        totalCost={total.toFixed(2)}
      />
    </div>
  );
};

export default Products;
