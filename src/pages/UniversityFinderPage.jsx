import React from "react";
import Navbar from "../components/ui/Navbar";
import MultiStepForm from "../components/universityFinder/MultiStepForm";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import { useLocation } from "react-router";

function UniversityFinderPage() {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <Navbar />
      <MultiStepForm />
      {/* <TrendingSearches /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default UniversityFinderPage;
