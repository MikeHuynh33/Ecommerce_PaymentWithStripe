const CartItem = ({ item }) => {
  return (
    <li className="flex items-start justify-between">
      <h3>
        {item.item_name}
        <span className="text-sm dark:text-violet-400">
          x{item.quantity_cart}
        </span>
      </h3>
      <div className="text-right">
        <span className="block">${item.price}</span>
        <span className="text-sm dark:text-gray-400">
          total : ${(item.quantity_cart * item.price).toFixed(2)}
        </span>
      </div>
    </li>
  );
};
export default CartItem;
