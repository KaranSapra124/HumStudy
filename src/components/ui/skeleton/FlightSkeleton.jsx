import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function FlightSkeleton() {
  return (
    <div className='mt-3  ' style={{backgroundColor:"#fff",width:"100%" , border:"1px solid #eeeeec", padding:"15px", borderRadius:"10px"}}>
          <div className='row'>
          <div className='col-12 col-md-2 mt-2'>
          <Skeleton width='80px' style={{ borderRadius: "10px" }} height='80px' />
          </div>
          <div className='col-4 col-md-2 mt-2'>
          <Skeleton width='60px' height='20px' />
          <Skeleton width='80px' height='20px' />
          <Skeleton width='40px' height='20px' />
          </div>
          <div className='col-4 col-md-3 mt-2 d-flex flex-column align-items-center'>
          <Skeleton width='120px' height='20px' />
          <Skeleton width='80px' height='8px' />
          <Skeleton width='40px' height='20px' />
          </div>
          <div className='col-3 col-md-2 mt-2'>
          <Skeleton width='60px' height='20px' />
          <Skeleton width='80px' height='20px' />
          <Skeleton width='40px' height='20px' />
          </div>
          <div className='col-12 col-md-2 mt-2'>
          <Skeleton width='80px' height='20px' />
          <Skeleton width='60px' height='20px' />
          <Skeleton width='100px' height='25px' />
          </div>
         </div>
    </div>
  )
}

export default FlightSkeleton
