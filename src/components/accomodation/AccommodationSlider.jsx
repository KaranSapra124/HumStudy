import React from 'react'
import "./Accommodation.css"
import ShareIcon from "@mui/icons-material/Share";
import ImageCarousel from "../ui/Carousel";
import EnquiryCard from "../ui/EnquiryCard";
import AccommodationPriceCard from "./AccommodationPriceCard";

function AccommodationSlider() {
  return (
    <div className='accommodationSlider-section'>
    <div className="accommodationSlider container-xl">
        <div className="accommodationSlider-topbar">
          <div className="topbar-left">
            <h4>Super Townhouse</h4>
            <p>Athlorn, Ireland</p>
          </div>
          <ShareIcon />
        </div>

        <div className="row mt-4 ">
          <div className="col-12 col-sm-12 col-md-7 col-lg-8">
            <ImageCarousel
              images={[
                "../../assets/images/accommodation.jpg",
                "../../assets/images/accommodation.jpg",
              ]}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-5 col-lg-4">
            <AccommodationPriceCard
              heading="Need stay ?"
              subheading="Check room price here"
            />
          </div>
        </div>

        <div className="acc-price-detail mt-3">
          <h5>Starts from</h5>
          <h4>
            Rs 2499 <span>/month</span>
          </h4>
          <p>
            *Denotes starting price exclusive of GST. Prices may vary with room
            occupancy and attributes
          </p>
          <button className="acc-contact-btn mt-2">Contact</button>
        </div>
      </div>
      </div>
  )
}

export default AccommodationSlider
