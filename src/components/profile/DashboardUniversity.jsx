import React, { useContext, useEffect, useState } from "react";
import "./DashboardUniversityCard.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MainSiteContext } from "../../context/MainSiteContext";
import { userMethod } from "../../userMethods/userMethod";

function DashboardUniversity() {
  const profileData = useContext(MainSiteContext);
  const { state } = profileData;
  const { profile } = state;
  // const { universitiesApplied } = profile;
  // console.log(universitiesApplied);
  const [universitiesApplied, setUniversitiesApplied] = useState([]);

  useEffect(() => {
    userMethod("/get-universities", null, setUniversitiesApplied, null);
  }, []);

  return (
    <div className="row">
      {universitiesApplied.map((item, index) => {
        return (
          <div className="col-12 col-lg-6  mt-2">
            <div className=" card  ">
              <div className="dashbaord-university-card">
                <img
                  className="w-50"
                  src="assets/images/university.jpg"
                  alt="university"
                />
                <div className="dashboard-university-content">
                  <p>{item?.courseDetail?.universityName}</p>
                  <p>
                    <LocationOnIcon fontSize="small" className="pb-1" />{" "}
                    {item?.courseDetail?.country}
                  </p>
                  <h5>{item?.status}</h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardUniversity;
