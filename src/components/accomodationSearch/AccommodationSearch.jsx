import React, { useEffect } from "react";

const AccommodationSearch = () => {
  useEffect(() => {
    const loadWidget = () => {
      if (window._aw) return; // Prevent re-initialization

      window._aw =
        window._aw ||
        function () {
          (window._aw.q = window._aw.q || []).push(arguments);
        };

      const js = document.createElement("script");
      const fjs = document.getElementsByTagName("script")[0];
      js.id = "_aw";
      js.src = "https://d341zbz41jo7w1.cloudfront.net/widget/list/3.1.0.js";
      js.async = 1;
      fjs.parentNode.insertBefore(js, fjs);

      window._aw("init", {
        element: document.getElementById("amber-widget"), // required
        location: "london", // required
        partnerId: "humstudy-fc340e3b", // required
        fontFamily: "", // optional default is Open Sans
        sort: "Recommended", // optional default is Recommended
        numListings: 6, // optional default is 6
      });
    };

    loadWidget();
  }, []);

  return (
    <div>
      {/* This is where the widget renders */}
      <div id='amber-widget'></div>
      {/* <div className="amber-link" style={{ textAlign: "left"}}>
      </div> */}
    </div>
  );
};

export default AccommodationSearch;

// import React from 'react'
// import "./Accommodation.css"
// import AccommodationSearchFilter from './AccommodationSearchFilter'
// import { useState } from 'react';
// import SortBar from '../ui/SortBar';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import AccommodationSearchResultCard from './AccommodationSearchResultCard';
// import UniversityCardSkeletion from '../ui/skeleton/UniversityCardSkeletion';
// import AccommodationCardSkeleton from '../ui/skeleton/AccommodationCardSkeleton';
// import { Button, Modal } from 'antd';
// import LoginDiv from "../ui/LoginDiv";

// const accommodationSortValues = ['Recommended', 'Cheapest', 'Rating']

// function AccommodationSearch() {
//     const [sortItem, setSortItem] = useState(1);
//   const [filter, showFilter] = useState(false);
//   const [login, setLogin] = useState(false);

//   const handleCancel = () => {
//     setLogin(false);
//   };

//   return (
//     <div className="accommodationSearch-section">
//       <div className="accommodationSearch container-xll">
//         <div className="row">
//           <div className="col-0 col-sm-0 col-md-4 col-lg-3 px-4">
//                       <AccommodationSearchFilter setLogin={setLogin} filter={filter} />
//                       <Modal onCancel={handleCancel} footer={null} open={login} >

//             <LoginDiv />
//       </Modal>
//           </div>
//           <div className="col-12 col-sm-12 col-md-8 col-lg-9">
//             <div className="accommodationSearch-results">

//                           <SortBar sortValues={accommodationSortValues}/>

//                           <div className="filter-tag-bar">
//                           <h5 onClick={()=>showFilter(!filter)} className="filter-tag"><FilterAltIcon /> Filter</h5>
//               </div>
//               {/* ------While loading show skeleton------- */}
//               <AccommodationCardSkeleton />

//                         <AccommodationSearchResultCard />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AccommodationSearch
