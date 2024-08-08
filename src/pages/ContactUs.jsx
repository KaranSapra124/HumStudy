import Coverbg from "../components/ui/Coverbg";
import Navbar from "../components/ui/Navbar";

import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import "../components/profile/Personal.css";

const { TextArea } = Input;

const DATE_FORMAT = "YYYY-MM-DD";

const loanRange = [
  {
    label: "Rs 8Lacs - Rs 20Lacs",
    value: "Rs 8Lacs - Rs 20Lacs",
  },
  {
    label: "Rs 20Lacs+",
    value: "Rs 20Lacs+",
  },
];

const loanTypes = [
  {
    label: "Secured",
    value: "secured",
  },
  {
    label: "Unsecured",
    value: "unsecured",
  },
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
  },
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

const ContactUs = () => {
  const [isEditing, setIsEditing] = useState(true);

  const [formData, setFormData] = useState({});

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

   
    const updateLoanDetails = {
      ...formData,
      ...(formData?.startDate && {
        startDate: new Date(formData?.startDate),
      }),
      ...(formData?.endDate && {
        endDate: new Date(formData?.endDate),
      }),
    };
  };

  return (
    <div className="page">
      <Navbar />
      <Coverbg
        heading="Contact Us"
        // searchBar={<AccomodationSearchBar />}
      />
      <div className=" bg-white">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-3  contactForm p-md-4"
          style={{ backgroundColor: "#f2f3f4", borderRadius: "15px" }}
        >
          <h3>Contact Us</h3>
          <div className="flex flex-col gap-3  mt-1">
            <div>
              <label htmlFor="gender" className="form-label">
                Subject
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
              <label htmlFor="gender" className="form-label">
                Message
              </label>

              <TextArea rows={4} />
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
            <Button
              style={{ backgroundColor: "#5d0cfd" }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
