import React, { useContext, useEffect, useState } from "react";
import "./UniversitySearch.css";
import UniversitySearchFilter from "./UniversitySearchFilter";
import UniversitySearchResultCard from "./UniversitySearchResultCard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Modal } from "antd";
import LoginDiv from "../ui/LoginDiv";
import { FetchProfile } from "../../methods/MainMethods";
import { MainSiteContext } from "../../context/MainSiteContext";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const universitySortValues = [
  "Popularity",
  "Tuition Fee",
  "Ranking",
  "Year of Est.",
];

function UniversitySearch() {
  const { state, dispatch } = useContext(MainSiteContext);
  const [sortItem, setSortItem] = useState(1);
  const [filter, showFilter] = useState(false);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [university, setUniversities] = useState(null);
  const [findUni, setFindUni] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { profile, user, unisFilter } = state;
  const navigate = useNavigate();
  const [profileLoading, setProfileLoading] = useState(true);

  const handleCancel = () => {
    setLogin(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await FetchProfile("user/profile/get", dispatch, () => {});
      setProfileLoading(false);
    };
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    if (!profileLoading && !user?.isLogin) {
      navigate("/login");
    }
  }, [profileLoading, user?.isLogin, navigate]);

  if (profileLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="universitySearch-section" style={{ marginTop: "3rem" }}>
        <div className="universitySearch container-xll">
          <div className="row">
            <div className="col-0 col-sm-0 col-md-4 col-lg-3 px-4">
              <UniversitySearchFilter
                setLogin={setLogin}
                isLogin={user?.isLogin}
                filter={filter}
              />
              <Modal onCancel={handleCancel} footer={null} open={login}>
                <LoginDiv />
              </Modal>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9">
              <div className="universitySearch-results">
                <div className="filter-tag-bar">
                  <h5
                    onClick={() => showFilter(!filter)}
                    className="filter-tag"
                  >
                    <FilterAltIcon /> Filter
                  </h5>
                </div>
                <UniversitySearchResultCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UniversitySearch;
