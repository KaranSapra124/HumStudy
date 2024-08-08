import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./blogCard.module.css";
import { FILE_PATH } from "../../utils/apiConfig";

export default function BlogCard({ data }) {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate("/blog-page", {
      state: item,
    });
  };
  return (
    <div className={styles.card}>
      <img src={`${FILE_PATH}${data?.blogImg}`} alt="Blog Image" />
      <div>
        <h3>{data?.title}</h3>
        <p>by {data?.author}</p>
        <button onClick={() => handleNavigate(data)}>
          Read more <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
