import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/img/OutOutLogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header>
      <div className="flex justify-between items-center mx-2 md:mx-20 py-2 md:py-10 w-screen px-3 md:px-36">
        <img src={logo} alt="" className="w-[20%] md:w-[10%]" />
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex justify-between items-center gap-3">
          <Link
            to="/privacy"
            className="text-primary hover:text-light bg-gradient-to-r from-accent to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-accent text-sm ml-4 cursor-pointer my-4 md:my-0 rounded-full p-3 px-6"
          >
            Privacy Policy
          </Link>

          <a
            href="mailto:get@outout.app"
            className="text-primary hover:text-light bg-gray-200 hover:bg-primary text-sm ml-4 cursor-pointer my-4 md:my-0 rounded-full p-3 px-6"
          >
            Request Support
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-transform ${isMenuOpen ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white/20 backdrop-blur-lg shadow-lg ring-1 ring-black/5 focus:outline-none transition-all">
              <div className="p-2 space-y-2">
                <Link
                  to="/privacy"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm rounded-md hover:bg-white/30 transition-colors"
                >
                  Privacy Policy
                </Link>
                
                <a
                  href="mailto:get@outout.app"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm rounded-md hover:bg-white/30 transition-colors"
                >
                  Request Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;