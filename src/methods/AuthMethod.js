import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axios";

export const AuthMethod=async(url,item)=>{
  try {
    const {
        data,
      } = await axiosInstance.post(url, item);

    return data


  
    
  } catch (error) {
    const message=error?.response?.data?.message|| "something went wrong";
    console.log(message)
    throw new Error(message)
    
  }

}