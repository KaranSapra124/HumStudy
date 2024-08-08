import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";
import { toast } from "react-toastify";

export const userMethod = async (
  route,
  formData,
  setFormData,
  setIsLoading
) => {
  axios.defaults.withCredentials = true;
  let page, pageSize, id, country;
  let res = "";

  const link = route.split("?")[0];
  console.log(link, "LINK");

  switch (link) {
    case "/add-visa":
      try {
        res = await axios.post(`${BASE_URL}admin/visa${route}`, formData);
        if (res?.data) {
          toast.success("Visa Query Sent!");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/add-flight-query":
      try {
        res = await axios.post(`${BASE_URL}admin/flight${route}`, formData);
        if (res?.data) {
          toast.success("Flight Query Added!");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-loans":
      try {
        res = await axios.get(`${BASE_URL}user${route}`);
        setFormData(res?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case `/get-blog`:
      try {
        setIsLoading(true);
        res = await axios.post(`${BASE_URL}admin/blog${route}`, formData);
        setFormData(...res?.data?.item);
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.response?.data?.message);
        setIsLoading(false);
      }
      break;

    case "/purchase-plan":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        toast.success("Plan Purchase Successfully!");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/apply-university":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        if (res?.data) {
          toast.success(res?.data?.message);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-universities":
      try {
        res = await axios.get(`${BASE_URL}user${route}`);

        setFormData(res?.data?.applications);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-courses":
      try {
        res = await axios.post(`${BASE_URL}admin/course${route}`, formData);
        console.log(res, "RESONSE");
        setFormData({ courses: res?.data?.courses, total: res?.data?.total });
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-course-by-category":
      try {
        res = await axios.post(`${BASE_URL}admin/course${route}`, formData);
        console.log(res?.data, "DATATATATAT");
        setFormData({ courses: res?.data?.courses, total: res?.data?.total });
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-by-country":
      try {
        res = await axios.get(
          `${BASE_URL}admin/university${route}?country=${country}`
        );
        setFormData(res?.data?.universitiesData);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/add-loan-info":
      try {
        res = await axios.post(`${BASE_URL}admin/loan${route}`, formData);
        console.log(res?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/filter-loan":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        setFormData(res?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-by-uni":
      try {
        res = await axios.get(`${BASE_URL}admin/course${route}`);
        console.log(res?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/upload-loan-docs":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        console.log(res?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/eval-loan":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        if (res?.data) {
          toast.success(res?.data?.message);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "get-majors":
      try {
        res = await axios.post(`${BASE_URL}${route}`, formData);
        if (res?.data) {
          // toast.success(res?.data?.message);
          setFormData(res?.data?.major);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/add-uni-filters":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        if (res?.data) {
          toast.success(res?.data?.message);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/get-uni-by-search":
      try {
        res = await axios.post(`${BASE_URL}user${route}`, formData);
        if (res?.data) {
          setFormData(res);
          toast.success(res?.data?.message);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    default:
      break;
  }
};
