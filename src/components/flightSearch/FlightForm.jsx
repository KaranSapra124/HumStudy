import { useContext, useEffect, useState } from "react";
import { userMethod } from "../../userMethods/userMethod";
import { NormalInput } from "../inputs/ModalInputs";
import { MainSiteContext } from "../../context/MainSiteContext";
import { useNavigate } from "react-router";

export const FlightForm = () => {
  const { state } = useContext(MainSiteContext);
  const { user } = state;
  const Navigate = useNavigate()
  const [isOther, setOther] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    dateOfTravel: "",
    returnDate: "",
    purpose: "",
    fromFlight: "",
    toFlight: "",
    country: "",
  });

  const flightStyle = {
    fontWeight: "bold",
    transition: "all 3s",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    userMethod("/add-flight-query", formData, null);
  };
  const handleSelectChange = (event) => {
    if (event.target.value === "Other") {
      setOther(true);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: event.target.value,
      }));
    }
  };

  const handleOtherInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.target.value,
    }));
  };

  const handleSelectDeparture = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fromFlight: e.target.value,
    }));
  };

  const handleSelectDestination = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.target.value,
    }));
  };

  const handlePurpose = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      purpose: e.target.value,
    }));
  };

  const handleSelectDestinationAirport = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      toFlight: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    !user?.isLogin && Navigate("/login");
  }, []);

  return (
    <>
      <div
        className="flex mb-10 items-center justify-center "
        style={{ marginTop: "5rem" }}
      >
        <div className="border p-4 md:p-8 max-[500px]:w-64">
          <h1 className="text-xl md:text-2xl mb-4">
            Wanna Take Off ✈, fill the form below!
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-md mx-auto"
          >
            <label className="text-gray-700">First Name:</label>
            <input
              name="firstName"
              onChange={(e) => handleInputChange(e)}
              type="text"
              placeholder="Enter Your First Name...."
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Last Name:</label>
            <input
              name="lastName"
              onChange={(e) => handleInputChange(e)}
              type="text"
              placeholder="Enter Your Last Name...."
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Date Of Birth:</label>
            <input
              name="dateOfBirth"
              onChange={(e) => handleInputChange(e)}
              type="date"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Date Of Travel:</label>
            <input
              name="dateOfTravel"
              onChange={(e) => handleInputChange(e)}
              type="date"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Return Date:</label>
            <input
              name="returnDate"
              onChange={(e) => handleInputChange(e)}
              type="date"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Purpose:</label>
            <select
              name="purpose"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              onChange={handlePurpose}
            >
              <option value="">Select...</option>
              <option value="Business">Business</option>
              <option value="Vocations">Vacations</option>
              <option value="Study & Medical">Study & Medical</option>
            </select>
            <label className="text-gray-700">Departure Airport:</label>
            <select
              name="departureAirport"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              onChange={handleSelectDeparture}
            >
              {filghtsData[0].airports.map((elem, index) => (
                <option value={elem} key={index}>
                  {elem}
                </option>
              ))}
            </select>
            <label className="text-gray-700">Destination Country:</label>
            <select
              name="country"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              onChange={handleSelectDestination}
            >
              <option disabled selected value={""}>
                Select Destination Country...
              </option>
              {filghtsData.map((elem, index) => {
                if (elem.destination) {
                  return (
                    <option value={elem?.destination} key={index}>
                      {elem.destination !== null &&
                        elem.destination !== undefined &&
                        elem?.destination}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            <label className="text-gray-700">Destination Airport:</label>
            <select
              disabled={formData.country !== "" ? false : true}
              name="destinationAirport"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              onChange={handleSelectDestinationAirport}
            >
              {formData.country === "" && (
                <option disabled selected>
                  Select The Destination Country First!
                </option>
              )}
              {filghtsData.map((elem, index) => {
                if (elem?.destination === formData.country) {
                  return elem.airports.map((airport, i) => (
                    <option value={airport} key={i}>
                      {airport}
                    </option>
                  ));
                } else {
                  return null;
                }
              })}
            </select>

            <button
              type="submit"
              style={flightStyle}
              className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const filghtsData = [
  {
    departure: "From",
    // destination: "Select",
    airports: [
      "Indira Gandhi International Airport (DEL)",
      "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      "Kempegowda International Airport (BLR)",
      "Chennai International Airport (MAA)",
      "Netaji Subhas Chandra Bose International Airport (CCU)",
      "Rajiv Gandhi International Airport (HYD)",
      "Cochin International Airport (COK)",
      "Sardar Vallabhbhai Patel International Airport (AMD)",
      "Pune Airport (PNQ)",
      "Goa International Airport (GOI)",
    ],
  },
  {
    destination: "USA",
    airports: [
      "John F. Kennedy International Airport (JFK)",
      "Los Angeles International Airport (LAX)",
      "O'Hare International Airport (ORD)",
      "Hartsfield-Jackson Atlanta International Airport (ATL)",
      "San Francisco International Airport (SFO)",
      "Miami International Airport (MIA)",
      "Newark Liberty International Airport (EWR)",
      "Dallas/Fort Worth International Airport (DFW)",
      "Denver International Airport (DEN)",
      "Seattle-Tacoma International Airport (SEA)",
    ],
  },
  {
    destination: "Canada",
    airports: [
      "Toronto Pearson International Airport (YYZ)",
      "Vancouver International Airport (YVR)",
      "Montréal-Pierre Elliott Trudeau International Airport (YUL)",
      "Calgary International Airport (YYC)",
      "Edmonton International Airport (YEG)",
      "Ottawa Macdonald-Cartier International Airport (YOW)",
      "Halifax Stanfield International Airport (YHZ)",
      "Winnipeg James Armstrong Richardson International Airport (YWG)",
    ],
  },
  {
    destination: "Australia",
    airports: [
      "Sydney Kingsford Smith Airport (SYD)",
      "Melbourne Airport (MEL)",
      "Brisbane Airport (BNE)",
      "Perth Airport (PER)",
      "Adelaide Airport (ADL)",
      "Gold Coast Airport (OOL)",
      "Cairns Airport (CNS)",
      "Darwin International Airport (DRW)",
    ],
  },
  {
    destination: "United Kingdom",
    airports: [
      "London Heathrow Airport (LHR)",
      "London Gatwick Airport (LGW)",
      "London Stansted Airport (STN)",
      "Manchester Airport (MAN)",
      "London Luton Airport (LTN)",
      "Edinburgh Airport (EDI)",
      "Birmingham Airport (BHX)",
      "Glasgow Airport (GLA)",
    ],
  },
  {
    destination: "Ireland",
    airports: ["Dublin Airport (DUB)"],
  },
  {
    destination: "Germany",
    airports: [
      "Frankfurt Airport (FRA)",
      "Munich Airport (MUC)",
      "Berlin Brandenburg Airport (BER)",
      "Düsseldorf Airport (DUS)",
      "Hamburg Airport (HAM)",
      "Cologne Bonn Airport (CGN)",
      "Stuttgart Airport (STR)",
      "Hannover Airport (HAJ)",
    ],
  },
];
