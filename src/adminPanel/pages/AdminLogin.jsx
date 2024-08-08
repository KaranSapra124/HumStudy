import { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { useNavigate } from "react-router";
import axios from "axios";
// import { BASE_URL } from '../../utils/urls';
// import { ADMIN_ACTIONS, AdminContext } from '../../context/AdminContext';
import { toast } from "react-toastify";
import { adminAuthMethod } from "../methods/adminAuthMethod";
import { FaLastfmSquare } from "react-icons/fa";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState("");
  const [isLoginWrong, setIsLoginWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(FaLastfmSquare);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  const handleLogin = async () => {
    await adminAuthMethod(
      "/adminLogin",
      { username: username, password: password },
      null,
      setIsLoading
    );
    navigate("/admin");
  };

  useEffect(() => {
    if (window.location.pathname.includes("/admin/logout")) {
      toast.success("Log Out Successfully!");
      adminAuthMethod("/adminLogout", null, null, null);
      Cookies.remove("tokenA");
    }
  }, []);

  return (
    <>
      <section className="min-w-[100vw] min-h-[100vh] flex items-center justify-center">
        <div className="p-4 rounded-md shadow-md shadow-gray-400 bg-white md:min-w-[600px]">
          <div className="text-blue_1 flex justify-center">
            <p className="text-8xl rounded-full overflow-hidden w-[70px] h-[70px] border flex justify-center bg-primaryLight text-primary">
              <BiSolidUser />
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 outline-none border border-gray_3 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="email">Password</label>
              <div className="relative flex">
                <input
                  type={isPassVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 outline-none border border-gray_3 rounded-md flex-1"
                />
                <button
                  type="button"
                  onClick={() => setIsPassVisible((prev) => !prev)}
                  className="absolute p-2 right-2 top-2/4 -translate-y-2/4"
                >
                  {isPassVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="p-2 rounded-md bg-primary text-white flex-grow"
            >
              Log in
            </button>
          </form>
          {isLoginWrong && (
            <p className="text-center text-[12px] text-red-400">
              Wrong username or password! <br /> Please try again
            </p>
          )}
        </div>
      </section>
    </>
  );
}
