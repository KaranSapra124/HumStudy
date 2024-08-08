import { useContext, useEffect, useState } from "react";
import { userMethod } from "../../userMethods/userMethod";
import { MainSiteContext } from "../../context/MainSiteContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Footer from "../ui/Footer"

export const VisaForm = () => {
  const { state } = useContext(MainSiteContext);
  const { profile, user } = state;
  console.log(profile._id,"PROFILE")
  const navigate = useNavigate();
  const [isOther, setOther] = useState(false);
  const [formData, setFormData] = useState({
    userId: profile._id,
    fullName: "",
    nationality: "",
    country: "",
    purpose: "",
    contactNumber: "",
    emailAddress: "",
    counsellingDate: "",
  });

  const visaStyle = {
    marginTop: "5rem",
    fontSize: "1.5rem",

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userMethod("/add-visa", formData, null);
  };

  const handleSelectChange = (event) => {
    if (event.target.value === "Other") {
      setOther(true);
    } else {
      setOther(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: event.target.value,
      }));
    }
  };

  const handleOtherInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.target.value,
    }));
  };

  const handlePurpose = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      purpose: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!user?.isLogin) {
      toast.error("You have to log in first!");
      navigate("/login");
    }
  }, []);

  return (
   <>
    <div
      className="d-flex justify-content-center align-items-center p-5"
      style={visaStyle}
    >
      <div className="border  bg-white shadow-sm" style={{padding:"5rem",borderRadius:"5px"}}>
        <h1 className="h4 mb-4 fs-1 text-center">Fill The Form For Visa!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input
              name="fullName"
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Your Full Name..."
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nationality:</label>
            <input
              name="nationality"
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Your Nationality..."
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Country:</label>
            <div className="d-flex">
              <select
                className="form-select me-2"
                name="country"
                onChange={handleSelectChange}
              >
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Dubai">Dubai</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
              {isOther && (
                <input
                  onChange={handleOtherInputChange}
                  type="text"
                  placeholder="Enter The Country..."
                  className="form-control"
                />
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Select Purpose:</label>
            <select
              name="purpose"
              className="form-select"
              onChange={handlePurpose}
            >
              <option value="">Select...</option>
              <option value="Study">Study</option>
              <option value="Resident Visa">Resident Visa</option>
              <option value="Travel">Travel</option>
              <option value="Emergency Visa">Emergency Visa</option>
              <option value="Work">Work</option>
              <option value="Visa Booking">Visa Booking</option>
              <option value="Study Loan">Study Loan</option>
              <option value="Flight Ticket">Flight Ticket</option>
              <option value="Accommodation">Accommodation</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number:</label>
            <input
              name="contactNumber"
              onChange={handleInputChange}
              type="number"
              placeholder="Enter Your Contact..."
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address:</label>
            <input
              name="emailAddress"
              onChange={handleInputChange}
              type="email"
              placeholder="Enter Your Email..."
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Counselling Date:</label>
            <input
              name="counsellingDate"
              type="date"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100">
            Apply
          </button>
        </form>
      </div>
    </div>
    <Footer/>
   </>
  );
};
