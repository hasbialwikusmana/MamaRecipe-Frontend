import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const token = localStorage.getItem("token");
  const isLogin = token ? true : false;
  const displayMenu = isLogin ? "flex" : "hidden";
  const [isMenuOpen, setMenuOpen] = useState(false);
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

  const handleLogout = () => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, perform logout
        localStorage.clear();
        // You may add additional logout logic here
        // Optionally, you can redirect to the login page or another page
        navigate("/auth/login");
      }
    });
  };

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
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-1 text-white">
          <div>{isLogin ? <img src={users.image} width="32" height="32" alt="icon-user" className="xl:w-10 rounded-full" /> : <img src="/img/icon/User icon.svg" width="32" alt="icon-user" className="xl:w-10" />}</div>
          {/* If in home text-white */}

          <p className="text-white font-semibold text-sm">{isLogin ? "Logout" : "Login"}</p>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
