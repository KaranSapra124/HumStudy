import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";
import { toast } from "react-toastify";
export const uniAppMethod = async (
  route,
  formData,
  setFormData,
  setIsLoading
) => {
  axios.defaults.withCredentials = true;
  let res = "";
  // let id = "";
  console.log(route);
  // if (route.startsWith("/delete-application/")) {
  //   id = route.split("/delete-application/")[1];
  //   route = "/delete-application";
  // }
  switch (route) {
    case "/get-applications":
      //   console.log(formData);?
      res = await axios.get(`${BASE_URL}admin/applications${route}`, formData);
      setFormData(res?.data?.applications);
      break;

    case "/add-application":
      //   console.log(formData);?
      try {
        res = await axios.post(
          `${BASE_URL}admin/applications${route}`,
          formData
        );
        setFormData(res?.data?.addedUser);
        res?.data && toast.success(res?.data?.message);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/update-application":
      //   console.log(formData);?
      try {
        res = await axios.post(
          `${BASE_URL}admin/applications${route}`,
          formData
        );
        // console.log(res?.data)
        setFormData(res?.data?.updatedUsers);
        res?.data && toast.success(res?.data?.message);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    case "/delete-application":
      try {
        res = await axios.post(
          `${BASE_URL}admin/applications${route}`,
          formData
        );
        // console.log(res?.data);
        setFormData(res?.data?.deletedUser);
        res?.data && toast.success(res?.data?.message);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      break;

    //     case "/add-flight-query":
    //       // console.log(route, "ROUTE");
    //       //   console.log(formData);?
    //       // console.log(formData);
    //       res = await axios.post(`${BASE_URL}admin/flight${route}`, formData);
    //       res?.data && toast.success("Flight Query Added!");
    //       break;

    //     case "/get":
    //       // console.log(route, "LOAN");
    //       res = await axios.get(`${BASE_URL}admin/loan${route}`);
    //       console.log(res?.data);
    //       setFormData(res?.data?.allItems);
    //       break;

    //     case `/get-blog/`:
    //       setIsLoading(true);
    //       const id = window.location.pathname.split("/blogs/"); // Extracting ID from the route
    //       console.log(id);
    //       res = await axios.post(`${BASE_URL}admin/blog${route}${id[1]}`, formData); // Adjust the URL to include the ID
    //       // console.log(...res?.data?.item);
    //       setFormData(...res?.data?.item);
    //       setIsLoading(false);
    //       break;

    //     case "/purchase-plan":
    //       res = await axios.post(`${BASE_URL}user${route}`, formData);
    //       toast.success("Plan Purchase Successfully!");

    //     case "/apply-university":
    //       try {
    //         res = await axios.post(`${BASE_URL}user${route}`, formData);
    //         res?.data && toast.success(res?.data?.message);
    //       } catch (err) {
    //         const { data } = err.response;
    //         toast.error(data.message);
    //       }
  }
};
