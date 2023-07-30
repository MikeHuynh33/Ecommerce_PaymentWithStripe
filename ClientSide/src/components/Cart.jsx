import React from "react";
import CartItem from "./CartItem";
const Cart = ({ itemList, totalCost, visible, visiblehandler }) => {
  // Create randon ID user
  function generateFakeUserId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fakeUserId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      fakeUserId += characters.charAt(randomIndex);
    }
    return fakeUserId;
  }

  // Create Checkout Button Handler
  async function checkOutBtnHandler(cart) {
    const url_stripe = "http://localhost:1111/api/create-checkout-session";
    const UserId = generateFakeUserId(10);
    const customizeCart = cart.map((item) => ({
      item_ID: item._id,
      item_name: item.item_name,
      quantity_cart: item.quantity_cart,
      price: item.price,
    }));
    const req_Body = {
      UserId: UserId,
      itemList: customizeCart,
    };
    const requestBodyJSON = JSON.stringify(req_Body);
    const response = await fetch(url_stripe, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBodyJSON,
    });
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }
  return (
    <div
      className={`flex fixed ${
        visible ? "visible" : "invisible"
      } top-0 right-0 flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 dark:bg-gray-900 dark:text-gray-100`}
    >
      <h2 className="text-2xl font-semibold">Order items</h2>
      <ul className="flex flex-col pt-4 space-y-2">
        {itemList.map((item) => (
          <CartItem key={item.item_ID} item={item} />
        ))}
      </ul>
      <div className="pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>$5.50</span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>$50.00</span>
          </div>
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-xs hover:underline dark:text-violet-400"
          >
            How do our fees work?
          </a>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">
              ${(parseInt(totalCost) + 55 + 5.5).toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              checkOutBtnHandler(itemList);
            }}
            className="w-full py-2 font-semibold border rounded dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            Go to checkout
          </button>
          <button
            onClick={() => visiblehandler()}
            type="button"
            className="w-full py-2 border rounded-md dark:border-violet-400"
          >
            Back
            <span className="sr-only sm:not-sr-only">to shop</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
