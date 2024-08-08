import { useContext, useEffect, useState } from "react";
import "./mainBanner.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router";
import { MainSiteContext } from "../../context/MainSiteContext";

export default function MainBanner({ nextStep }) {
  const { state } = useContext(MainSiteContext);
  const { user, profile } = state;
  const [loanAmount, setLoanAmount] = useState("");
  const [progress, setProgress] = useState(30);
  const navigate = useNavigate();

  const gotoNext = () => {
    if (user?.isLogin) {
      nextStep();
    } else {
      navigate("/login");
    }
  };
  const hasLoanDetails = () => {
    if (profile?.loanDetails) {
      return Object.values(profile.loanDetails).every(elem => elem !== undefined && elem !== null);
    }
    return false;
  };
  
  console.log(hasLoanDetails(),profile.loanDetails)
  

  useEffect(() => {
    if (user?.isLogin && profile?.loanDetails !== null) {
      navigate("/loans");
    }
  }, []);
  
  return (
    <div className="loanFinder-index-section">
      <div className="loanFinder-index mt-5  mb-2 container-xl">
        <div className="row">
          <div className="col-12 col-md-6 d-flex align-items-center">
            <div className="find-loan-left">
              <h3>
                Instant Loans from $100 to $3000 with just 4 steps in few
                minutes.
              </h3>
              <p>
                Select your loan amount above and find your perfect loan. Top
                lenders offer a wide range of installment loan solutions. Cash
                paid within 10 minutes of approvel. An instant decision made
                100% online.
              </p>
              <button
                onClick={gotoNext}
                className="start-btn col-6 col-md-4 col-lg-3 mt-3"
              >
                {" "}
                Get Loan <ChevronRightIcon style={{ color: "#fff" }} />
              </button>
            </div>
            {/* </div> */}
          </div>
          <div className="col-12 col-sm-10 col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="assets/graphic/loan-graphic.png"
              className="find-loan-img"
              alt="Loan"
            />
          </div>
        </div>
      </div>
      <img
        className="contries-bottom"
        src="assets/graphic/bottomcontries.svg"
      />
    </div>
  );
}
