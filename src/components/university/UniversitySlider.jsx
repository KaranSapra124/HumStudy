import React, { useContext } from "react";
import "./UniversitySlider.css";
import ShareIcon from "@mui/icons-material/Share";
import { FILE_PATH } from "../../utils/apiConfig";
import ImageCarousel from "../ui/Carousel";
import EnquiryCard from "../ui/EnquiryCard";
import { KeyboardDoubleArrowRightSharp, LocationOn } from "@mui/icons-material";
import { userMethod } from "../../userMethods/userMethod";
import { MainSiteContext } from "../../context/MainSiteContext";
import { toast } from "react-toastify";

const responsive = {
  mobile: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

function UniversitySlider(props) {
  const { state } = useContext(MainSiteContext);
  const { user, profile } = state;
  const applyUniversity = (item) => {
    !user?.isLogin
      ? toast.error("Login First")
      : profile?.documents?.academicsDocuments.marksheet10th &&
        profile?.documents?.academicsDocuments?.marksheet12th
      ? userMethod("/apply-university", { course: item }, null, null)
      : toast.error("Complete Your Profile");
  };
  // console.log(props,'UNIVERISTYSLIDER')
  return (
    <div className="universitySlider-section">
      <div className="universitySlider container-xl">
        <div className="universitySlider-topbar d-flex justify-content-between">
          <div className="d-flex align-items-start ">
            <img
              src={FILE_PATH + props?.courses?.university?.universityLogo}
              alt="No Image"
              style={{ width: "5rem", objectFit: "contain" }}
            />
            <div className="topbar-left ml-2 infoCss">
              <h2>{props.courses.courseName}</h2>
              <div className="universityInfoCss">
                <h5>{props.universityName}</h5>
                <p>
                  <LocationOn /> {props.courses.country} | {props.courses.city}
                </p>
              </div>
            </div>
          </div>
          <button
            style={{
              background: "white",
              height: "fit-content",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              display: "flex",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              padding: "1px",
              paddingLeft: "6px",
              alignItems: "center",
              fontSize: "1.1rem",
            }}
            onClick={() => applyUniversity(props?.courses)}
          >
            Apply{" "}
            <span
              style={{
                marginLeft: "10px",
                background: "black",
                color: "white",
                padding: "2px",
                borderRadius: "100%",
                textAlign: "center",
              }}
            >
              <KeyboardDoubleArrowRightSharp />
            </span>
          </button>
        </div>

        {/* <div className="row mt-4 mb-2">
          <div className="col-12 col-sm-12 col-md-7 col-lg-8">
            <ImageCarousel images={props.images} />
          </div>

          <div className="col-12 col-sm-12 col-md-5 col-lg-4 ">
            <EnquiryCard
              heading="Need study Counselling ?"
              subheading="Book a 1-on-1 with our Experts"
              courses={props.courses}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default UniversitySlider;
