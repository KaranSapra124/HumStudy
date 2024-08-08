import React from 'react'
import "./Accommodation.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router';


function AccommodationSearchResultCard() {
    const navigate = useNavigate();

    const sendToAccommodation = () => {
      navigate("/accommodation")
    }
  return (
    <div  className="accommodationSearchResultCard mt-3 h-100">
    <img
      src={require("../../assets/images/university.jpg")}
      alt="accommodation"
    />
    <div className="accommodationSearchResultCard-content">
              <div className='acc-card-top'>
              <h5>Technological accommodation of Shannon - Athlone </h5>
              <h6><PlaceIcon fontSize='16px'/> 5th Block, Jayanagar, Bangalore</h6>
              </div>
              <div className="accommodation-features">
                          <div className="accommodation-feature">
                              <p>Parking</p>
                          </div>
                          <div className="accommodation-feature">
                              <p>Wifi</p>
                          </div>
                          <div className="accommodation-feature">
                              <p>Laundary</p>
                  </div>
                  <p>+5 more</p>
                  
              </div>
              <div className='acc-price'>
                  <p>Starts from</p>
              <h5>Rs 4300<span>/month</span></h5>
              </div>
              <div className='acc-card-bottom'>
              <button onClick={sendToAccommodation}  className='accommodationWishlistBtn'>Add to Wishlist <KeyboardArrowRightIcon /></button>
              <button onClick={sendToAccommodation}  className='accommodationKnowMoreBtn'>Know More <KeyboardArrowRightIcon /></button>
              </div>
    </div>
  </div>
  )
}

export default AccommodationSearchResultCard
