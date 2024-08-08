import { useContext, useState } from "react";
import axios from "axios";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthMethod } from "../../methods/AuthMethod";
import { MAIN_SITE_ACTIONS, MainSiteContext } from "../../context/MainSiteContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginScreen = () => {
  const {dispatch}=useContext(MainSiteContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const loginHandler = async (e) => {
    e.preventDefault();
    if(email.trim()==="" || password.trim()==="")return 
    const data={email,password}
    AuthMethod("auth/user/login",data) .then((res) => {
      const { success, data } = res;
      if (success) {
        const item = {
          id: data._id,
          isLogin: success,
          name: data.fName,
        };
        dispatch({ type: MAIN_SITE_ACTIONS.USER_LOGIN, payload: item });
      }
      toast.success("Login Successful");
      setEmail("")
      setPassword("")
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      setPassword("")

      toast.error(err.message);
    });

    

   
  };

  const sendToRegister = () => {
    navigate("/register")
  }
  const sendToForgot = () => {
    navigate("/forgotpassword")
  }

  return (

    <div className="Inclusive-login-page">

      <div className="login-big-wrapper">

        <div className="section-wrapper">

          <div className="top-suggest_register">

            <span>Don't have an account? </span>
            <a onClick={sendToRegister}>Sign Up</a>

          </div>

          <div className="top-login-explain">
            <h2>Login to Your Account </h2>

            <p>
              Please Login Your Account, Thank You!
            </p>


          </div>


          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <a onClick={sendToForgot} className="login-screen__forgotpassword"> Forgot Password ?
            </a>
            
            <button type="submit" >
              Login
            </button>

          </form>


        </div>

        <div className="login-banner-section ">

          <img src="assets/images/login.jpg" alt="banner" width='100%' height='100%' />
        </div>

      </div>


    </div>


  );
};

export default LoginScreen;