import React from 'react';
import './Footer.css';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
import SocialFlow from './ProfileFlow';

function Footer() {
  return (
    <>
      <img
        className="cities-bg"
        src={require('../../assets/images/citiess.png')}
        alt="cities-bg"
      />
      <div className="footer-section" id='footers'>
        <div className="footer container-xl">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="footer-content d-flex flex-column align-items-start mt-4">
                <h4 id="company-name">Humstudy</h4>
                <p>
                  Explore our curated selection of hostels and PGs for boys and
                  girls, and book your stay with ease and confidence
                </p>
                <div className="download-app mt-1">
                  <h5>Download our app</h5>
                  <div className="download-app-bar">
                    <GooglePlayButton
                      url="https://play.google.com/store/apps/details?id=host"
                      theme={'dark'}
                      className={'download-btn'}
                    />
                    <AppStoreButton
                      url="https://play.google.com/store/apps/details?id=host"
                      theme={'dark'}
                      className={'download-btn'}
                    />
                  </div>
                </div>
                <div className="follow mt-1">
                  <h5>Follow us on</h5>
                  <div className="social-icon-bar">
                    <SocialFlow />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-start">
              <div className="footer-content mt-4">
                <h4>Links</h4>
                <p>About</p>
                <p>Accommodation</p>
                <p>Flight Tickets</p>
                <p>Loan support</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-start">
              <div className="footer-content mt-4">
                <h4>Support</h4>
                <p>Help Center</p>
                <p>Contact Us</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-start">
              <div className="footer-content mt-4">
                <h4>Contact Us</h4>
                <div className="contact-item">
                  <img
                    src={require('../../assets/icons/phone-call.png')}
                    alt="phone"
                  />
                  <p>+91 8855498795</p>
                </div>
                <div className="contact-item">
                  <img
                    src={require('../../assets/icons/mail.png')}
                    alt="phone"
                  />
                  <p>infohumstudy@gmail.com</p>
                </div>
                <div className="contact-item">
                  <img
                    src={require('../../assets/icons/whatsapp.png')}
                    alt="phone"
                  />
                  <p>8899758498</p>
                </div>
                <div className="contact-item">
                  <img
                    src={require('../../assets/icons/location.png')}
                    alt="phone"
                  />
                  <p>d-28 janakpuri new delhi 110046</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="footer-bottom-bar ">
            <p>All Right Reserved</p>
            <p>Terms & Condition</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
