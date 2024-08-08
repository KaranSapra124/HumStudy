import React, { useContext, useEffect, useState } from "react";
import { Select, Space } from "antd";
import { InputNumber } from "antd";
import { DatePicker } from "antd";
import { Input, Button, Radio, Divider, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { MainSiteContext } from "../../context/MainSiteContext";
import { FetchProfile, UpdateProfile } from "../../methods/MainMethods";
import { format } from "date-fns";
import moment from "moment";
const DATE_FORMAT = "YYYY-MM-DD";

const countryList = [
  { value: "united kingodm", label: "UK" },
  { value: "germany", label: "Germany" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];
const currentlyWorkingList = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];
const englishExams = [
  {
    label: "TOEFL",
    value: "toefl",
    minMarks: 0,
    maxMarks: 120,
  },
  {
    label: "IELTS",
    value: "ielts",
    minMarks: 0,
    maxMarks: 9,
  },
  {
    label: "PTE",
    value: "pte",
    minMarks: 0,
    maxMarks: 90,
  },
  {
    label: "Other",
    value: "other",
    minMarks: 1,
    maxMarks: 1000,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];

const aptitudeExams = [
  {
    label: "SAT",
    value: "sat",
    minMarks: 400,
    maxMarks: 1600,
  },
  {
    label: "ACT",
    value: "act",
    minMarks: 1,
    maxMarks: 36,
  },
  {
    label: "GMAT",
    value: "gmat",
    minMarks: 200,
    maxMarks: 800,
  },
  {
    label: "GRE",
    value: "gre",
    minMarks: 1,
    maxMarks: 36,
  },
  {
    label: "Other",
    value: "other",
    minMarks: 1,
    maxMarks: 1000,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];

const statusOfAdmission = [
  { value: "confirmed", label: "Confirmed" },
  { value: "applied", label: "Applied" },
  { value: "na", label: "Not Applied Yet" },
];

const universities = [
  {
    value: "harvard",
    label: "Harvard University",
  },
  {
    value: "stanford",
    label: "Stanford University",
  },
  {
    value: "mit",
    label: "Massachusetts Institute of Technology (MIT)",
  },
  {
    value: "oxford",
    label: "University of Oxford",
  },
  {
    value: "cambridge",
    label: "University of Cambridge",
  },
  {
    value: "tokyo",
    label: "University of Tokyo",
  },
  {
    value: "sydney",
    label: "University of Sydney",
  },
  {
    value: "toronto",
    label: "University of Toronto",
  },
  {
    value: "paris",
    label: "Sorbonne University, Paris",
  },
];

const lastExams = [
  {
    label: "10th",
    value: "10th",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "12th",
    value: "12th",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "UG",
    value: "ug",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "PG",
    value: "pg",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "Diploma",
    value: "diploma",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];
const paymentMethods = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Cheque",
    value: "cheque",
  },
  {
    label: "Bank Transfer",
    value: "bankTransfer",
  },
];

export const EnglishExam = (props) => {
  const [editable, setEditable] = useState(true);
  const { dispatch } = useContext(MainSiteContext);

  const handleSubmit = () => {
    setEditable(true);
    UpdateProfile(
      "user/profile/update",
      dispatch,
      { englishTest: props.formData },
      () => {}
    );
  };
  return (
    <>
      <div className="filter-item">
        <label className="form-label">English Exam</label>
        <Select
          style={{ width: "100%" }}
          onChange={props.handleChange("englishExam")}
          className="searchBar-input"
          placeholder="Select English Exam"
          options={englishExams}
          disabled={editable ? true : false}
          value={props?.formData?.englishExam}
        />
      </div>
      {props?.formData?.englishExam === "other" && (
        <div className="filter-item">
          <label className="form-label">English Exam Name</label>
          <Input
            style={{ width: "100%" }}
            onChange={(e) =>
              props.handleChange("otherEnglishExam")(e.target.value)
            }
            className="searchBar-input"
            disabled={editable ? true : false}
            value={props?.formData?.otherEnglishExam}
            size="large"
            placeholder="Enter exam name"
          />
        </div>
      )}
      {props?.formData?.englishExam !== "na" &&
        props?.formData?.englishExam !== undefined && (
          <div className="filter-item">
            <label className="form-label">English Exam Score</label>
            <InputNumber
              size="large"
              onChange={props.handleChange("englishExamScore")}
              style={{ width: "100%" }}
              disabled={editable ? true : false}
              max={
                englishExams.find(
                  (exam) => exam.value === props?.formData?.englishExam
                )?.maxMarks
              }
              min={
                englishExams.find(
                  (exam) => exam.value === props?.formData?.englishExam
                )?.minMarks
              }
              value={props?.formData?.englishExamScore}
            />
          </div>
        )}
      <div className="d-flex justify-content-end mt-3">
        <button
          onClick={
            editable
              ? () => {
                  setEditable(false);
                }
              : handleSubmit
          }
          type="submit"
          className="btn btn-white border"
        >
          {editable ? "Edit" : "Save"}
        </button>
      </div>
    </>
  );
};

export const AptitudeTest = (props) => {
  const [editable, setEditable] = useState(true);
  const { state, dispatch } = useContext(MainSiteContext);
  const { profile } = state;

  const handleSubmit = () => {
    setEditable(!editable);
    UpdateProfile(
      "user/profile/update",
      dispatch,
      { aptitudeExams: props.formData },
      () => {}
    );
  };
  useEffect(() => {
    const fetchProfile = async () => {
      await FetchProfile("user/profile/get", dispatch, () => {});
    };
    fetchProfile();
  }, []);

  return (
    <>
      <div className="filter-item">
        <label className="form-label">Aptitude Test</label>
        <Select
          style={{ width: "100%" }}
          onChange={props.handleChange("aptitudeExam")}
          className="searchBar-input"
          placeholder="Select aptitude test"
          disabled={editable ? true : false}
          //   onChange={handleChange}
          options={
            profile.education[0].level === "pg"
              ? aptitudeExams.filter((elem) => {
                  return elem.label !== "SAT" && elem.label !== "ACT";
                })
              : aptitudeExams.filter((elem) => {
                  return elem.label !== "GMAT" && elem.label !== "GRE";
                })
          }
          value={props?.formData?.aptitudeExam}
        />
      </div>
      {props?.formData?.aptitudeExam === "other" && (
        <div className="filter-item">
          <label className="form-label">Aptitude Test Name</label>
          <Input
            style={{ width: "100%" }}
            onChange={(e) =>
              props.handleChange("otherAptitudeExam")(e.target.value)
            }
            className="searchBar-input"
            disabled={editable ? true : false}
            value={props?.formData?.otherAptitudeExam}
            size="large"
            placeholder="Enter test name"
          />
        </div>
      )}
      {props?.formData?.aptitudeExam !== "na" &&
        props?.formData?.aptitudeExam !== undefined && (
          <div className="filter-item">
            <label className="form-label">Aptitude Test Score</label>
            <InputNumber
              onChange={props.handleChange("aptitudeExamScore")}
              style={{ width: "100%" }}
              disabled={editable ? true : false}
              max={
                aptitudeExams.find(
                  (exam) => exam.value === props?.formData?.aptitudeExam
                )?.maxMarks
              }
              min={
                aptitudeExams.find(
                  (exam) => exam.value === props?.formData?.aptitudeExam
                )?.minMarks
              }
              value={props?.formData?.aptitudeExamScore}
            />
          </div>
        )}
      <div className="d-flex justify-content-end mt-3">
        {/* {console.log(profile.education, "EUCATION APTI")} */}
        <button
          disabled={profile?.education?.length !== 0 ? false : true}
          onClick={
            editable
              ? () => {
                  setEditable(false);
                }
              : handleSubmit
          }
          type="submit"
          className="btn btn-white border"
        >
          {editable ? "Edit" : "Save"}
        </button>
      </div>
    </>
  );
};

export const Education = (props) => {
  const [editable, setEditable] = useState(
    props.educationList.map(() => false)
  );
  const { dispatch } = useContext(MainSiteContext);

  useEffect(() => {
    console.log(editable);
  }, [editable]);

  const handleToggleEdit = (index) => {
    const updatedEditable = [...editable];
    updatedEditable[index] = !updatedEditable[index];
    setEditable(updatedEditable);
    const updatedEducation = props?.educationList?.map((item) => ({
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
  };
  useEffect(() => {
    console.log(props.educationList, "EDUCATION");
  }, [props.educationList]);
  return (
    <>
      {props.educationList.map((education, index) => (
        <div key={index}>
          {index > 0 && <Divider />}
          <div
            className="formContent"
            style={{ position: "relative", marginTop: "15px" }}
          >
            <div>
              <label htmlFor="gender" className="form-label">
                Level of Education {index}
              </label>

              <Select
                size="large"
                disabled={editable[index]}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => props.handleChange(index, "level", value)}
                style={{ width: "100%" }}
                value={education?.level}
                options={lastExams}
              />
            </div>
            <div>
              <label htmlFor="gender" className="form-label">
                Education Status
              </label>
              <br />
              <Radio.Group
                value={education?.status}
                onChange={(e) =>
                  props.handleChange(index, "status", e.target.value)
                }
                disabled={editable[index]}
              >
                <Radio value={"persuing"}>Persuing</Radio>
                <Radio value={"completed"}>Completed</Radio>
              </Radio.Group>
            </div>
            <div>
              <label className="form-label">Education Name</label>
              <Input
                disabled={editable[index]}
                size="large"
                value={education?.name}
                onChange={(e) =>
                  props.handleChange(index, "name", e.target.value)
                }
                placeholder="Education name"
              />
            </div>
            <div>
              <label className="form-label">Average Marks</label>
              <Input
                disabled={editable[index]}
                size="large"
                onChange={(e) =>
                  props.handleChange(index, "marks", e.target.value)
                }
                value={education?.marks}
                placeholder="Enter average marks in %"
              />
            </div>
            {/* <div>
              <label htmlFor="occupation" className="form-label">
                University Name
              </label>
              <Select
                disabled={editable[index]}
                size="large"
                // value={options.values}
                placeholder="Please Select university"
                onChange={(value) =>
                  props.handleChange(index, "university", value)
                }
                style={{
                  width: "100%",
                  minWidth: "300px",
                }}
                value={education?.university}
                options={universities}
              />
            </div> */}
            <div>
              <label className="form-label">
                {education?.level === "10th" || education?.level === "12th"
                  ? "School"
                  : "University"}{" "}
                Name
              </label>
              <Input
                disabled={editable[index]}
                size="large"
                value={education?.institutionName}
                onChange={(e) =>
                  props.handleChange(index, "institutionName", e.target.value)
                }
                placeholder="Institution name"
              />
            </div>
            {/* <div>
              <label htmlFor="occupation" className="form-label">
                Persued from
              </label>
              <Select
                disabled={editable[index]}
                size="large"
                // value={options.values}
                placeholder="Please Select country"
                onChange={(value) =>
                  props.handleChange(index, "country", value)
                }
                style={{
                  width: "100%",
                  minWidth: "300px",
                }}
                value={education?.country}
                options={countryList}
              />
            </div> */}
            <div>
              <label className="form-label">Education Start Date</label>
              <DatePicker
                format={DATE_FORMAT}
                disabled={editable[index]}
                style={{ height: "39px" }}
                size="small"
                picker="month"
                value={
                  education?.startDate ? moment(education.startDate) : undefined
                }
                onChange={(date, dateString) => {
                  const formattedDate = dateString; // dateString should contain the formatted date
                  props.handleChange(index, "startDate", formattedDate);
                }}
              />
              {/* <RangePicker /> */}
            </div>
            {education?.status === "completed" && (
              <div>
                <label className="form-label">Education End Date</label>
                <DatePicker
                  format={DATE_FORMAT}
                  disabled={editable[index]}
                  style={{ height: "39px" }}
                  size="small"
                  picker="month"
                  value={
                    education?.endDate ? moment(education.endDate) : undefined
                  }
                  onChange={(date, dateString) => {
                    const formattedDate = dateString; // dateString should contain the formatted date
                    props.handleChange(index, "endDate", formattedDate);
                  }}
                />
                {/* <RangePicker /> */}
              </div>
            )}
            {editable[index] !== true && (
              <div style={{ position: "absolute", right: "15px", top: "15px" }}>
                <Space align="end">
                  <Popconfirm
                    title="Are you sure you want to delete this education entry?"
                    onConfirm={() => props.handleDeleteEducation(index)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end mt-2 w-100">
            {index === props.educationList.length - 1 && (
              <button
                className="btn btn-white border me-2"
                type="primary"
                onClick={props.handleAddEducation}
              >
                Add New
              </button>
            )}
            <button
              onClick={() => handleToggleEdit(index)}
              type="submit"
              className="btn  btn-white border"
            >
              {editable[index] ? "Edit" : "Save"}
            </button>
          </div>
          {props?.educationList?.length == 0 && (
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-white border me-2"
                type="primary"
                onClick={props.handleAddEducation}
              >
                Add New
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export const Experience = (props) => {
  const [editable, setEditable] = useState(
    props.experienceList.map(() => false)
  );
  const { dispatch } = useContext(MainSiteContext);

  useEffect(() => {
    console.log(editable);
  }, [editable]);

  const handleToggleEdit = (index) => {
    const updatedEditable = [...editable];
    updatedEditable[index] = !updatedEditable[index];
    setEditable(updatedEditable);

    const updatedExperience = props?.experienceList?.map((item) => ({
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
    console.log(updatedExperience);
    UpdateProfile(
      "user/profile/update",
      dispatch,
      { experience: updatedExperience },
      () => {}
    );
  };
  useEffect(() => {
    console.log(props.experienceList);
  }, [props.experienceList]);

  return (
    <>
      {props.experienceList.map((experience, index) => (
        <div key={index}>
          {index > 0 && <Divider />}
          <div
            className="formContent"
            style={{ position: "relative", marginTop: "15px" }}
          >
            {/* <div>
              <label htmlFor="gender" className="form-label">
                Work Type
              </label>

              <Select
                size="large"
                disabled={editable[index]}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) =>
                  props.handleChange(index, "workType", value)
                }
                style={{ width: "100%" }}
                value={experience.workType}
                options={lastExams}
              />
            </div>
            <div>
              <label htmlFor="gender" className="form-label">
                Working Status
              </label>
              <br />
              <Radio.Group
                defaultValue={experience.status}
                onChange={(e) =>
                  props.handleChange(index, "status", e.target.value)
                }
                disabled={editable[index]}
              >
                <Radio value={"ongoing"}>Ongoing</Radio>
                <Radio value={"completed"}>Completed</Radio>
              </Radio.Group>
            </div> */}
            <div>
              <label className="form-label">Name of Organization</label>
              <Input
                disabled={editable[index]}
                size="large"
                value={experience?.organizationName}
                onChange={(e) =>
                  props.handleChange(index, "organizationName", e.target.value)
                }
                placeholder="Organization name"
              />
            </div>
            <div>
              <label className="form-label">Designation</label>
              <Input
                disabled={editable[index]}
                size="large"
                value={experience?.designation}
                onChange={(e) =>
                  props.handleChange(index, "designation", e.target.value)
                }
                placeholder="Enter designation"
              />
            </div>
            <div>
              <label htmlFor="gender" className="form-label">
                Mode Of Payment
              </label>

              <Select
                size="large"
                disabled={editable[index]}
                placeholder="Select a Payment"
                optionFilterProp="children"
                onChange={(value) =>
                  props.handleChange(index, "modeOfPayment", value)
                }
                style={{ width: "100%" }}
                value={experience?.modeOfPayment}
                options={paymentMethods}
              />
            </div>
            <div>
              <label htmlFor="occupation" className="form-label">
                Country
              </label>
              <Select
                disabled={editable[index]}
                size="large"
                value={experience.country}
                placeholder="Please Select country"
                // onChange={(value, option) => handleMajorChange(value,true, 'select')}
                style={{
                  width: "100%",
                  minWidth: "300px",
                }}
                onChange={(value) =>
                  props.handleChange(index, "country", value)
                }
                options={countryList}
              />
            </div>
            <div>
              <label className="form-label">City</label>
              <Input
                disabled={editable[index]}
                size="large"
                value={experience?.city}
                onChange={(e) =>
                  props.handleChange(index, "city", e.target.value)
                }
                placeholder="Enter City/Town"
              />
            </div>
            <div>
              <label htmlFor="occupation" className="form-label">
                Currently Working
              </label>
              <Select
                disabled={editable[index]}
                size="large"
                value={experience.currentlyWorking}
                placeholder="Currently Working"
                // onChange={(value, option) => handleMajorChange(value,true, 'select')}
                style={{
                  width: "100%",
                  minWidth: "300px",
                }}
                onChange={(value) =>
                  props.handleChange(index, "currentlyWorking", value)
                }
                options={currentlyWorkingList}
              />
            </div>

            <div>
              <label className="form-label"> Start Date</label>
              <DatePicker
                format={DATE_FORMAT}
                disabled={editable[index]}
                style={{ height: "39px" }}
                size="small"
                picker="month"
                value={
                  experience?.startDate
                    ? moment(experience?.startDate)
                    : undefined
                }
                onChange={(date, dateString) => {
                  const formattedDate = dateString; // dateString should contain the formatted date
                  props.handleChange(index, "startDate", formattedDate);
                }}
              />
              {/* <RangePicker /> */}
            </div>
            {!experience?.currentlyWorking && (
              <div>
                <label className="form-label"> End Date</label>
                <DatePicker
                  format={DATE_FORMAT}
                  disabled={editable[index]}
                  style={{ height: "39px" }}
                  size="small"
                  picker="month"
                  value={
                    experience?.endDate ? moment(experience.endDate) : undefined
                  }
                  onChange={(date, dateString) => {
                    const formattedDate = dateString; // dateString should contain the formatted date
                    props.handleChange(index, "endDate", formattedDate);
                  }}
                />
              </div>
            )}

            {editable[index] !== true && (
              <div
                style={{ position: "absolute", right: "15px", top: "-10px" }}
              >
                <Space align="end">
                  <Popconfirm
                    title="Are you sure you want to delete this experience entry?"
                    onConfirm={() => props.handleDeleteExperience(index)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end mt-2 w-100">
            {index === props.experienceList.length - 1 && (
              <button
                className="btn btn-white border me-2"
                type="primary"
                onClick={props.handleAddExperience}
              >
                Add New
              </button>
            )}
            <button
              onClick={() => handleToggleEdit(index)}
              type="submit"
              className="btn  btn-white border"
            >
              {editable[index] ? "Edit" : "Save"}
            </button>
          </div>
        </div>
      ))}
      {props.experienceList.length === 0 && (
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-white border me-2"
            type="primary"
            onClick={props.handleAddExperience}
          >
            Add New
          </button>
        </div>
      )}
      {/* <div className="d-flex justify-content-end mt-3">
        {props.educationList.length > 0 && (
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-white border"
          >
            {editable ? "Edit" : "Save"}
          </button>
        )}
      </div> */}
    </>
  );
};

export const EmergencyContact = (props) => {
  const [editable, setEditable] = useState(false);

  const { dispatch } = useContext(MainSiteContext);

  const handleToggleEdit = () => {
    setEditable(!editable);
    UpdateProfile(
      "user/profile/update",
      dispatch,
      { emergencyContact: props.formData },
      () => {}
    );
  };

  return (
    <>
      <div
        className="formContent"
        style={{ position: "relative", marginTop: "15px" }}
      >
        <div>
          <label className="form-label">Full Name</label>
          <Input
            disabled={editable}
            size="large"
            value={props?.formData?.name}
            onChange={(e) => props.handleChange("name")(e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="form-label">Relation</label>
          <Input
            disabled={editable}
            size="large"
            value={props?.formData?.relation}
            onChange={(e) => props.handleChange("relation")(e.target.value)}
            placeholder="Relation with person"
          />
        </div>
        <div>
          <label className="form-label">Phone</label>
          <Input
            disabled={editable}
            size="large"
            value={props?.formData?.phone}
            onChange={(e) => props.handleChange("phone")(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <Input
            disabled={editable}
            size="large"
            value={props?.formData?.email}
            onChange={(e) => props.handleChange("email")(e.target.value)}
            placeholder="Please enter email address"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
          onClick={() => handleToggleEdit()}
          type="submit"
          className="btn btn-white border"
        >
          {editable ? "Edit" : "Save"}
        </button>
      </div>
    </>
  );
};
