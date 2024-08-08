import { useState, useEffect, useMemo } from "react";
import Modal from "../../components/modals/Modal";
import { NormalInput } from "../../components/inputs/ModalInputs";
import InputWithSearch from "../../components/inputs/InputWithSearch";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { format } from "date-fns";
import { fetchAllData } from "../methods/commonMethod";

export default function ApplicationModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const {
    state: { users, unis, courses },
  } = useContext(AppContext);
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({});
  const userNames = useMemo(
    () =>
      users.map((item) => item.fName + " " + item.lName + " | " + item.email),
    [users]
  );
  const uniNames = useMemo(() => users.map((item) => item.name), [users]);
  const [userName, setUserName] = useState("");
  const [uniName, setUniName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [universityData, setUniversityData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [applicationDate, setAppDate] = useState("");

  const getSelectedUser = (id) => {
    if (!id) return "";
    // const user = users?.find((item) => item._id);
    if (editItem.userName) return `${editItem?.userName}`;
    else return "";
  };

  const handleDataChange = (name = null, value) => {
    if (!name) return;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newData = {
      ...editItem,
      ...data,
    };
    saveFunc(newData);
    setModal(false);
  };
  const putValues = () => {
    setData(editItem);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (view === "edit") {
      putValues();
      setUserName(getSelectedUser(editItem.userName));
      setUniName(editItem?.universityAppliedFor?.courseDetail?.universityName);
      setCourseName(editItem?.universityAppliedFor?.courseDetail?.courseName);
      setAppDate(
        format(
          new Date(editItem.universityAppliedFor?.applicationDate),
          "dd/MM/yy"
        )
      );
      setData((prev) => ({
        ...prev,
        status: editItem.universityAppliedFor?.status,
      }));
    }
  }, []);

  useEffect(() => {
    fetchAllData("users/get", setUsersData, setIsLoading);
  }, []);

  useEffect(() => {
    fetchAllData("university/get", setUniversityData, setIsLoading);
  }, []);

  useEffect(() => {
    if (view === "edit") {
      fetchAllData(
        `course/get-by-uni/${editItem?.universityAppliedFor?.courseDetail?.university}`,
        setCourseData,
        setIsLoading
      );
    }
  }, []);

  useEffect(() => {
    data?.uniId &&
      fetchAllData(
        `course/get-by-uni/${data?.uniId}`,
        setCourseData,
        setIsLoading
      );
  }, [data]);
  // useEffect(() => console.log(courseData, "UNIVERSITY"), [courseData]);

  useEffect(() => {
    // if (!data?.userId || !data?.uniId || !data?.courseId) return;
    if (!userName && data?.userId) handleDataChange("userId", "");
    if (!courseName && data?.courseId) handleDataChange("courseId", "");
    if (!uniName && data?.uniId) {
      handleDataChange("uniId", "");
      setCourseName("");
    }
  }, [userName, uniName, courseName]);

  return (
    <Modal setIsModal={setIsModal} modal={modal}>
      <h2>{view === "edit" ? "Edit" : "Add"} Application Details</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        {/* <NormalInput
          type={"text"}
          label={"Application ID"}
          inputId={"applicationId"}
          inputState={data?.applicationId}
          setInputState={(val) => handleDataChange("applicationId", val)}
        /> */}
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="userId">User:</label>
          <div className="flex-grow md:max-w-[70%]">
            <InputWithSearch
              options={usersData?.map((item) => ({
                _id: item._id,
                name: `${item.fName} ${item.lName} | ${item.email}`,
              }))}
              selectedOpt={userName}
              setSelectedOpt={setUserName}
              setSelectedOptId={(val) => handleDataChange("userId", val)}
              selectStyles={{ zIndex: 1005 }}
            />
          </div>
        </div>
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="uniId">University:</label>
          <div className="flex-grow md:max-w-[70%]">
            <InputWithSearch
              options={universityData?.map((item) => ({
                _id: item?._id,
                name: item?.universityName,
              }))}
              selectedOpt={uniName}
              setSelectedOpt={setUniName}
              setSelectedOptId={(val) => handleDataChange("uniId", val)}
              selectStyles={{ zIndex: 1004 }}
            />
          </div>
        </div>
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="courseId">Courses:</label>
          <div className="flex-grow md:max-w-[70%]">
            <InputWithSearch
              disabled={data?.uniId == false}
              options={courseData?.map((item) => {
                return {
                  _id: item?._id,
                  name: item?.courseName,
                };
              })}
              selectedOpt={courseName}
              setSelectedOpt={setCourseName}
              setSelectedOptId={(val) => handleDataChange("courseId", val)}
              selectStyles={{ zIndex: 1003 }}
            />
          </div>
        </div>
        <NormalInput
          type={"date"}
          label={"Date"}
          inputId={"date"}
          inputState={
            data?.date ? format(new Date(data?.date), "yyyy-MM-dd") : ""
          }
          setInputState={(val) => handleDataChange("date", new Date(val))}
        />

        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            // defaultValue={data?.type}
            value={data?.status}
            onChange={(e) => handleDataChange("status", e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          >
            <option value="">-- Select Purpose --</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          type="submit"
          className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
