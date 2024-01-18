import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password cannot be empty!",
      });
      return;
    }

    try {
      const response = axios.post("https://mama-recipe-backend.vercel.app/auth/login", formData);

      console.log(response);
      const { token, refreshToken } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      history.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="2xl:container 2xl:mx-auto h-screen">
      <div
        className="w-full flex max-sm:bg-[url('/img/login/bg.svg')]
        max-sm:justify-center max-sm:items-center max-sm:h-screen max-sm:bg-cover max-sm:bg-center"
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
          <form onSubmit={handleSubmit} className="w-1/2 max-sm:w-4/5 max-lg:w-3/4  flex flex-col justify-start">
            <label className="text-[#696F79] mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-white text-black border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="text"
              name="email"
              id="email"
              placeholder="examplexxx@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label className="text-[#696F79] mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-white border border-[#8692A6] rounded p-3 mb-4 text-sm focus:drop-shadow  focus:outline-primary"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex flex-row gap-x-3 mb-7">
              <input type="checkbox" name="terms" id="cb-terms" required className="accent-primary mb-0.5 w-4" />
              <label htmlFor="cb-terms" className="text-[#696F79]">
                I agree to terms & conditions
              </label>
            </div>

            <button type="submit" className="w-full bg-primary mb-3 rounded-md py-3 text-white">
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
