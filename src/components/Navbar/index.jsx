import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaHome, FaBook, FaUser, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const token = localStorage.getItem("token");
  const isLogin = token ? true : false;
  const displayMenu = isLogin ? "flex" : "hidden";
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL;
    if (token) {
      axios
        .get(`${baseURL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const handleHamburger = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EFC81A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        navigate("/auth/login");
      }
    });

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const navbar = document.getElementById("navbar");

      if (navbar) {
        if (scrolled > 0) {
          navbar.classList.add("bg-scroll");
        } else {
          navbar.classList.remove("bg-scroll");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="navbar" className="w-full top-0 left-0 z-50 fixed bg-scroll bg-cover bg-center transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-16 lg:px-24 h-16 md:h-24">
        <div className="hidden md:flex gap-10 xl:gap-20 xl:ms-0 text-sm text-[#2E266F] font-bold">
          <NavLink to="/" className={`text-gray-900 hover:text-secondary ${location.pathname === "/" ? "text-primary font-bold" : ""}`}>
            Home
          </NavLink>

          <NavLink to="/recipes/list" className={`${displayMenu} text-gray-900 hover:text-secondary ${location.pathname === "/recipes/list" ? "text-primary font-bold" : ""}`}>
            Recipes
          </NavLink>

          <NavLink to="/profile" className={`${displayMenu} text-gray-900 hover:text-secondary ${location.pathname === "/profile" ? "text-primary font-bold" : ""}`}>
            Profile
          </NavLink>
        </div>

        <button id="hamburger" name="hamburger" type="button" onClick={handleHamburger} className="block md:hidden">
          <FaBars className="text-2xl text-gray-900 hover:text-secondary hidden" />
        </button>

        <div style={{ position: "relative" }}>
          <button id="hamburger" name="hamburger" type="button" onClick={isLogin ? toggleDropdown : null} className="block md:hidden">
            {isLogin ? (
              isDropdownOpen ? (
                <FaTimes className="text-2xl text-gray-900 " />
              ) : (
                <FaBars className="text-2xl text-gray-900 " />
              )
            ) : (
              <img src="/img/icon/User icon.svg" height="50" width="50" alt="icon-user" className="xl:w-12 cursor-pointer" />
            )}
          </button>

          <div className={`hidden md:block ${isDropdownOpen ? "visible" : "hidden"}`}>
            <div onClick={toggleDropdown}>
              {isLogin ? (
                users.image ? (
                  <img src={users.image} height="50" width="50" alt="icon-user" className="rounded-full cursor-pointer" />
                ) : (
                  <img src="/img/icon/User icon.svg" height="50" width="50" alt="icon-user" className="xl:w-12 cursor-pointer" />
                )
              ) : (
                <img src="/img/icon/User icon.svg" height="50" width="50" alt="icon-user" className="xl:w-12 cursor-pointer" />
              )}
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white rounded-md shadow-lg right-0 w-48 ">
              <ul className="block">
                <li className="group xl:hidden lg:hidden md:hidden">
                  <NavLink to="/" className={`flex items-center py-3 px-6 cursor-pointer hover:text-secondary ${location.pathname === "/" ? "text-primary font-bold" : ""}`}>
                    <FaHome className="mr-2" />
                    Home
                  </NavLink>
                </li>
                <li className="group xl:hidden lg:hidden  md:hidden">
                  <NavLink to="/recipes/list" className={`flex items-center py-3 px-6 cursor-pointer hover:text-secondary ${location.pathname === "/recipes/list" ? "text-primary font-bold" : ""}`}>
                    <FaBook className="mr-2" />
                    Recipe
                  </NavLink>
                </li>
                <li className="group xl:hidden lg:hidden md:hidden">
                  <NavLink to="/profile" className={`flex items-center py-3 px-6 cursor-pointer hover:text-secondary ${location.pathname === "/profile" ? "text-primary font-bold" : ""}`}>
                    <FaUser className="mr-2" />
                    Profile
                  </NavLink>
                </li>
                <li className="group">
                  <div className="flex items-center py-3 px-6 cursor-pointer hover:text-secondary" onClick={handleLogout}>
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
