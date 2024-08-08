import React from "react";
import Coverbg from "../components/ui/Coverbg";
import Navbar from "../components/ui/Navbar";
import FlightSearchBar from "../components/ui/FlightSearchBar";
import FlightSearch from "../components/flightSearch/FlightSearch";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import ScrollToTop from '../components/ui/ScrollToTop'

function FlightSearchPage() {
  return (
    <div className="page">
      <Navbar />
      <Coverbg
        heading="Ready to Take Off ?"
        searchBar={<FlightSearchBar />}
          />
      <FlightSearch />
      <TrendingSearches />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default FlightSearchPage;
