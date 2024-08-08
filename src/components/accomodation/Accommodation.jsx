import React, { useContext, useEffect } from "react";
import "./Accommodation.css";

import UniversityInfoBar from "../university/UniversityInfoBar";
import Reviews from "../ui/Reviews";
import AmenitiesBar from "../ui/AmenitiesBar";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import WifiIcon from "@mui/icons-material/Wifi";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WaterIcon from "@mui/icons-material/Water";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccommodationSlider from "./AccommodationSlider";
import UniversityHeaderBar from "../university/UniversityHeaderBar";
import { MainSiteContext } from "../../context/MainSiteContext";
import { useNavigate } from "react-router";

const amenities = [
  {
    icon: <AcUnitIcon style={{ color: "#454545" }} />,
    content: "AC",
  },
  {
    icon: <PersonalVideoIcon style={{ color: "#454545" }} />,
    content: "Television",
  },
  {
    icon: <WifiIcon style={{ color: "#454545" }} />,
    content: "AC",
  },
  {
    icon: <DinnerDiningIcon style={{ color: "#454545" }} />,
    content: "Meal",
  },
  {
    icon: <KitchenIcon style={{ color: "#454545" }} />,
    content: "Fridge",
  },
  {
    icon: <AutoStoriesIcon style={{ color: "#454545" }} />,
    content: "Library",
  },
  {
    icon: <WaterIcon style={{ color: "#454545" }} />,
    content: "Geyser",
  },
  {
    icon: <LocalParkingIcon style={{ color: "#454545" }} />,
    content: "Parking",
  },
];

const accommodationDetails = [
  {
    heading: "Description",
    content:
      "Did you know that we’ve got 2.5 Crore bookings since March 2020? And this is all thanks to the sanitisation & safety measures followed at our properties, from disinfecting surfaces with high-quality cleaning products and maintaining social distance to using protective gear and more.",
  },
  {
    heading: "Location",
    content:
      " Located near Iblur Lake in Bangalore, the place is an excellent stay choice with contemporary interiors and free Wi-Fi. Places of tourist interest located close to the place include the Bellandur Lake, the Bangalore Palace, Lalbagh Botanical Garden, and the Lumbini Gardens",
  },
  {
    heading: "Near by Places",
    content:
      "Located near Iblur Lake in Bangalore, the place is an excellent stay choice with contemporary interiors and free Wi-Fi. Places of tourist interest located close to the place include the Bellandur Lake, the Bangalore Palace, Lalbagh Botanical Garden, and the Lumbini Gardens",
  },
  {
    heading: "Policies",
    content: [
      <li>Only Indians are allowed</li>,
      <li>
        Guests can check in using any local or outstation ID proof (PAN card not
        accepted).
      </li>,
      <li>Couples are welcome</li>,
    ],
  },
];
const reviews = [
  {
    img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    name: "John Smith",
    rating: 5,
    review:
      "Awesome experience. Manager Krishnan is a very humble and soft natured and professional manager. Had a great stay here.Awesome experience. Manager Krishnan is a very humble and soft natured and professional manager. Had a great stay here.",
  },
  {
    img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    name: "Maria Singh",
    rating: 4,
    review:
      "Awesome experience. Manager Krishnan is a very humble and soft natured and professional manager. Had a great stay here.Awesome experience. Manager Krishnan is a very humble and soft natured and professional manager. Had a great stay here.",
  },
];

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
    content: "gallary",
    label: "Gallary",
  },
  {
    content: "reviews",
    label: "Reviews",
  },
];

function Accommodation() {
  
  return (
    <>
      <div className="">
        <AccommodationSlider />
      </div>
      <UniversityInfoBar details={accommodationDetails} />
      <AmenitiesBar amenities={amenities} />
      <Reviews reviews={reviews} />
    </>
  );
}

export default Accommodation;
