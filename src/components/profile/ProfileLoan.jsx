import React, { useContext, useEffect, useState } from "react";
import { Select, Input, Space } from "antd";
import "./Personal.css";
import { DatePicker } from "antd";
import { Radio } from "antd";
import moment from "moment";
import { MainSiteContext } from "../../context/MainSiteContext";
import { UpdateProfile } from "../../methods/MainMethods";
const DATE_FORMAT = "YYYY-MM-DD";

const loanRange = [
  {
    label: "Rs 8Lacs - Rs 20Lacs",
    value:"Rs 8Lacs - Rs 20Lacs"
  },
  {
    label: "Rs 20Lacs+",
    value: "Rs 20Lacs+",
  }
];

const loanTypes = [
  {
    label: "Secured",
    value: "secured",
  },
  {
    label: "Unsecured",
    value: "unsecured",
  }
];
const loanBefore = [
  {
    label: "Yes I have Taken",
    value: "Yes I have Taken",
  },
  {
    label: "Not Taken",
    value: "Not Taken",
  },
  {
    label: "My Mother Taken",
    value: "My Mother Taken",
  },
  {
    label: "My Father Taken",
    value: "My Father Taken",
  },
  {
    label: "My Sister Taken",
    value: "My Sister Taken",
  },
  {
    label: "My Brother Taken",
    value: "My Brother Taken",
  }
];

const status = [
  {
    label: "Confirmed",
    value: "confirmed",
  },
  {
    label: "Applied",
    value: "applied",
  },
  {
    label: "Not Applied yet",
    value: "na",
  },
];

const loanActive = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const previousLoanType = [
  {
    label: "Home Loan",
    value: "home loan",
  },
  {
    label: "Business Loan",
    value: "Business loan",
  },
  {
    label: "Personal Loan",
    value: "Personal loan",
  },
  {
    label: "Bike or Car Loan",
    value: "Bike or Car loan",
  },
];

