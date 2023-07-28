import cart_logo from "../assets/shopping-bag.png";
const NavBar = ({ visiblehandler }) => {
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
            <div className="py-4">
              <button onClick={() => visiblehandler()}>
                <img src={cart_logo} alt="Shopping_cart_Logo"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
