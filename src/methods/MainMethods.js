import { toast } from "react-toastify";
import { MAIN_SITE_ACTIONS } from "../context/MainSiteContext";
import { axiosInstance } from "../utils/axios";

export const FetchProfile = async (
    url,
    dispatch,
    setIsLoading,
  ) => {
    try {
      const {data} = await axiosInstance.get( url);

      dispatch({type:MAIN_SITE_ACTIONS.GET_PROFILE,payload:data?.item})
    
    
      
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
export const UpdateProfile = async (
    url,
    dispatch,
    formData,
    setIsLoading,
  ) => {
    try {
      const {data} = await axiosInstance.post( url,formData);

      dispatch({type:MAIN_SITE_ACTIONS.GET_PROFILE,payload:data?.item})
     toast.success("Profile Updated")
    
      
    } catch (err) {
      const Err=err?.response?.data?.message||"something went wrong"
     if(Err.toLowerCase().includes("password")) toast.error(Err)
      console.log(err);
    }
    setIsLoading(false);
  };

export const EditData = async (
    url,
    data,
    setData,
    setIsLoading,
  ) => {
    try {
      const response = await axiosInstance.post( url,data);
  
      // console.log(response.data.allItems.length);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };