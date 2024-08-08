import React from "react";
import "./Contact.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link as ScrollLink, animateScroll } from "react-scroll";


function Contact() {

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="contact-section">
      <div className="contact container-xl">
        <div className="contact-card ">
                  <div className="contact-card-contact">
                  <h2>
            Are you ready to <span>Fly</span> & <br/> persue your <span>Dream</span>
          </h2>
          <p>
            Take flight towards your dreams with confidence. Discover a world of
            opportunities as you embark on a journey of self-discovery and
            academic excellence
                  </p>
                  <button onClick={scrollToBottom} className="contact-btn">Contact us <KeyboardArrowRightIcon /> </button>
      
                  </div>
                  <img className="contact-img" src={require("../../assets/images/contact.png")} alt="contact"/>
              </div>
      </div>
    </div>
  );
}

export default Contact;
