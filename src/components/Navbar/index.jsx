import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaHome, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const token = localStorage.getItem("token");
  const isLogin = token ? true : false;
  const displayMenu = isLogin ? "flex" : "hidden";
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/auth/login");
      }
    });

    setIsDropdownOpen(false);
  };

  // const handleProfile = () => {
  //   navigate("/profile");
  //   setIsDropdownOpen(false);
  // };
  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="flex items-center justify-between px-5 md:px-16 lg:px-24 h-24">
        <div className="hidden md:flex gap-10 xl:gap-20 xl:ms-0 text-sm text-[#2E266F] font-bold">
          <NavLink to="/" className="text-gray-900 hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/recipes" className={`${displayMenu} text-gray-900 hover:text-primary`}>
            Add Recipes
          </NavLink>
          <NavLink to="/profile" className={`${displayMenu} text-gray-900 hover:text-primary`}>
            Profile
          </NavLink>
        </div>

        <button id="hamburger" name="hamburger" type="button" onClick={handleHamburger} className="block md:hidden">
          <FaBars className="text-2xl text-gray-900 hover:text-primary hidden" />
        </button>

        {/* <div className={`md:hidden absolute py-5 bg-white border shadow-xl rounded-lg max-w-[250px] w-full left-8 top-20 z-10 ${isMenuOpen ? "" : "hidden"}`}>
          <ul className="block">
            <li className="group">
              <NavLink to="/" className="flex text-base text-gray-900 py-2 mx-8 group-hover:text-primary">
                Home
              </NavLink>
            </li>
            <li className="group">
              <NavLink to="/recipe-add" className={`${displayMenu}text-base text-gray-900 py-2 mx-8 group-hover:text-primary`}>
                Add Recipe
              </NavLink>
            </li>
            <li className="group">
              <NavLink to="/profile" className={`${displayMenu}text-base text-gray-900 py-2 mx-8 group-hover:text-primary`}>
                Profile
              </NavLink>
            </li>
          </ul>
        </div> */}

        <div style={{ position: "relative" }}>
          <div onClick={toggleDropdown}>
            {isLogin ? (
              users.image ? (
                <img src={users.image} alt="icon-user" className="xl:w-12 rounded-full cursor-pointer" />
              ) : (
                <img src="/img/icon/User icon.svg" alt="icon-user" className="xl:w-12 cursor-pointer" />
              )
            ) : (
              <img src="/img/icon/User icon.svg" alt="icon-user" className="xl:w-12 cursor-pointer" />
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white rounded-md shadow-lg right-0 w-48 ">
              <ul className="block">
                <li className="group xl:hidden lg:hidden md:hidden">
                  <NavLink to="/" className="flex items-center py-3 px-6 cursor-pointer hover:text-primary ">
                    <FaHome className="mr-2" />
                    Home
                  </NavLink>
                </li>
                <li className="group xl:hidden lg:hidden  md:hidden">
                  <NavLink to="/recipe-add" className="flex items-center py-3 px-6 cursor-pointer hover:text-primary">
                    <FaBook className="mr-2" />
                    Add Recipe
                  </NavLink>
                </li>
                <li className="group xl:hidden lg:hidden md:hidden">
                  <NavLink to="/profile" className="flex items-center py-3 px-6 cursor-pointer hover:text-primary">
                    <FaUser className="mr-2" />
                    Profile
                  </NavLink>
                </li>
                <li className="group">
                  <div className="flex items-center py-3 px-6 cursor-pointer hover:text-primary" onClick={handleLogout}>
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
