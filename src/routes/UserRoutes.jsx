import "../css/site.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../pages/Profile";

import LandingPage from "../pages/LandingPage";
import UniversitySearch from "../components/universitySearch/UniversitySearch";
import UniversityPage from "../pages/UniversityPage";
import FlightSearchPage from "../pages/FlightSearchPage";
import AccomodationSearchPage from "../pages/AccomodationSearchPage";
import AccomodationPage from "../pages/AccomodationPage";
import AboutPage from "../pages/AboutPage";
import Blogs from "../pages/Blogs";
import Visa from "../pages/Visa";
import LoansPage from "../pages/Loans";
import Bookings from "../pages/Bookings";
import UniversityFinderPage from "../pages/UniversityFinderPage";
import LoanFinderPage from "../pages/LoanFinderPage";
import VisaFinderPage from "../pages/VisaFinderPage";
import LoginScreen from "../components/AuthScreens/LoginScreen";
import RegisterScreen from "../components/AuthScreens/RegisterScreen";
import ForgotPasswordScreen from "../components/AuthScreens/ForgotPasswordScreen";
import EvaluateForm from "../components/loans/EvaluateForm";
import Navbar from "../components/ui/Navbar";
import { FlightsEnquiry } from "../pages/FlightsEnquiry";
import { BlogPage } from "../components/blogs/BlogPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ContactUs from "../pages/ContactUs";
import { MainSiteContext, MainSiteProvider } from "../context/MainSiteContext";
import { useCookies } from "react-cookie";
import { useContext } from "react";

export default function UserRoutes() {
  return (
    <MainSiteProvider>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/search-university" element={<UniversitySearch />} />
        <Route path="/university" element={<UniversityPage />} />
        <Route path="/search-flight" element={<FlightSearchPage />} />
        <Route path="/flight-enquiry" element={<FlightsEnquiry />} />
        <Route
          path="/search-accommodation"
          element={<AccomodationSearchPage />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/accommodation" element={<AccomodationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/visa" element={<Visa />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/find-university" element={<UniversityFinderPage />} />
        <Route path="/find-loan" element={<LoanFinderPage />} />
        <Route path="/find-visa" element={<VisaFinderPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route path="/evaluate" element={<EvaluateForm />} />
        {/* <Route path="/resetpassword" element={<ResetPasswordScreen />} /> */}
        <Route path="*" element={<Navbar />} />
      </Routes>
    </MainSiteProvider>
  );
}

function PrivateRoute({ children }) {
  const [cookies, setCookie] = useCookies(["tokenU"]);
  const { authStatus, dispatch } = useContext(MainSiteContext);

  return authStatus === true ? children : <Navigate to="/login" replace />;
}
