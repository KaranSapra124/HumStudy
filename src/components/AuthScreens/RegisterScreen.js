import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import {
  MAIN_SITE_ACTIONS,
  MainSiteContext,
} from "../../context/MainSiteContext";
import { AuthMethod } from "../../methods/AuthMethod";
import { toast } from "react-toastify";
const RegisterScreen = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(MainSiteContext);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmpassword: "",
      }));

      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    AuthMethod("auth/user/signup", formData)
      .then((res) => {
        const { success, data } = res;
        if (success) {
          const item = {
            id: data._id,
            isLogin: success,
            name: data.fName,
          };
          dispatch({ type: MAIN_SITE_ACTIONS.USER_SIGNUP, payload: item });
        }
        toast.success("Register Successfully");
        setFormData({
          fName: "",
          lName: "",

          password: "",
          confirmpassword: "",
          email: "",
        });
        navigate("/");
      })
      .catch((err) => {

        toast.error(err.message);
      });
  };

  const sendToLogin = () => {
    navigate("/login");
  };
  console.log(user)
  return (
    <div className="Inclusive-register-page">
      <div className="register-big-wrapper">
        <div className="register-banner-section ">
          <img
            src="assets/images/login.jpg"
            alt="banner"
            width="100%"
            height="100%"
          />
        </div>

        <div className="section-wrapper">
          <div className="top-suggest_login">
            <span> Have an account? </span>
            <a onClick={sendToLogin}>Sign In</a>
          </div>

          <div className="top-register-explain">
            <h2>Welcome to Humstudy </h2>

            <p>
              Seamless education abroad: Admissions, accommodation, loans, visas
              – all covered. Share thoughts freely, connect effortlessly!
            </p>
          </div>

          <form onSubmit={registerHandler}>
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="fName"
                placeholder="Enter First Name"
                value={formData.fName}
                onChange={handleChange}
              />
              <label htmlFor="fName">First Name</label>
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="lName"
                placeholder="Enter Last Name"
                value={formData.lName}
                onChange={handleChange}
              />
              <label htmlFor="fName">Last Name</label>
            </div>
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                value={formData.email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong character"
                onChange={handleChange}
                value={formData.password}
                tabIndex={2}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirm password"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
