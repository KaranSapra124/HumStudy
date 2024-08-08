import React, { useState } from 'react'
import "../AuthScreens/Login.css"
import { useNavigate } from 'react-router';

function LoginDiv() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const sendToRegister = () => {
        navigate("/register")
      }
      const sendToForgot = () => {
        navigate("/forgotpassword")
    }
    
  return (
    <div>
       <div className="login-big-wrapper p-0 w-100">

<div className="section-wrapper p-1 w-100">

  <div className="top-suggest_register">

    <span>Don't have an account? </span>
    <a onClick={sendToRegister}>Sign Up</a>

  </div>

  <div className="top-login-explain mt-4">
    <h4>Login to Your Account </h4>

    <p>
      Please Login Your Account, Thank You!
    </p>


  </div>


  <form  >
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
    <a onClick={sendToForgot}  className="login-screen__forgotpassword"> Forgot Password ?
    </a>
    
    <button type="submit" >
      Login
    </button>

  </form>


</div>


</div>
    </div>
  )
}

export default LoginDiv
