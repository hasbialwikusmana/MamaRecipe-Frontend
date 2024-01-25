import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${baseURL}/auth/login`, dataLogin);

      // set token to local storage
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      Swal.fire({
        icon: "success",
        title: "Login success",
        text: "You will be redirected to the home page",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
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
    <div className="2xl:container 2xl:mx-auto h-screen">
      <div
        className="w-full flex flex-row justify-center items-center
        max-sm:justify-center max-sm:items-center max-sm:h-screen max-sm:bg-cover max-sm:bg-center  "
      >
        <div className="bg-[url('/img/login/bg.svg')] max-sm:hidden w-1/2 flex justify-center items-center h-screen 2xl:h-[1200] bg-cover bg-center">
          <img src="/img/login/logo.svg" width="20%" alt="logo" className=" mt-4 mb-4" />
        </div>

        <div
          className="w-1/2 flex flex-col justify-center items-center
        max-sm:w-5/6 max-sm:bg-white max-sm:opacity-90 max-sm:rounded-md"
        >
          <h3 className="max-sm:hidden text-primary text-2xl mt-4 mb-4 font-bold">Welcome</h3>
          <img src="/img/login/logo-yellow.svg" width="20%" alt="logo" className="sm:hidden mt-4 mb-4" />
          <p className="text-[#8692A6] mb-6">Log in into your exiting account</p>
          <form onSubmit={handleChanges} className="w-1/2 max-sm:w-4/5 max-lg:w-3/4  flex flex-col justify-start">
            <label className="text-[#696F79] mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-white text-black border border-slate-400 rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="text"
              name="email"
              id="email"
              placeholder="examplexxx@gmail.com"
              value={dataLogin.email}
              onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
            />

            <label className="text-[#696F79] mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-white text-black border border-slate-400 rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={dataLogin.password}
              onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
            />

            <div className="flex flex-row gap-x-3 mb-7">
              <input type="checkbox" name="terms" id="cb-terms" required className="accent-primary mb-0.5 w-4" checked={agreeTerms} onChange={handleCheckTerms} />
              <label htmlFor="cb-terms" className="text-[#696F79]">
                I agree to terms & conditions
              </label>
            </div>

            <button type="submit" onClick={handleLogin} className={`w-full bg-primary mb-3 rounded-md py-3 text-white ${!agreeTerms && "opacity-50 cursor-not-allowed"}`} disabled={!agreeTerms}>
              Login
            </button>

            <div className="w-full flex justify-end">
              <Link to="#" className="text-xs text-[#999999]">
                Forgot Password ?
              </Link>
            </div>
          </form>
          <p className="text-[#999999] text-sm mt-5 mb-5">
            Don’t have an account?
            <Link to="/auth/register" className="text-primary font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
