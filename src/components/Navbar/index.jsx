import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleHamburger = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="flex items-center justify-between px-5 md:px-16 lg:px-24 h-24">
        <div className="hidden md:flex gap-10 xl:gap-20 xl:ms-0 text-sm text-[#2E266F] font-bold">
          <NavLink to="/" className="text-gray-900 hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/recipe-add" className="text-gray-900 hover:text-primary">
            Add Recipes
          </NavLink>
          <NavLink to="/profile" className="text-gray-900 hover:text-primary">
            Profile
          </NavLink>
        </div>

        <button id="hamburger" name="hamburger" type="button" onClick={handleHamburger} className="block md:hidden">
          <FaBars className="text-2xl text-gray-900 hover:text-primary" />
        </button>

        <nav id="nav-menu" className={`md:hidden absolute py-5 bg-white border shadow-xl rounded-lg max-w-[250px] w-full left-8 top-20 z-10 ${isMenuOpen ? "" : "hidden"}`}>
          <ul className="block">
            <li className="group">
              <NavLink to="/" className="flex text-base text-gray-900 py-2 mx-8 group-hover:text-primary">
                Home
              </NavLink>
            </li>
            <li className="group">
              <NavLink to="/recipe-add" className="text-base text-gray-900 py-2 mx-8 group-hover:text-primary">
                Add Recipe
              </NavLink>
            </li>
            <li className="group">
              <NavLink to="/profile" className="text-base text-gray-900 py-2 mx-8 group-hover:text-primary">
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to="/auth/login" className="flex items-center gap-1 text-white">
          <div>
            <img src="/img/icon/User icon.svg" width="32" alt="icon-user" className="xl:w-10" />
          </div>
          {/* If in home text-white */}

          <p className="text-white font-semibold text-sm">Login</p>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
