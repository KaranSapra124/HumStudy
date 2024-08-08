import { useState, useEffect } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { LoadingMutatingDots } from '../../../components/Loadings';
import  dashboard  from '../../../dummyData.json';
import { Link } from 'react-router-dom';

export default function SalesTable() {
  const [data, setData] = useState(dashboard?.sales?.categories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="lg:col-span-5 col-span-12 shadow-md shadow-gray-200 bg-white rounded-md">
        {isLoading ? (
          <LoadingMutatingDots className='pb-10 pt-10' />
        ) : (
          <div className="text-gray-600 rounded p-4 my-5 text-[13px] bg-white">
            {data?.length > 0 ? (
              <div>
                <div className="w-full overflow-x-auto">
                  <table className="table w-full border-gray-400">
                    <thead className="bg-gray-100 p-2">
                      <tr>
                        <th className="py-3 relative border border-gray-200 whitespace-nowrap px-5">
                          S.No.
                        </th>
                        <th className="py-3 relative border border-gray-200 whitespace-nowrap px-5">
                          Name
                        </th>
                        <th className="py-3 relative border border-gray-200 whitespace-nowrap px-5">
                          No of Sales
                        </th>
                        <th className="py-3 relative border border-gray-200 whitespace-nowrap px-5">
                          Total Sales
                        </th>
                        <th className="py-3 relative border border-gray-200 whitespace-nowrap px-5">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, i) => (
                        <tr
                          key={i}
                          className={`hover:bg-gray-200 transition-all duration-300 ease-in-out h-[30px]`}
                        >
                          <td className="text-center p-2 border whitespace-nowrap border-gray-200">
                            {i + 1}
                          </td>
                          <td className="text-center p-2 border whitespace-nowrap border-gray-200">
                            {item.name}
                          </td>
                          <td className="text-center p-2 border whitespace-nowrap border-gray-200">
                            {item.salesNum}
                          </td>
                          <td className="text-center p-2 border whitespace-nowrap border-gray-200">
                            {item.totalSales}
                          </td>
                          <td className="text-center p-2 border whitespace-nowrap border-gray-200">
                            <div className="flex items-center justify-center">
                              <Link
                                to={`/admin/${item.name.toLowerCase()}`}
                                className="p-2 rounded-md border-primary bg-transparent text-primary hover:text-white hover:bg-tl_primary transition-all duration-300"
                              >
                                <BsEyeFill />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-center">No data at this moment</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