function ProfileLoan() {
  const [isEditing, setIsEditing] = useState(true);
  const {state:{profile}, dispatch } = useContext(MainSiteContext);

  const [formData, setFormData] = useState({
   
  });

  const handleInputChange = (input) => (value) => {
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    const updateLoanDetails ={
      ...formData,
      ...(formData?.startDate&&{
        startDate:new Date(formData?.startDate)
      }),
      ...(formData?.endDate&&{
        endDate:new Date(formData?.endDate)
      })
      
    }
    UpdateProfile("user/profile/update", dispatch, {loanDetails:updateLoanDetails}, () => {});


  };
  useEffect(()=>{
   if(profile?.loanDetails) setFormData(profile?.loanDetails)

  },[profile])

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-3 p-md-4"
      style={{ backgroundColor: "#fff", borderRadius: "15px" }}
    >
      <h6>Details for loan</h6>
      <div className="formContent  mt-1">
        <div>
          <label htmlFor="fName" className="form-label">
            In which Country you are going to persue your Dream Education ?
          </label>
          <Select
            size="large"
            placeholder="Select countries"
            optionFilterProp="children"
            mode="multiple"
            value={formData?.countries}
            style={{ width: "100%" }}
            disabled={!isEditing}
            onChange={handleInputChange("countries")}
            // onSearch={onSearch}
            // filterOption={filterOption}
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
        </div>

        <div>
          <label htmlFor="lName" className="form-label">
            Current status of Admission ?
          </label>

          <Select
            size="large"
            placeholder="Select status of admission"
            optionFilterProp="children"
            style={{ width: "100%" }}
            showSearch="true"
            value={formData?.statusOfAdmission}
            disabled={!isEditing}
            onChange={handleInputChange("statusOfAdmission")}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={status}
          />
        </div>

        <div>
          <label htmlFor="gender" className="form-label">
            Which University are you Planning to attend ?
          </label>

          <Input
            size="large"
            name="plannedUniversity"
            placeholder="Enter a University"
            value={formData?.plannedUniversity}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                plannedUniversity: val.target.value,
              }))
            }
          />
          {/* <Select
            size="large"
            disabled={!isEditing}
            placeholder="Select university"
            optionFilterProp="children"
            style={{ width: "100%" }}
            showSearch="true"
            onChange={handleInputChange("plannedUniversity")}
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
          /> */}
        </div>

        <div>
          <label htmlFor="occupation" className="form-label">
            What's your intended Program Start Date?
          </label>

          <DatePicker
          format={DATE_FORMAT}
            //    disabled={editable[index]}
            style={{ height: "39px" }}
            size="small"
            picker="month"
            disabled={!isEditing}
            value={formData?.startDate ? moment(formData?.startDate) : undefined}
            onChange={handleInputChange("startDate")}

          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Loan range
          </label>

          <Select
            size="large"
            placeholder="Select loan range you want"
            optionFilterProp="children"
            style={{ width: "100%" }}
            value={formData?.loanAmount}
            disabled={!isEditing}
            onChange={handleInputChange("loanAmount")}

            options={loanRange}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Loan type
          </label>

          <Select
            size="large"
            placeholder="Select loan type you want"
            optionFilterProp="children"
            style={{ width: "100%" }}
            value={formData?.loanType}
            disabled={!isEditing}
            onChange={handleInputChange("loanType")}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={loanTypes}
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Payment Deadline
          </label>

          <DatePicker
            format={DATE_FORMAT}
            //    disabled={editable[index]}
            style={{ height: "39px" }}
            size="small"
            picker="month"
            value={formData?.paymentDeadline?moment(formData?.paymentDeadline):undefined}
            disabled={!isEditing}
            onChange={handleInputChange("paymentDeadline")}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Have you taken loan before?
          </label>

          <Select
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            style={{ width: "100%" }}
            value={formData?.loanBefore}
            disabled={!isEditing}
            onChange={handleInputChange("loanBefore")}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={loanBefore}
          />
        </div>
        {!(
           formData?.loanBefore === undefined ||formData?.loanBefore==="Not Taken"
        ) && (
          <div>
            <label htmlFor="email" className="form-label">
              Is this Loan Active?
            </label>

            <Select
              size="large"
              placeholder="Select a person"
              optionFilterProp="children"
              style={{ width: "100%" }}
              disabled={!isEditing}
              value={formData?.loanActive}
              onChange={handleInputChange("loanActive")}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={loanActive}
            />
          </div>
        )}
        {formData?.loanActive === "yes" && (
          <div>
            <label htmlFor="email" className="form-label">
              What Type of Loan is this?
            </label>

            <Select
              size="large"
              placeholder="Select loan type"
              optionFilterProp="children"
              style={{ width: "100%" }}
              value={formData?.previousLoanType}
              disabled={!isEditing}
              onChange={handleInputChange("previousLoanType")}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={previousLoanType}
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="form-label">
            What is your or your parent's CIBIL Score
          </label>
          <br />
          <Radio.Group
            disabled={!isEditing}
            onChange={(e) => handleInputChange("cibilOf")(e.target.value)}
            name="radiogroup"
            value={formData?.cibilOf}
          >
            <Radio value="student">My/Student</Radio>
            <Radio value="parents">Mother/Father</Radio>
          </Radio.Group>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="form-label">
            CIBIL Score
          </label>
          <br />
          <Radio.Group
            disabled={!isEditing}
            onChange={(e) => handleInputChange("cibilScore")(e.target.value)}
            name="cibilScore"
            value={formData?.cibilScore?.toString()}
          >
            <Radio value="699">Below 700</Radio>
            <Radio value="749">700+</Radio>
            <Radio value="799">750+</Radio>
            <Radio value="899">Above 800</Radio>
          </Radio.Group>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="form-label">
            Select Job type
          </label>
          <br />
          <Radio.Group
            disabled={!isEditing}
            onChange={(e) => handleInputChange("jobType")(e.target.value)}
            name="jobType"
            value={formData?.jobType}
          >
            <Radio value="government">Government</Radio>
            <Radio value="private">Private</Radio>
            <Radio value="notEmployed">Not Employed</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button type="submit" className="btn btn-white border">
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </form>
  );
}

export default ProfileLoan;
