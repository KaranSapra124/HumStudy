import React, { useEffect, useState } from "react";

// import { userMethod } from "../../userMethods/userMethod";
// import { IMAGE_URL } from "../../../utils/urls";
import { format } from "date-fns";
import { FILE_PATH } from "../../utils/apiConfig";
import { useLocation } from "react-router";
import Navbar from "../ui/Navbar";
import "./blogs.module.css"
// import { getItem } from "../../../backend/methods/commonMethods";

export const BlogPage = () => {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState(state);
  return (
    <>
      <Navbar />
      {data ? (
      <div className="min-vh-100 bg-light blogPage" style={{paddingTop:"5rem"}} >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card shadow-lg rounded-lg overflow-hidden">
              <div className="card-body">
                <div className="mb-4">
                  <img
                    className="img-fluid"
                    src={`${FILE_PATH}/${data.blogImg}`}
                    alt="Blog Cover"
                  />
                </div>
                <h2 className="card-title h3 text-dark mb-3">
                  {data?.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                <p className="text-muted small mt-4 mb-2">
                  Author:{" "}
                  <span className="text-dark font-weight-bold">
                    {data?.author}
                  </span>
                </p>
                <p className="text-dark">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
