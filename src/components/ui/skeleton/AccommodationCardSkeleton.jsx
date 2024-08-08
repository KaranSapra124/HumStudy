import React from 'react'
import "./UniversityCardSkeleton.css"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function AccommodationCardSkeleton() {
  return (
    <div className='UniversityCardSkeletion mt-4'>
          <div className='row w-100 gx-0'>
          <div className='col-12  col-lg-4'>
          <Skeleton width='100%' style={{borderRadius:"10px"}} height='200px' />
          </div>
          <div className='col-12 px-sm-3 col-lg-8 d-flex flex-column justify-content-between'>
          <Skeleton width='60%' height='35px' />
          <Skeleton className='mt-2' width='20%' height='20px' />
             
              <Skeleton width='200px' height='30px' />
              <div className='row'>
                  <div className='col-5'>
                  <Skeleton width='100%' height='40px' />
             </div>
                  <div className='col-5'>
                  <Skeleton width='100%' height='40px' />
             </div>
            </div>
          </div>
         </div>
      </div>
  )
}

export default AccommodationCardSkeleton
