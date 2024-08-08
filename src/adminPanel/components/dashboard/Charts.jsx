import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { LoadingMutatingDots } from '../../../components/Loadings';

export const SalesChart = () => {
  const [period, setPeriod] = useState(7);
  const [data, setData] = useState(getRandomDailySales(period));
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    chart: {
      id: 'area-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: getLastDates(period),
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
  };
  const chartSeries = [
    {
      name: 'Sales',
      data,
      colors: ['#bf69c2', '#bf69c2'],
    },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="lg:col-span-7 col-span-12 shadow-md shadow-gray-300 bg-white rounded-md">
      {isLoading ? (
        <LoadingMutatingDots className="pt-10 pb-10" />
      ) : (
        <ReactApexChart
          options={options}
          series={chartSeries}
          type="area"
          width={'100%'}
          height={300}
        />
      )}
    </div>
  );
}

export const TrafficChart = () => {
   const [period, setPeriod] = useState(7);
   const [data, setData] = useState(getRandomDailySales(period));
   const [isLoading, setIsLoading] = useState(true);
   const options = {
     chart: {
       id: 'area-chart',
       toolbar: {
         show: false,
       },
     },
     xaxis: {
       categories: getLastDates(period),
     },
     stroke: {
       curve: 'smooth',
     },
     dataLabels: {
       enabled: false,
     },
     grid: {
       show: false,
     },
   };
   const chartSeries = [
     {
       name: 'Sales',
       data,
       colors: ['#bf69c2', '#bf69c2'],
     },
   ];

   useEffect(() => {
     const timeoutId = setTimeout(() => {
       setIsLoading(false);
     }, 1500);

     return () => clearTimeout(timeoutId);
   }, []);

   return (
     <div className="lg:col-span-7 col-span-12 shadow-md shadow-gray-300 bg-white rounded-md">
       {isLoading ? (
         <LoadingMutatingDots className="pt-10 pb-10" />
       ) : (
         <ReactApexChart
           options={options}
           series={chartSeries}
           type="area"
           width={'100%'}
           height={300}
         />
       )}
     </div>
   );
}

const getRandomDailySales = (num = 400, min = 1000, max = 10000) =>
  Array.from({ length: num }).map((_) => Math.floor(Math.random() * max) + min);

const getLastDates = (days) => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - days);

  const dates = [];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(lastWeek);
    currentDate.setDate(lastWeek.getDate() + i);

    // Format date to short form of month
    const formattedDate = `${currentDate.getDate()} ${new Intl.DateTimeFormat(
      'en-US',
      { month: 'short' }
    ).format(currentDate)}`;

    dates.push(formattedDate);
  }

  return dates;
};
