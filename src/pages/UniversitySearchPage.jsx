import React, { useContext, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import Coverbg from "../components/ui/Coverbg";
import UniversitySearch from "../components/universitySearch/UniversitySearch";
import TrendingSearches from "../components/ui/TrendingSearches";
import Footer from "../components/ui/Footer";
import UniversitySearchBar from "../components/ui/UniversitySearchBar";
import ScrollToTop from "../components/ui/ScrollToTop";
import { MainSiteContext } from "../context/MainSiteContext";
import { FetchProfile } from "../methods/MainMethods";

function UniversitySearchPage() {
  const { state , dispatch} = useContext(MainSiteContext);
  const { profile } = state;

  useEffect(() => {
    console.log("RELOADED")
    const fetchProfile = async () => {
      await FetchProfile("user/profile/get", dispatch, () => {});
    };
    fetchProfile();
  }, []);
  return (
    <>
      <div className="page">
        <Navbar />
        <Coverbg
          heading="Ready for your Dream University ?"
          searchBar={<UniversitySearchBar />}
        />
        {/* <h1>HELLO</ h1> */}
        <UniversitySearch />
        <TrendingSearches />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default UniversitySearchPage;
