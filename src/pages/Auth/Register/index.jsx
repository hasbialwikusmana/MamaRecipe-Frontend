import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.post(`${baseURL}/auth/register`, dataRegister);

      Swal.fire({
        icon: "success",
        title: "Register success",
        text: "You will be redirected to the login page",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/auth/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const handleCheckTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div
        className="w-full flex max-sm:justify-center 
      max-sm:items-center max-sm:h-auto  max-sm:bg-cover max-sm:bg-center"
      >
        <div className="bg-[url('/img/login/bg.svg')] max-sm:hidden w-1/2 flex justify-center items-center h-auto  bg-cover bg-center">
          <img src="/img/login/logo.svg" width="20%" alt="logo" className=" mt-4 mb-4" />
        </div>

        <div
          className="w-1/2 flex flex-col justify-center items-center my-10
        max-sm:w-5/6 max-sm:bg-white max-sm:opacity-90 max-sm:rounded-md"
        >
          <h3 className="max-sm:hidden text-primary text-2xl mt-4 mb-4 font-bold">Let’s Get Started !</h3>
          <img src="/img/login/logo-yellow.svg" width="20%" alt="logo" className="sm:hidden mt-4 mb-4" />
          <p className="text-[#8692A6] mb-6 max-sm:text-center max-sm:mx-5">Create new account to access all features</p>
          <form onSubmit={handleChanges} className="max-sm:w-5/6 max-md:w-3/4 max-lg:w-3/5 w-1/2 flex flex-col justify-start">
            <label className="text-[#696F79] mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full bg-white border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={dataRegister.name}
              onChange={(e) => setDataRegister({ ...dataRegister, name: e.target.value })}
            />

            <label className="text-[#696F79] mb-1" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full bg-white border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              value={dataRegister.email}
              onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })}
            />

            <label className="text-[#696F79] mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full bg-white border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="number"
              name="phone"
              id="phone"
              placeholder="08xxxxxxxxxx"
              value={dataRegister.phone}
              onChange={(e) => setDataRegister({ ...dataRegister, phone: e.target.value })}
            />

            <label className="text-[#696F79] mb-1" htmlFor="password">
              Create New Password
            </label>
            <input
              className="w-full bg-white border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="password"
              name="password"
              id="password"
              placeholder="Create New Password"
              value={dataRegister.password}
              onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })}
            />

            <label className="text-[#696F79] mb-1" htmlFor="password2">
              New Password
            </label>
            <input
              className="w-full bg-white border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="password"
              name="password2"
              id="password2"
              placeholder="New Password"
              value={dataRegister.confirmPassword}
              onChange={(e) => setDataRegister({ ...dataRegister, confirmPassword: e.target.value })}
            />

            <div className="flex flex-row gap-x-3 mb-7">
              <input type="checkbox" name="terms" id="cb-terms" required className="accent-primary mb-0.5 w-4" checked={agreeTerms} onChange={handleCheckTerms} />
              <label htmlFor="cb-terms" className="text-[#696F79]">
                I agree to terms & conditions
              </label>
            </div>

            <button type="submit" onClick={handleRegister} className={`w-full bg-primary mb-3 rounded-md py-3 text-white ${!agreeTerms && "opacity-50 cursor-not-allowed"}`} disabled={!agreeTerms}>
              Register Account
            </button>
          </form>
          <p className="text-[#999999] text-sm mt-5 mb-5">
            Already have account?
            <Link to="/auth/login" className="text-primary font-bold">
              Log in Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
