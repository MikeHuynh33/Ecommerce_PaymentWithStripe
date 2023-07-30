import cart_logo from "../assets/shopping-cart.png";
const NavBar = ({ visiblehandler, itemInCart }) => {
  return (
    <nav className="bg-gray-800 ">
      <div className="max-w-6xl mx-auto ">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex text-white space-x-4 items-center">
            Logo Camera
          </div>
          {/* Primary nav */}
          <div className="flex space-x-8 items-center  ">
            <a
              className="py-4 text-white text-xl font-extrabold"
              href="./About"
            >
              About
            </a>
            <a
              className="py-4 text-white text-xl font-extrabold"
              href="./Products"
            >
              Product
            </a>
            <a
              className="py-4 text-white text-xl font-extrabold "
              href="./Support"
            >
              Support
            </a>
          </div>
          {/* Secondary nav */}
          <div className="flex space-x-8 items-center">
            <a className="py-4 text-white text-xl font-bold " href="./Login">
              Login
            </a>
            <a
              className="py-2 px-3 text-xl font-medium bg-yellow-400 hover:font-bold rounded"
              href="./SignUp"
            >
              SignUp
            </a>
            <div className="py-4 relative">
              <button onClick={() => visiblehandler()}>
                <img
                  className="w-10 h-10"
                  src={cart_logo}
                  alt="Shopping_cart_Logo"
                ></img>
              </button>
              <span className="absolute cursor-auto text-rose-600 text-lg font-extrabold top-[20%] left-[40%]">
                {itemInCart}
              </span>
              <span className="absolute text-white text-xl font-extrabold top-[30%] left-[115%]">
                Cart
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
