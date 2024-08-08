import axios from "axios";
import { BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

export const adminAuthMethod = async (
  route,
  formData,
  setFormData,
  setIsLoading
) => {
  axios.defaults.withCredentials = true;
  //   let page, pageSize, id, country;
  let res = "";

  //   const link = route.split("?")[0];
  // if (
  //   route.includes("/get-courses") ||
  //   route.includes("/get-course-by-category")
  // ) {
  //   id = new URLSearchParams(route.split("?")[1]);
  //   page = id.get("page");
  //   pageSize = id.get("pageSize");
  //   route = route.split("?")[0];
  //   console.log(route);
  // } else if (route.includes("/get-by-country")) {
  //   id = new URLSearchParams(route.split("?")[1]);
  //   country = id.get("country");
  //   route = route.split("?")[0];
  // }
  switch (route) {
    case "/adminLogin":
      //   console.log(formData);?
      res = await axios.post(`${BASE_URL}admin/account${route}`, formData);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      setIsLoading(true);
      break;

    case "/adminLogout":
      //   console.log(formData);?
      res = await axios.post(`${BASE_URL}admin/account${route}`, null);
      // if (res?.data) {
      //   toast.success(res?.data?.message);
      // }
      // setIsLoading(true);
      break;

    case "/get-docs-count":
      try {
        res = await axios.get(`${BASE_URL}admin/applications${route}`);
        setFormData(res?.data?.data);
      } catch (err) {
        console.log(err.response.data.message);
      }

    default:
      break;
  }
};
