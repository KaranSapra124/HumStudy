import React, { useEffect, useState } from "react";
import UniversitySlider from "../components/university/UniversitySlider";
import Navbar from "../components/ui/Navbar";
import UniversityHeaderBar from "../components/university/UniversityHeaderBar";
import UniversityInfoSection from "../components/university/UniversityInfoSection";
import ScrollToTop from "../components/ui/ScrollToTop";
import { useLocation } from "react-router";
import { fetchAllData } from "../adminPanel/methods/commonMethod";
import { Modal } from "react-bootstrap";

const headerItems = [
  {
    content: "overview",
    label: "Overview",
  },

  {
    content: "courses",
    label: "Courses",
  },
  {
    content: "location",
    label: "Location",
  },
  {
    content: "scholarship",
    label: "Scholarship",
  },
  {
    content: "ranking",
    label: "Ranking",
  },
  {
    content: "requirements",
    label: "Requirement",
  },
  {
    content: "fees",
    label: "Fee Structure",
  },
];

function UniversityPage() {
  const location = useLocation();
  // console.log(location, "LOCATION");
  const { state } = location;

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(state);
  const university = state;
  console.log(university);

  return (
    <div className="page">
      <Navbar />
      <UniversitySlider
        universityName={university?.universityName}
        location={university?.location}
        images={university?.images}
        courses={university}
      />
      <UniversityHeaderBar headerItems={headerItems} university={university} />

      <UniversityInfoSection
        universityDetails={university}
        // reviews={university?.reviews}
        // courses={courses}
        // images={university?.images}
      />
      <ScrollToTop />
    </div>
  );
}

export default UniversityPage;
