import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                onClick={() => handleRedirect("")}
                className="flex cursor-pointer items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z" />
                </svg>
                <span className="font-bold">Kategori-ku</span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => handleRedirect("")}
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Home
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => handleRedirect("category")}
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Category
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <button
          onClick={() => handleRedirect("")}
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Home
        </button>
        <button
          onClick={() => handleRedirect("category")}
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Category
        </button>
      </div>
    </nav>
  );
};
