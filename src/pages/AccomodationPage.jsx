import React from "react";
import Navbar from "../components/ui/Navbar";
import Coverbg from "../components/ui/Coverbg";
import AccomodationSearchBar from "../components/ui/AccomodationSearchBar";
import AccommodationSearch from "../components/accomodationSearch/AccommodationSearch";
import Accommodation from "../components/accomodation/Accommodation";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

function AccomodationPage() {
  return (
    <div className="page">
      <Navbar />
      <Accommodation />
      <TrendingSearches />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default AccomodationPage;
