import React, { useContext, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import Coverbg from "../components/ui/Coverbg";
import AccomodationSearchBar from "../components/ui/AccomodationSearchBar";
import AccommodationSearch from "../components/accomodationSearch/AccommodationSearch";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import { MainSiteContext } from "../context/MainSiteContext";
import { useNavigate } from "react-router";

function AccomodationSearchPage() {
  const { state } = useContext(MainSiteContext);
  const { user } = state;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("LOGIN")
    !user?.isLogin && navigate("/login");
  }, []);
  return (
    <div className='page'>
      <Navbar />
      <Coverbg
        heading='Find your perfect stay'
        // searchBar={<AccomodationSearchBar />}
      />
      <AccommodationSearch />
      {/* <TrendingSearches /> */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default AccomodationSearchPage;
