import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import { NormalInput } from "../../components/inputs/ModalInputs";
import { MdAdd } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function FlightModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({});

  const updateNestedData = (data, keys, value) => {
    const [currentKey, ...remainingKeys] = keys;

    if (!remainingKeys.length) {
      return {
        ...data,
        [currentKey]: value,
      };
    }
    return {
      ...data,
      [currentKey]: updateNestedData(data[currentKey], remainingKeys, value),
    };
  };

  const handleDataChange = (name = null, value) => {
    if (!name) return;
    if (name.includes(".")) {
      const keys = name.split(".");
      setData((prev) => updateNestedData(prev, keys, value));
    } else
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newData = {
      ...editItem,
      ...formData,
    };
    saveFunc(newData);
    setModal(false);
  };
  const putValues = () => {
    // console.log(editItem);
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: editItem.firstName,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      lastName: editItem.lastName,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth: editItem.dateOfBirth,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      purpose: editItem.purpose,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfTravel: editItem.dateOfTravel,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      fromFlight: editItem.fromFlight,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      toFlight: editItem.toFlight,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: editItem.country,
    }));
  };

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(formData);

  // };
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
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (view === "edit") putValues();
  }, []);

  return (
    <Modal setIsModal={setIsModal} modal={modal} className="h-96">
      <h2>{view === "edit" ? "Edit" : "Add"} Flight Details</h2>
      {/* <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <NormalInput
          type={"text"}
          label={"Flight ID"}
          inputId={"flightID"}
          inputState={data?.flightId}
          setInputState={(val) => handleDataChange("flightId", val)}
        />
        <NormalInput
          type={"text"}
          label={"Airline name"}
          inputId={"airline"}
          inputState={data?.airline}
          setInputState={(val) => handleDataChange("airline", val)}
        />
        <NormalInput
          type={"text"}
          label={"Flight No."}
          inputId={"flightNumber"}
          inputState={data?.flightNumber}
          setInputState={(val) => handleDataChange("flightNumber", val)}
        />
        <div className="w-full border border-pruple-100 rounded-[10px] p-4 relative flex flex-col gap-4">
          <p className="absolute -top-[12px] left-5 px-2 rounded-full bg-purple-100">
            Departure
          </p>
          <NormalInput
            type={"text"}
            label={"Airport"}
            inputId={"departureAirport"}
            inputState={data?.departure?.airport}
            setInputState={(val) => handleDataChange("departure.airport", val)}
          />
          <NormalInput
            type={"text"}
            label={"Terminal"}
            inputId={"departureTerminal"}
            inputState={data?.departure?.terminal}
            setInputState={(val) => handleDataChange("departure.terminal", val)}
          />
          <NormalInput
            type={"text"}
            label={"City"}
            inputId={"departureCity"}
            inputState={data?.departure?.city}
            setInputState={(val) => handleDataChange("departure.city", val)}
          />
          <NormalInput
            type={"text"}
            label={"Country"}
            inputId={"departureCountry"}
            inputState={data?.departure?.country}
            setInputState={(val) => handleDataChange("departure.country", val)}
          />
          <NormalInput
            type={"datetime-local"}
            label={"Time"}
            inputId={"departureDateTime"}
            inputState={data?.departure?.dateTime.toISOString().slice(0, 16)}
            setInputState={(val) => handleDataChange("departure.dateTime", val)}
          />
        </div>
        <div className="w-full border border-pruple-100 rounded-[10px] p-4 relative flex flex-col gap-4">
          <p className="absolute -top-[12px] left-5 px-2 rounded-full bg-purple-100">
            Arrival
          </p>
          <NormalInput
            type={"text"}
            label={"Airport"}
            inputId={"arrivalAirport"}
            inputState={data?.arrival?.airport}
            setInputState={(val) => handleDataChange("arrival.airport", val)}
          />
          <NormalInput
            type={"text"}
            label={"Terminal"}
            inputId={"arrivalTerminal"}
            inputState={data?.arrival?.terminal}
            setInputState={(val) => handleDataChange("arrival.terminal", val)}
          />
          <NormalInput
            type={"text"}
            label={"City"}
            inputId={"arrivalCity"}
            inputState={data?.arrival?.city}
            setInputState={(val) => handleDataChange("arrival.city", val)}
          />
          <NormalInput
            type={"text"}
            label={"Country"}
            inputId={"arrivalCountry"}
            inputState={data?.arrival?.country}
            setInputState={(val) => handleDataChange("arrival.country", val)}
          />
          <NormalInput
            type={"datetime-local"}
            label={"Time"}
            inputId={"arrivalDateTime"}
            inputState={data?.arrival?.dateTime.toISOString().slice(0, 16)}
            setInputState={(val) => handleDataChange("arrival.dateTime", val)}
          />
        </div>
        <div className="border rounded-[10px] relative p-4">
          <p className="px-2 rounded-full bg-gray-100 absolute -top-[10px] left-[20px]">
            Duration
          </p>
          <div className="flex md:flex-row flex-col md:items-center gap-4 justify-between">
            <NormalInput
              type={"number"}
              label={"Hours"}
              inputId={"durationHours"}
              inputState={data?.duration?.hours}
              setInputState={(val) => handleDataChange("duration.hours", val)}
            />
            <NormalInput
              type={"number"}
              label={"Minutes"}
              inputId={"durationMinutes"}
              inputState={data?.duration?.minutes}
              setInputState={(val) => handleDataChange("duration.minutes", val)}
            />
          </div>
        </div>
        <div className="border border-purple-100 p-4">
          <div className="flex items-center gap-10 justify-between">
            <label>Layovers</label>
            <button
              type="button"
              onClick={() =>
                handleDataChange("layovers", [
                  ...(data?.layovers || []),
                  { airport: "", duration: { hours: "", minutes: "" } },
                ])
              }
              className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
            >
              <MdAdd />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {data?.layovers?.map((lay, i, arr) => (
              <div
                key={i}
                className="flex flex-col gap-2 mt-3 border p-2 rounded-[10px]"
              >
                <div className="flex items-center gap-5 justify-between">
                  <span className="ps-2">{i + 1}.</span>

                  <button
                    type="button"
                    onClick={() =>
                      handleDataChange(
                        "layovers",
                        arr.filter((_, j) => i !== j)
                      )
                    }
                    className="p-2 rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Airport"
                  value={lay.airport}
                  onChange={(e) =>
                    handleDataChange(
                      "layovers",
                      arr.map((item, j) =>
                        i !== j ? item : { ...item, airport: e.target.value }
                      )
                    )
                  }
                  className="border border-gray-200 p-2 rounded-md outline-none flex-grow"
                />
                <div>
                  <p>Duration:</p>
                  <div className="flex md:flex-row flex-col md:items-center gap-4 justify-between">
                    <input
                      type="number"
                      placeholder="Hours"
                      value={lay?.duration?.hours}
                      onChange={(e) =>
                        handleDataChange(
                          "layovers",
                          arr.map((item, j) =>
                            i !== j
                              ? item
                              : {
                                  ...item,
                                  duration: {
                                    ...item?.duration,
                                    hours: e.target.value,
                                  },
                                }
                          )
                        )
                      }
                      className="border border-gray-200 p-2 rounded-md outline-none flex-grow"
                    />
                    <input
                      type="number"
                      placeholder="Minutes"
                      min={0}
                      max={60}
                      value={lay?.duration?.minutes}
                      onChange={(e) =>
                        handleDataChange(
                          "layovers",
                          arr.map((item, j) =>
                            i !== j
                              ? item
                              : {
                                  ...item,
                                  duration: {
                                    ...item?.duration,
                                    minutes: e.target.value,
                                  },
                                }
                          )
                        )
                      }
                      className="border border-gray-200 p-2 rounded-md outline-none flex-grow"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="flightClass">Flight Class</label>
          <select
            name="flightClass"
            id="flightClass"
            // defaultValue={data?.flightClass}
            value={data?.flightClass}
            onChange={(e) => handleDataChange("flightClass", e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          >
            <option value="">-- Select Baggage --</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <NormalInput
          type={"Number"}
          label={"Price"}
          inputId={"price"}
          inputState={data?.price}
          setInputState={(val) => handleDataChange("price", val)}
        />
        <NormalInput
          type={"Number"}
          label={"Total Seats"}
          inputId={"totalSeats"}
          inputState={data?.totalSeats}
          setInputState={(val) => handleDataChange("totalSeats", val)}
        />
        <NormalInput
          type={"Number"}
          label={"Available Seats"}
          inputId={"availableSeats"}
          inputState={data?.availableSeats}
          setInputState={(val) => handleDataChange("availableSeats", val)}
        />

        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="baggage">Baggage</label>
          <select
            name="baggage"
            id="baggage"
            // defaultValue={data?.baggage}
            value={data?.baggage}
            onChange={(e) => handleDataChange("baggage", e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          >
            <option value="">-- Select Baggage --</option>
            <option value="Backpack">Backpack</option>
            <option value="Adult">Adult</option>
            <option value="Children">Children</option>
          </select>
        </div>
        <NormalInput
          type={"Number"}
          label={"Check in capacity (kg)"}
          inputId={"checkInCapacity"}
          inputState={data?.checkInCapacity}
          setInputState={(val) => handleDataChange("checkInCapacity", val)}
        />
        <NormalInput
          type={"Number"}
          label={"Cabin capacity (kg)"}
          inputId={"cabinCapacity"}
          inputState={data?.cabinCapacity}
          setInputState={(val) => handleDataChange("cabinCapacity", val)}
        />

        <button
          type="submit"
          className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button>
      </form> */}

      <div className="flex justify-center ">
        <div className="p-4 md:p-8 max-[500px]:w-64">
          <form
            onSubmit={handleSave}
            className="flex flex-col max-w-md mx-auto"
          >
            <label className="text-gray-700">First Name:</label>
            <input
              name="firstName"
              onChange={(e) => handleInputChange(e)}
              type="text"
              value={formData.firstName}
              placeholder="Enter Your First Name...."
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Last Name:</label>
            <input
              name="lastName"
              onChange={(e) => handleInputChange(e)}
              type="text"
              value={formData.lastName}
              placeholder="Enter Your Last Name...."
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Date Of Birth:</label>
            <input
              name="dateOfBirth"
              onChange={(e) => handleInputChange(e)}
              value={formData.dateOfBirth}
              type="date"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Date Of Travel:</label>
            <input
              name="dateOfTravel"
              onChange={(e) => handleInputChange(e)}
              type="date"
              value={formData.dateOfTravel}
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Return Date:</label>
            <input
              name="returnDate"
              onChange={(e) => handleInputChange(e)}
              type="date"
              value={formData.returnDate}
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
            />
            <label className="text-gray-700">Purpose:</label>
            <select
              name="purpose"
              className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              onChange={handlePurpose}
              value={formData.purpose}
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
              value={formData.fromFlight}
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
              value={formData.country}
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
              value={formData.toFlight}
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
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

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
