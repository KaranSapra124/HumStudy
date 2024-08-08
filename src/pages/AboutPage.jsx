import React from "react";
import FoundingStory from "../components/about/FoundingStory";
import Navbar from "../components/ui/Navbar";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import ChooseUs from "../components/about/ChooseUs";
import VisionMission from "../components/about/VisionMission";
import BestService from "../components/about/BestService";
import CustomerReview from "../components/about/CustomerReview";

function AboutPage() {
  return (
    <div className="page">
      <Navbar />
      <FoundingStory />
      <ChooseUs />
      <VisionMission />
      <BestService />
      <CustomerReview />
      <TrendingSearches />
      <Footer />
    </div>
  );
}

export default AboutPage;
