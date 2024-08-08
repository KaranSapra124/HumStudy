import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios";

export const fetchAllData = async (
  url,
  setData,
  setIsLoading,
  view = "admin/"
) => {
  try {
    const response = await axiosInstance.get(view + url);
    console.log(response);

    // console.log(response.data.allItems.length);
    setData(response.data.allItems);
  } catch (err) {
    toast.error(err?.response?.data?.message)
  }
  setIsLoading(false);
};

export const fetchUniData = async (
  url,
  setData,
  setIsLoading,
  view = "admin/"
) => {
  try {
    const response = await axiosInstance.get(view + url);
    console.log(response);

    // console.log(response.data.allItems.length);
    setData(response.data.item);
  } catch (err) {
    console.log(err);
  }
  setIsLoading(false);
};

export const uploadUserDocs = async (formData, url, setData) => {
  try {
    const { data } = await axiosInstance.post(url, formData);

    setData((prev) =>
      prev.map((item) => (item._id === data.item._id ? data.item : item))
    );

    toast.success("Profile Updated");
  } catch (err) {
    const Err = err?.response?.data?.message || "something went wrong";
    console.log(Err, err);
  }
};
export const raiseDocsConcern = async (formData, url, setData) => {
  try {
    const { data } = await axiosInstance.post(url, formData);

    // setData(prev=>prev.map(item=>item._id===data.item._id?data.item:item))

    toast.success("Profile Updated");
    return true;
  } catch (err) {
    const Err = err?.response?.data?.message || "something went wrong";
    console.log(Err, err);
    throw new Error(Err);
  }
};

export const handleAddItem = async (item, url, setData, view = "admin/") => {
  try {
    const {
      data: { success, message, newItem },
    } = await axiosInstance.post(view + url, item);

    if (success) {
      setData((prev) => [...prev, newItem]);
      toast.success(message);
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error("Error adding Item:", error);
    toast.error("Error adding Item!");
  }

  console.log(item);
};

export const handleEditItem = async (item, url, setData, view = "admin/") => {
  try {
    const {
      data: { success, message, updatedItem },
    } = await axiosInstance.post(view + url, item);

    if (success) {
      console.log(`Updated Item:`, updatedItem);
      setData((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      toast.success(message);
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error("Error updating Item:", error);
    toast.error("Error updating Item details!");
  }
};

export const handleDeleteItem = async (url, setData, view = "admin/") => {
  try {
    const {
      data: { success, message, deletedItem },
    } = await axiosInstance.post(view + url);

    if (success) {
      toast.success(message);
      console.log("Deleted Item:", deletedItem);
      setData((prev) => prev.filter((item) => item._id !== deletedItem._id));
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error("Error deleting Item:", error);
    toast.error("Error deleting Item!");
  }
};

export const handleUpdateActiveStatus = async (
  url,
  setData,
  isActive,
  view = "admin/"
) => {
  try {
    const {
      data: { success, message, updatedItem },
    } = await axiosInstance.post(view + url, { isActive });

    if (success) {
      console.log(`Updated Item:`, updatedItem);
      setData((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      toast.success(message);
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error("Error updating Item:", error);
    toast.error("Error updating Item details!");
  }
};


