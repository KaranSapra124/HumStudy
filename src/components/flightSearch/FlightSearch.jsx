import React, { useState } from 'react'
import SortBar from '../ui/SortBar';
import "./FlightSearch.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UniversitySearchFilter from '../universitySearch/UniversitySearchFilter';
import FlightSearchFilter from './FlightSearchFilter';
import FlightSearchResultCard from './FlightSearchResultCard';
import FlightSkeleton from '../ui/skeleton/FlightSkeleton';

const flightSortValues = ['Recommended', 'Cheapest', 'Quickest', 'Earliest']
function FlightSearch() {
    const [sortItem, setSortItem] = useState(1);
    const [filter, showFilter] = useState(false);
    

  return (
    <div className="flightSearch-section">
      <div className="flightSearch container-xll">
        <div className="row">
          <div className="col-0 col-sm-0 col-md-4 col-lg-3 px-4">
                      <FlightSearchFilter filter={filter} />
                      
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9">
            <div className="flightSearch-results">
             
              <SortBar sortValues={flightSortValues} />
                          <div className="filter-tag-bar">
                          <h5 onClick={()=>showFilter(!filter)} className="filter-tag"><FilterAltIcon /> Filter</h5>
              </div>
              <FlightSkeleton />
                          <FlightSearchResultCard />
                          <FlightSearchResultCard />
                          <FlightSearchResultCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightSearch
