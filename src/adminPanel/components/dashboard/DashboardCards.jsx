import { useEffect, useState } from "react";
import { LoadingLineWave } from "../../../components/Loadings";
import dashboard from "../../../dummyData.json";
import ReactVisibilitySensor from "react-visibility-sensor";
import CountUp from "react-countup";
import { adminAuthMethod } from "../../methods/adminAuthMethod";

export const SalesCard = () => {
  // const [appData, setAppData] = useState([]);
  const [data, setData] = useState({
    total: dashboard?.sales?.total,
    target: dashboard?.sales?.target,
  });
  const [isLoading, setIsLoading] = useState(true);

  const handlePeriodSelect = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <div className="lg:col-span-3 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-white p-4 py-6 shadow-md shadow-gray-200 flex flex-col justify-between gap-5 transition-all duration-300 h-80 w-72  hover:scale-105">
      <h4 className="text-[18px]">Total sales:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <>
              <p className="text-primary text-[28px] font-[600]">
                $
                {isVisible ? (
                  <CountUp duration={2} end={data.total} />
                ) : (
                  data.total
                )}
              </p>
              <p
                className={` ${
                  (data.total * 100) / data.target < 100
                    ? "text-orange-300"
                    : "text-green-500"
                }`}
              >
                0% of target
              </p>
            </>
          )}
        </ReactVisibilitySensor>
      )}
      <div>
        <select
          name="planPeriodSelect"
          id="planPeriodSelect"
          defaultValue={"week"}
          onChange={handlePeriodSelect}
          className="text-white bg-tl_primary px-2 py-1 rounded-md outline-none"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="2 months">Last 2 Months</option>
          <option value="3 months">Last 3 Months</option>
          <option value="6 months">Last 6 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>
    </div>
  );
};

export const ActivePlansCard = () => {
  const [data, setData] = useState({
    plans: dashboard?.plans,
  });
  const [isLoading, setIsLoading] = useState(true);

  const handlePeriodSelect = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-orange-500 text-white p-4 py-6 shadow-md shadow-orange-100 flex flex-col justify-between gap-5 transition-all h-80 w-72 duration-300  hover:scale-105">
      <h4 className="text-[18px]">Active Plans:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <div className="flex items-center justify-around gap-4 mb-2">
              {data.plans?.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-[14px] mb-1">{item.name}</p>
                  <p className="text-[24px]">
                    {isVisible ? <CountUp duration={2} end={"3"} /> : "3"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ReactVisibilitySensor>
      )}
      <div>
        <select
          name="planPeriodSelect"
          id="planPeriodSelect"
          defaultValue={"week"}
          onChange={handlePeriodSelect}
          className="text-black px-2 py-1 rounded-md outline-none"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="2 months">Last 2 Months</option>
          <option value="3 months">Last 3 Months</option>
          <option value="6 months">Last 6 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>
    </div>
  );
};

export const UniCard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    adminAuthMethod("/get-docs-count", null, setData, setIsLoading);
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 h-80 w-72 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-blue-800 text-white p-4 py-6 shadow-md shadow-blue-200 flex flex-col justify-between gap-5 transition-all duration-300  hover:scale-105">
      <h4 className="text-[18px]">All Unis:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <p className="text-[60px] font-[700] text-center mb-10">
              {console.log(data)}
              {isVisible ? <CountUp duration={2} end={data[0]?.uni} /> : "500"}
            </p>
          )}
        </ReactVisibilitySensor>
      )}
    </div>
  );
};

export const CourseCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAuthMethod("/get-docs-count", null, setData, setIsLoading);
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 h-80 w-72 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-green-700 text-white p-4 py-6 shadow-md shadow-green-200 flex flex-col justify-between gap-5 transition-all duration-300  hover:scale-105">
      <h4 className="text-[18px]">Total Courses:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <p className="text-[60px] font-[700] text-center mb-10">
              {isVisible ? (
                <CountUp duration={2} end={data[1]?.course} />
              ) : (
                "20000"
              )}
            </p>
          )}
        </ReactVisibilitySensor>
      )}
    </div>
  );
};

export const FlightCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAuthMethod("/get-docs-count", null, setData, setIsLoading);
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 h-80 w-72 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-purple-700 text-white p-4 py-6 shadow-md shadow-green-200 flex flex-col justify-between gap-5 transition-all duration-300  hover:scale-105">
      <h4 className="text-[18px]">Flight Applications:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <p className="text-[60px] font-[700] text-center mb-10">
              {isVisible ? (
                <CountUp duration={2} end={data[2]?.flight} />
              ) : (
                "20000"
              )}
            </p>
          )}
        </ReactVisibilitySensor>
      )}
    </div>
  );
};

export const VisaCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAuthMethod("/get-docs-count", null, setData, setIsLoading);
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 h-80 w-72 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-yellow-500 text-white p-4 py-6 shadow-md shadow-green-200 flex flex-col justify-between gap-5 transition-all duration-300 relative hover:scale-105">
      <h4 className="text-[18px]">Visa Applications:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <p className="text-[60px] font-[700] text-center mb-10">
              {isVisible ? (
                <CountUp duration={2} end={data[3]?.visa} />
              ) : (
                "20000"
              )}
            </p>
          )}
        </ReactVisibilitySensor>
      )}
    </div>
  );
};

export const UniAppCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAuthMethod("/get-docs-count", null, setData, setIsLoading);
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 h-80 w-72 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-indigo-700 text-white p-4 py-6 shadow-md shadow-green-200 flex flex-col justify-between gap-5 transition-all duration-300 relative hover:scale-105">
      <h4 className="text-[18px]">University Applications:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <p className="text-[60px] font-[700] text-center mb-10">
              {isVisible ? (
                <CountUp duration={2} end={data[4]?.uniAppsCount} />
              ) : (
                "20000"
              )}
            </p>
          )}
        </ReactVisibilitySensor>
      )}
    </div>
  );
};

export const LoanAppCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAuthMethod("/get-docs-count", null, setData, setIsLoading);
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <div className="lg:col-span-3 no-underline h-80 w-72 sm:col-span-6 col-span-12 rounded-md overflow-hidden bg-[#009FBD] text-white p-4 py-6 shadow-md shadow-green-200 flex flex-col justify-between gap-5  transition-all duration-300 relative hover:scale-105">
      <h4 className="text-[18px] no-underline">Loan Applications:</h4>
      {isLoading ? (
        <LoadingLineWave className="mt-[-20px]" color="#fff" />
      ) : (
        <ReactVisibilitySensor partialVisibility offset={{ bottom: 200 }}>
          {({ isVisible }) => (
            <p className="text-[60px] font-[700] text-center mb-10">
              {isVisible ? (
                <CountUp duration={2} end={data[5]?.loanAppsCount} />
              ) : (
                "20000"
              )}
            </p>
          )}
        </ReactVisibilitySensor>
      )}
    </div>
  );
};
