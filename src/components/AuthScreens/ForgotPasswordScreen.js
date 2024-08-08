import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { BsArrowBarLeft } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { AuthMethod } from "../../methods/AuthMethod";
import { toast } from "react-toastify";
import {Oval} from "react-loader-spinner"
const ForgotPasswordScreen = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate =useNavigate()
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    AuthMethod("/auth/user/forgot-password", { email })
      .then((res) => {
        const { message, success } = res;
        if (success) {
          setIsEmailSent(true);
          setLoading(false);
          toast.success(message);
        }
      })
      .catch((err) => {
        setIsEmailSent(false);
        setLoading(false);
        err.message.toLowerCase().includes("email") && toast.error(err.message);
      });
  };
  const changePasswordHandler =  (e) => {
    e.preventDefault();
    setLoading(true)
    AuthMethod("/auth/user/change-password",  {...formData,email})
    .then((res) => {
      const { message, success } = res;
      if (success) {
        setLoading(false);
        toast.success(message);
        navigate("/login")
      }
    })
    .catch((err) => {
      setLoading(false);
      err.message.toLowerCase().includes("email") && toast.error(err.message);
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="Inclusive-forgotPassword-page">
      <div className="forgotPassword-big-wrapper">
        <Link to="/login" className="back_home">
          <BsArrowBarLeft />
        </Link>
        {!isEmailSent ? (
          <form onSubmit={forgotPasswordHandler}>
            <div className="top-forgotpassword-explain">
              <h3>Forgot Password</h3>
              <p>
                Please enter the email address you register your account with.
                We will send you reset password confirmation to this email
              </p>
            </div>

            {error && <div className="error_message">{error}</div>}
            {success && (
              <div className="success_message  ">
                {success} -
                <Link to="/" className="ml-3">
                  Go home
                </Link>
              </div>
            )}

            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">E-mail</label>
            </div>

            {loading ? (
              <button className="d-flex justify-content-center" disabled type="button">
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </button>
            ) : (
              <button  type="submit">Send Email</button>
            )}
          </form>
        ) : (
          <form onSubmit={changePasswordHandler}>
            <div className="top-forgotpassword-explain">
              <h3>Forgot Password</h3>
             
            </div>

            {error && <div className="error_message">{error}</div>}
            {success && (
              <div className="success_message  ">
                {success} -
                <Link to="/" className="ml-3">
                  Go home
                </Link>
              </div>
            )}
            <div style={{ marginTop: "30px" }} className="otp input-wrapper ">
              <OtpInput
                value={formData?.otp}
                inputType="number"
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    otp: +value,
                  }))
                }
                renderInput={(props) => <input {...props} />}
                numInputs={6}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  border: "1px solid #dadcdd",
                  borderRadius: "2px",
                  width: "54px",
                  height: "54px",
                  fontSize: "12px",
                  background: "#fff",
                  marginLeft: "5px",

                  color: "#000",
                  fontWeight: "400",
                  caretColor: "blue",
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              />
              <label htmlFor="otp">Enter One Time password </label>
            </div>

            <div className="input-wrapper mt-1">
              <input
                type="password"
                required
                id="password"
                placeholder="Enter Password"
                value={formData?.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-wrapper mt-1">
              <input
                type="password"
                required
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                value={formData?.confirmPassword}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            {loading ? (
              <button className="d-flex justify-content-center" disabled type="button">
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </button>
            ) : (
              <button  type="submit">Submit</button>
            )}          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
