import React, { useContext, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import LoanMultiStepForm from "../components/loanFinder/LoanMultiStepForm";
import { MainSiteContext } from "../context/MainSiteContext";
import LoginDiv from "../components/ui/LoginDiv"; // Assuming this component handles the login prompt or redirection
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FetchProfile } from "../methods/MainMethods";

function LoanFinderPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(MainSiteContext);
  const { user, profile } = state;
  const hasLoanDetails = () => {
    if (profile?.loanDetails) {
      return Object.values(profile.loanDetails).every(
        (elem) => elem !== undefined && elem !== null
      );
    }
    return false;
  };
  useEffect(() => {
    console.log("BUG");
    if (user?.isLogin && hasLoanDetails()) {
      navigate("/loans");
    }
    const fetchProfile = async () => {
      await FetchProfile("user/profile/get", dispatch, () => {});
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />

      {/* {!user?.isLogin ||
        (Object.values(profile.loanDetails).some(
          (elem) => elem == undefined || elem === null || elem.length == 0
        ) && <LoanMultiStepForm />)} */}
      <LoanMultiStepForm />
      {/* Uncomment the following lines if you want to include these components */}
      {/* <TrendingSearches /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default LoanFinderPage;
