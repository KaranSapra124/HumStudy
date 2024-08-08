import React, { useContext, useState } from "react";
import menuItems from "./MenuItems";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { GooglePlayButton } from "react-mobile-app-button";
import AppStoreButton from "react-appstore-button";
import {
  MAIN_SITE_ACTIONS,
  MainSiteContext,
} from "../../context/MainSiteContext";
import { AuthMethod } from "../../methods/AuthMethod";
import { toast } from "react-toastify";

const items = [
  {
    label: "University",
    key: "find-university",
    icon: "school",
  },
  {
    label: "Accommodation",
    key: "search-accommodation",
    icon: "town",
  },
  {
    label: "Flights",
    key: "flight-enquiry",
    icon: "airplane",
  },
  {
    label: "Loans",
    key: "find-loan",
    icon: "loan",
  },
  {
    label: "Visa",
    key: "visa",
    icon: "boarding-pass",
  },
];
const ProfileLinks = [
  {
    label: "My Profile",
    key: "profile",
    icon: "profile",
  },
  // {
  //   label: "My Bookings",
  //   key: "bookings",
  //   icon:"booking"
  // },
  {
    label: "Log Out",
    key: "logout",
    icon: "logout",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [showService, setShowService] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [active, setActive] = useState(false);
  const {
    state: {
      user: { isLogin, name },
    },
    dispatch,
  } = useContext(MainSiteContext);
  const handleClick = () => {
    setActive(!active);
  };

  const sendTo = (url) => {
    if (url === "logout") {
      AuthMethod("user/logout", {})
        .then((res) => {
          const { success } = res;
          console.log(res);
          if (success) {
            dispatch({ type: MAIN_SITE_ACTIONS.USER_LOGOUT });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

      return;
    } else {
      console.log("NAVIGATE");
      navigate(`/${url}`);
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid d-flex justify-content-between">
        <div className="logo-div">
          <img
            onClick={() => sendTo("")}
            className="navbar-brand m-0 navbar-logo"
            src={require("../../assets/images/humstudy-logo.png")}
          />
          <p className="transparency">100% Transparency</p>
        </div>
        <div className="ms-auto ps-2 pe-2 navbar-logos1 ">
          <img src="assets/icons/call.png" alt="call-icon" />
          <img src="assets/icons/whatsapp2.png" alt="call-icon" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ps-lg-2 ps-0 pe-0"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto">
            <li
              id="nav-search-bar"
              className="nav-search-bar d-flex align-items-center ps-3 pe-2"
            >
              <SearchIcon style={{ color: "#bcbcbc", fontSize: "19px" }} />
              <input
                type="text"
                className="nav-search"
                placeholder="Search for University & Courses"
              />
            </li>

            {menuItems.map((item, index) => {
              return (
                <li
                  className="nav-item ps-lg-2 pe-lg-2 mt-3 mt-lg-0"
                  key={index}
                  onClick={() => sendTo(item.url)}
                >
                  <a className={`nav-link ${item.cName}`} aria-current="page">
                    {item.title}
                  </a>
                </li>
              );
            })}

            <li
              onMouseEnter={() => setShowService(true)}
              onMouseLeave={() => {
                setShowService((prev) => false);
              }}
              className="nav-item dropdown ps-lg-2 pe-lg-2 mt-3 mt-lg-0"
            >
              <a
                className="nav-link dropdown-toggle "
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Service <KeyboardArrowDownIcon className="ms-auto" />
              </a>
              <ul
                // className="dropdown-menu"
                className={
                  showService ? "mt-1 dropdown-menu show" : "mt-1 dropdown-menu"
                }
                aria-labelledby="navbarDropdownMenuLink"
              >
                {items.map((item, index) => {
                  return (
                    <li className="mt-1 service-links d-flex ps-3 p-2">
                      <img
                        className="service-icon"
                        src={`assets/icons/${item?.icon}.png`}
                        alt="navbar"
                      />
                      <a
                        onClick={() => sendTo(item.key)}
                        className="dropdown-item"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>

            {isLogin ? (
              <li
                onMouseEnter={() => setShowProfile(true)}
                className="nav-profile  dropdown ps-lg-2 pe-lg-2 mt-3 mt-lg-0"
              >
                <a
                  className="nav-link text-white  dropdown-toggle "
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {name} <KeyboardArrowDownIcon className="ms-auto" />
                </a>
                <ul
                  onMouseLeave={() => {
                    setShowProfile(false);
                  }}
                  // className="dropdown-menu"
                  className={
                    showProfile
                      ? "mt-1 dropdown-menu show"
                      : "mt-1 dropdown-menu"
                  }
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {ProfileLinks.map((item, index) => {
                    return (
                      <li className="mt-1 service-links d-flex ps-3 p-2">
                        <img
                          className="service-icon"
                          src={`assets/icons/${item?.icon}.png`}
                          alt="navbar"
                        />
                        <a
                          onClick={() => sendTo(item.key)}
                          className="dropdown-item"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ) : (
              <button
                className="signup-btn  mt-3 mt-lg-0 me-2 ms-2 "
                onClick={() => sendTo("login")}
              >
                SignUp/Login
              </button>
            )}
            <div className="navbar-logos2">
              <img src="assets/icons/call.png" alt="call-icon" />
              <img src="assets/icons/whatsapp2.png" alt="call-icon" />
            </div>
            <div className="ms-2 mt-4 download-apps">
              <h5 className="mt-3">Download our app</h5>
              <div className="mt-2 navbar-download nav-app-bar">
                <img
                  src={require("../../assets/icons/downloadappgoogleplay-removebg-preview (1).png")}
                  alt="playstore"
                />
                <img
                  src={require("../../assets/icons/downloadappapple-removebg-preview.png")}
                  alt="appstore"
                />
              </div>
              <button className="mt-5 w-100 call-back-btn">
                Request a Call back
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
