import React, { useContext } from "react";
import "./Personal.css";
import { useEffect, useState } from "react";
import { Select, Input, Space } from "antd";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  AptitudeTest,
  Education,
  EmergencyContact,
  EnglishExam,
  Experience,
} from "./Scores";
import { MainSiteContext } from "../../context/MainSiteContext";
import { UpdateProfile } from "../../methods/MainMethods";
import { toast } from "react-toastify";

function PersonalDetails() {
  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);
  const [personalData, setPersonalData] = useState({
    fName: profile?.fName || "",
    lName: profile?.lName || "",
    gender: profile?.gender || "",
    occupation: profile?.occupation || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
  });
  const [score, setScore] = useState(profile?.englishTest || {});

  // const [educationData, setEducationData] = useState([
  //   {
  //     level: "",
  //     status: "pursuing",
  //     name: "",
  //     marks: "",
  //     institutionName: "",
  //     country: "",
  //     startDate: null,
  //     endDate: null,
  //   },
  // ]);
  const [educationData, setEducationData] = useState([
    // Initial education object
    {
      level: "",
      status: "pursuing",
      name: "",
      marks: "",
      institutionName: "",
      country: "",
      startDate: null,
      endDate: null,
    },
  ]);
  const [experienceList, setExperienceList] = useState([
    {
      // organizationName: undefined,
      // designation: undefined,
      // university: undefined,
      // country: undefined,
      // startDate: null,
      // endDate: null,
      // modeOfPayment:null,
      // currentlyWorking:null,
    },
  ]);

  const [emergencyDetails, setEmergencyDetails] = useState({
    // name: undefined,
    // relation: undefined,
    // phone: undefined,
    // email: undefined,
  });

  const handleEmergencyChange = (input) => (value) => {
    setEmergencyDetails((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  useEffect(() => {
    console.log(score);
  }, [educationData, score]);
  // useEffect(() => {
  //   setEducationData([
  //     {
  //       level: "",
  //       status: "persuing",
  //       name: "",
  //       marks: "",
  //       institutionName: "",
  //       country: "",
  //       startDate: null,
  //       endDate: null,
  //     },
  //   ]);
  // }, []);
  const [isEditing, setIsEditing] = useState(false);

  const handlePersonalChange = (e) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddEducation = () => {
    setEducationData((prevList) => [
      ...prevList,
      {
        level: "",
        status: "",
        name: "",
        marks: "",
        university: "",
        country: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = educationData
      .filter((_, i) => i !== index)
      ?.map((item) => ({
        ...item,
        ...(item.startDate && {
          startDate: new Date(item.startDate),
        }),
        ...(item.endDate && {
          endDate: new Date(item.endDate),
        }),
        ...(item.status === "persuing" && {
          endDate: null,
        }),
      }));
    UpdateProfile(
      "user/profile/update",
      dispatch,
      { education: updatedEducation },
      () => {}
    );
    setEducationData((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index, field, value) => {
    setEducationData((prevList) => {
      const newList = [...prevList];
      newList[index][field] = value;
      return newList;
    });
  };
  const handleAddExperience = () => {
    setExperienceList((prevList) => [
      ...prevList,
      {
        level: "",
        status: "",
        name: "",
        marks: "",
        university: "",
        country: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperience = experienceList
      .filter((_, i) => i !== index)
      ?.map((item) => ({
        ...item,
        ...(item.startDate && {
          startDate: new Date(item.startDate),
        }),
        ...(item.endDate && {
          endDate: new Date(item.endDate),
        }),
        ...(item.currentlyWorking === true && {
          endDate: null,
        }),
      }));
    // console.log(updatedExperience);
    UpdateProfile(
      "user/profile/update",
      dispatch,
      { experience: updatedExperience },
      () => {}
    );
    setExperienceList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index][field] = value;
      return newList;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Saved", personalData);
      setIsEditing(false);
    } else setIsEditing(true);
  };

  const handleScoreChange = (input) => (value) => {
    setScore((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 10,
    background: "#fff",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  console.log(educationData,"DATTATATATA")
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Personal Details",
      children: <Personal />,
      style: panelStyle,
    },
    {
      key: "2",
      label: "English Test Score",
      children: (
        <EnglishExam formData={score} handleChange={handleScoreChange} />
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: "Education",
      children: (
        <Education
          educationList={educationData}
          handleDeleteEducation={handleDeleteEducation}
          handleAddEducation={handleAddEducation}
          handleChange={handleEducationChange}
        />
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: "Aptitude Test Score",
      children: (
        <AptitudeTest formData={score} handleChange={handleScoreChange} />
      ),
      style: panelStyle,
    },
    {
      key: "5",
      label: "Experience Details",
      children: (
        <Experience
          experienceList={experienceList}
          handleDeleteExperience={handleDeleteExperience}
          handleAddExperience={handleAddExperience}
          handleChange={handleExperienceChange}
        />
      ),
      style: panelStyle,
    },
    {
      key: "6",
      label: "Emergency Contact Details",
      children: (
        <EmergencyContact
          formData={emergencyDetails}
          handleChange={handleEmergencyChange}
        />
      ),
      style: panelStyle,
    },
  ];
  useEffect(() => {
    console.log(profile?.education)
    setScore({ ...profile?.englishTest, ...profile?.aptitudeExams });
    setEducationData(profile?.education?.length !== 0 && profile?.education || educationData);
    setExperienceList(profile?.experience);
    setEmergencyDetails(profile?.emergencyContact);
  }, [profile]);
  useEffect(() => {
    console.log(educationData);
  }, [educationData]);

  return (
    <>
      {getItems(panelStyle).map((item, index) => {
        return (
          <div
            className="personalDetails mt-2 container-xl"
            style={{ padding: "0" }}
          >
            <div>
              <Collapse
                // className={styles.container}
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{
                  width: "100%",
                  padding: "0",
                  margin: "10px auto",
                  background: token.colorBgContainer,
                }}
                items={getItems(panelStyle).filter((it) => it.key === item.key)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

const Personal = () => {
  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);
  const [personalData, setPersonalData] = useState({
    fName: profile?.fName || "",
    lName: profile?.lName || "",
    gender: profile?.gender || "",
    occupation: profile?.occupation || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",

    countryForApplying: profile?.countryForApplying || [],
  });
  const [isEditing, setIsEditing] = useState(false);

  const handlePersonalChange = (e) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const isPasswordEntered = Object.prototype.hasOwnProperty.call(
        personalData,
        "password"
      );
      const isNewPasswordEntered = Object.prototype.hasOwnProperty.call(
        personalData,
        "NewPassword"
      );
      const isPasswordEmpty =
        !isPasswordEntered || personalData.password.trim() === "";
      const isNewPasswordEmpty =
        !isNewPasswordEntered || personalData.NewPassword.trim() === "";

      if (
        (isPasswordEmpty && !isNewPasswordEmpty) ||
        (isNewPasswordEmpty && !isPasswordEmpty)
      ) {
        // At least one of the fields is empty, show error
        toast.error("Please enter both old and new passwords");
        return;
      }

      console.log("Saved", personalData);
      setIsEditing(false);
      UpdateProfile("user/profile/update", dispatch, personalData, () => {});
    } else setIsEditing(true);
  };
  useEffect(() => {
    setPersonalData(profile);
  }, [profile]);
  useEffect(() => {
    console.log(personalData);
  }, [personalData]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="formContent">
        <div>
          <label htmlFor="fName" className="form-label">
            First Name
          </label>
          {isEditing ? (
            <Input
              name="fName"
              value={personalData?.fName}
              onChange={handlePersonalChange}
              size="large"
              placeholder="John"
            />
          ) : (
            <p>{personalData?.fName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lName" className="form-label">
            Last Name
          </label>
          {isEditing ? (
            <Input
              name="lName"
              value={personalData?.lName}
              onChange={handlePersonalChange}
              size="large"
              placeholder="Clark"
            />
          ) : (
            <p>{personalData?.lName}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          {isEditing ? (
            <Select
              size="large"
              value={personalData?.gender}
              placeholder="Select a person"
              optionFilterProp="children"
              style={{ width: "100%" }}
              onChange={(val) => {
                setPersonalData((prev) => ({
                  ...prev,
                  gender: val,
                }));
              }}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
                {
                  value: "other",
                  label: "Other",
                },
              ]}
            />
          ) : (
            <p>{personalData?.gender}</p>
          )}
        </div>

        <div>
          <label htmlFor="occupation" className="form-label">
            Country for applying
          </label>
          {isEditing ? (
            <Select
              mode="multiple"
              size="large"
              value={personalData?.countryForApplying}
              placeholder="Please Select countries"
              onChange={(val) => {
                setPersonalData((prev) => ({
                  ...prev,
                  countryForApplying: val,
                }));
              }}
              // onChange={(value, option) => handleMajorChange(value,true, 'select')}
              style={{
                width: "100%",
                minWidth: "300px",
              }}
              options={[
                {
                  value: "Australia",
                  label: "Australia",
                },
                {
                  value: "USA",
                  label: "USA",
                },
                {
                  value: "UK",
                  label: "UK",
                },
                {
                  value: "Ireland",
                  label: "Ireland",
                },
              ]}
            />
          ) : (
            <div className="flex gap-2">
              {personalData?.countryForApplying?.map((item) => (
                <span>{item}</span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          {isEditing ? (
            <Input
              name="email"
              value={personalData?.email}
              onChange={handlePersonalChange}
              size="large"
              placeholder="john@gmail.com"
            />
          ) : (
            <p>{personalData?.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          {isEditing ? (
            <Input
              name="phoneNumber"
              value={personalData?.phoneNumber}
              onChange={handlePersonalChange}
              type="phone"
              size="large"
              placeholder="9154879584"
            />
          ) : (
            <p>{personalData?.phoneNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            {isEditing ? "Old " : ""}Password
          </label>
          {isEditing ? (
            <Input
              value={personalData?.password}
              name="password"
              onChange={handlePersonalChange}
              size="large"
              type="password"
              placeholder="**********"
            />
          ) : (
            <p>{"*".repeat(personalData?.password?.length)}</p>
          )}
        </div>
        {isEditing && (
          <div>
            <label htmlFor="NewPassword" className="form-label">
              New Password
            </label>
            <Input
              name="NewPassword"
              value={personalData?.NewPassword}
              onChange={handlePersonalChange}
              size="large"
              type="password"
              placeholder="**********"
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button type="submit" className="btn btn-white border">
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </form>
  );
};
export default PersonalDetails;
