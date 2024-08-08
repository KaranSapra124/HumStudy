import React, { useContext, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/landingPage/Hero";
import Features from "../components/landingPage/Features";
import Services from "../components/landingPage/Services";
import Degree from "../components/landingPage/Degree";
import Discipline from "../components/landingPage/Discipline";
import RouteToUniversity from "../components/landingPage/RouteToUniversity";
import Counselors from "../components/landingPage/Counselors";
import Testimonials from "../components/landingPage/Testimonials";
import News from "../components/landingPage/News";
import Blogs from "../components/landingPage/Blogs";
import Plans from "../components/landingPage/Plans";
import Contact from "../components/landingPage/Contact";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import university from "../assets/graphic/university.json";
import loan from "../assets/graphic/loan.json";
import visa from "../assets/graphic/visa.json";
import house from "../assets/graphic/house.json";
import ScrollToTop from "../components/ui/ScrollToTop";
import UniversityPartner from "../components/landingPage/UniversityPartner";
import { FetchProfile } from "../methods/MainMethods";
import { MainSiteContext } from "../context/MainSiteContext";

const services = [
  {
    heading: "Shortlist University",
    content: "Find your Dream university with our advanced Course Finder",
    btnText: "Find your Dream university",
    link: "/find-university",
    animation: university,
  },
  {
    heading: "Get Education Loan",
    content: " Finance your study abroad dreams with AK Finance",
    btnText: "Get Loan Quote",
    link: "/find-loan",
    animation: loan,
  },
  {
    heading: "Student Accommodation",
    content: " Book your accommodation near top universities across the globe",
    btnText: "Find Accommodation",
    link: "/search-accommodation",
    animation: house,
  },
  {
    heading: "Apply for Visa",
    content: "Get world class visa assistance from our experts",
    btnText: "Apply for Visa",
    link: "/visa",
    animation: visa,
  },
];

function LandingPage() {
  const { state, dispatch } = useContext(MainSiteContext);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("PROFILE")
      await FetchProfile("user/profile/get", dispatch, () => {});
    };
    fetchProfile()
  }, []);
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Features />
      <Services services={services} />
      <Degree />
      <Discipline />
      <RouteToUniversity />
      <Counselors />
      <Testimonials />
      <UniversityPartner />
      <News />
      <Blogs />
      <Plans />
      <Contact />
      <TrendingSearches />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default LandingPage;
