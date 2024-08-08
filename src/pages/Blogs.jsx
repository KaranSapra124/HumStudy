import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import styles from "../components/blogs/blogs.module.css";
import { createDummyBlogs } from "../utils/createDummyData";
import BlogCard from "../components/blogs/BlogCard";
import { useEffect, useState } from "react";
import { fetchAllData } from "../adminPanel/methods/commonMethod";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchAllData("blog/get-blogs", setBlogs, setIsLoading);
    return () => {};
  }, []);
  return (
    <>
      {/* <div className="page"> */}
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.heading}>Blogs</h2>
        <div className={styles.cardsContainer}>
          {blogs?.map((item, i) => (
            <BlogCard data={item} key={i} />
          ))}
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </>
  );
}
