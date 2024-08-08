import React, { useEffect, useState } from "react";
import "./UniversityHeaderBar.css";
import { Modal } from "react-bootstrap";
import { Divider } from "@mui/material";
import { HighlightOff } from "@mui/icons-material";

function UniversityHeaderBar(props) {
  const [headerItem, setHeaderItem] = useState("overview");
  const [sticky, setSticky] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isFeesModal, setIsFeesModal] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const {
    GMAT,
    GRE,
    PTE,
    UGScore,
    ielts,
    satScore,
    toefl,
    tuitionFeeFirstYear,
    tuitionFeeOverallCurrency,
    tuitionFeeOverall,
  } = props.university;
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos <= 300) {
        setHeaderItem("overview");
      }

      setSticky(
        currentScrollPos > document.getElementById("header").offsetTop &&
          currentScrollPos > prevScrollPos
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendToOverview = (sectionId) => {
    setHeaderItem(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <div
      id="header"
      className={`universityHeader-section ${sticky ? "sticky" : ""}`}
    >
      <div
        className={`universityHeader  container-xl ${sticky ? "sticky" : ""}`}
      >
        {props.headerItems.map((item, index) => {
          return (
            <button
              onClick={() => {
                if (
                  item.label !== "Requirement" &&
                  item.label !== "Fee Structure"
                ) {
                  sendToOverview(item.content);
                } else if (item.label == "Requirement") {
                  setIsModal(true);
                } else if (item.label == "Fee Structure") {
                  console.log(item);
                  setIsFeesModal(true);
                }
              }}
              className={
                headerItem === item.content
                  ? "header-item active"
                  : "header-item"
              }
            >
              {item.label}
            </button>
          );
        })}
        <Modal show={isModal} onHide={() => setIsModal(false)} centered>
          <div className="modalCss">
            <div className="d-flex justify-between">
              <h4>Requirements</h4>
              <HighlightOff onClick={() => setIsModal(false)} />
            </div>
            <hr style={{ width: "100%" }} />
            <div>
              <div className="fw-bold">
                GMAT: <span className="fw-normal">{GMAT}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                GRE: <span className="fw-normal">{GRE}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                PTE: <span className="fw-normal">{PTE}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                UG Score: <span className="fw-normal">{UGScore}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                Ielts: <span className="fw-normal">{ielts}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                Sat Score: <span className="fw-normal">{satScore}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                ToEfl: <span className="fw-normal">{toefl}</span>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={isFeesModal} onHide={() => setIsFeesModal(false)} centered>
          <div className="modalCss">
            <div className="d-flex justify-between">
              <h4>Fee Structure</h4>
              <HighlightOff onClick={() => setIsFeesModal(false)} />
            </div>
            <hr style={{ width: "100%" }} />
            <div>
              <div className="fw-bold">
                Fee For First Year:{" "}
                <span className="fw-normal">{tuitionFeeFirstYear}</span>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                Overall Fees:{" "}
                <span className="fw-normal">
                  {Math.round(tuitionFeeOverall)} {tuitionFeeOverallCurrency}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default UniversityHeaderBar;
