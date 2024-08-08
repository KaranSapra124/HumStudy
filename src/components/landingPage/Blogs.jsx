import React, { useEffect, useState } from "react";
import "./Blogs.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router";
import { fetchAllData } from "../../adminPanel/methods/commonMethod";
import { FILE_PATH } from "../../utils/apiConfig";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1115 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1114, min: 751 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 750, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchAllData("blog/get-blogs", setBlogs, setIsLoading);
    return () => {};
  }, []);
  useEffect(() => console.log(blogs), [blogs]);
  // const sendToBlog = (blogId) => {
  //   navigate("/blogs/${blogId");
  // };
  const sendToBlogs = (blogId) => {
    navigate("/blogs");
  };
  const handleNavigate = (item) => {
    navigate("/blog-page", {
      state: item,
    });
  };
  return (
    <div className="blogs-section">
      <div className="blogs container-xl">
        <div className="blog-bar">
          <button className="blog-btn">Our Blog</button>
        </div>
        <h2>Don't miss our recent articles</h2>
        <p>
          Stay informed and inspired with our latest articles. Explore
          insightful content covering diverse topics – don't miss the latest in
          education, travel, and more.
        </p>
        <div className="row mt-3">
          <Carousel
            infinite={true}
            partialVisbile={true}
            autoPlay={true}
            minimumTouchDrag={20}
            showDots={true}
            autoPlaySpeed={3000}
            removeArrowOnDeviceType={["mobile"]}
            className="mt-3"
            responsive={responsive}
          >
            {blogs.map((blog, index) => {
              return (
                <div key={index} className="col-11  blog-col">
                  <div className="card blog-card">
                    <div className="blog">
                      <img src={FILE_PATH + blog.blogImg} alt="blog" />
                      <h5>{blog.title}</h5>
                      <div
                        dangerouslySetInnerHTML={{ __html: blog?.content }}
                      />
                      <p style={{cursor:"pointer"}}
                        onClick={() => {
                          handleNavigate(blog);
                        }}
                      >
                        Read more <KeyboardArrowRightIcon />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="view-more-bar mt-4">
          <button onClick={sendToBlogs} className="view-more-btn">
            View More <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
