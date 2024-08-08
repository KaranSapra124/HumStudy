import React, { useState } from 'react'
import "./UniversityCardSkeleton.css"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function UniversityCardSkeletion() {
   
  return (
      <div className='UniversityCardSkeletion mt-4'>
          <div className='row w-100 gx-0'>
          <div className='col-12 col-lg-4'>
          <Skeleton width='100%' style={{borderRadius:"10px"}} height='200px' />
          </div>
          <div className='col-12 col-lg-8 d-flex flex-column justify-content-between'>
          <Skeleton width='50%' height='40px' />
          <Skeleton className='mt-3' width='20%' height='20px' />
              <div className='row mt-3'>
                  <div className='col-4'>
                  <Skeleton width='100%' height='40px' />
                  </div>
                  <div className='col-4'>
                  <Skeleton width='100%' height='40px' />
                  </div>
                  <div className='col-4'>
                  <Skeleton width='100%' height='40px' />
                  </div>
                  
          </div>
              <div className='d-flex justify-content-end'>
              <Skeleton width='200px' height='40px' />
            </div>
          </div>
         </div>
      </div>
  )
}

export default UniversityCardSkeletion
