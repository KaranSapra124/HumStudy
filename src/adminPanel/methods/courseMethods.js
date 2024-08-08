import { axiosInstance } from "../../utils/axios";

export const fetchAllData = async (
  url,
  setData,
  setIsLoading,
  view = 'admin/'
) => {
  try {
    const response = await axiosInstance.get(view + url);
    console.log(response);
    setData(response.data.allItems);
  } catch (err) {
    console.log(err);
  }
  setIsLoading(false);
};

export const handleAddItem = async (item, url, setData, view = 'admin/') => {
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
    console.error('Error adding Item:', error);
    toast.error('Error adding Item!');
  }

  console.log(item);
};
