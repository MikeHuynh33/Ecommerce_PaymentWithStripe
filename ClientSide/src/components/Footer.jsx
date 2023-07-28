const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-5">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p>Made with ❤️ by Mike Huynh</p>
      </div>
    </footer>
  );
};
export default Footer;
