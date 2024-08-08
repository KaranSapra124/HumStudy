import { useMemo, useState, useEffect } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { BsPencilFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import {
  BiSolidChevronLeft,
  BiSolidChevronRight,
  BiSolidDownArrow,
  BiSolidUpArrow,
} from 'react-icons/bi';
import AdminLayout from '../components/AdminLayout';
import ConfirmModal from '../../components/modals/ConfirmDeleteModal';
import { LoadingMutatingDots } from '../../components/Loadings';
import {
  fetchAllData,
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
} from '../methods/commonMethod';
import { useParams } from 'react-router-dom';
import CourseModal from '../modals/CourseModal';

export default function Courses() {
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [isAddCourseModal, setIsAddCourseModal] = useState(false);
  const [isEditCourseModal, setIsEditCourseModal] = useState(false);
  const [isDeleteCourseModal, setIsDeleteCourseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    state: { pageIndex },
    pageCount,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: courses,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const [filterInput, setFilterInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const handleRowCheck = (e) => {
    if (e.target?.checked) {
      e.target?.parentNode.parentNode.classList.add('bg-blue-50');
      e.target?.parentNode.parentNode.classList.remove('hover:bg-gray-200');
    } else {
      e.target?.parentNode.parentNode.classList.add('hover:bg-gray-200');
      e.target?.parentNode.parentNode.classList.remove('bg-blue-50');
    }
  };

  const handleAddCourse = (item) => {
    handleAddItem(
      {
        ...item,
        university: params.uniId,
        universityName: courses[0]?.universityName || '',
      },
      'course/create',
      setCourses
    );
  };

  const handleEditCourse = (item) => {
    handleEditItem(item, 'course/update/' + selectedItem._id, setCourses);
  };

  const handleDeleteCourse = () => {
    handleDeleteItem('course/delete/' + selectedItem._id, setCourses);
  };

  useEffect(() => {
    fetchAllData('course/get-by-uni/' + params.uniId, setCourses, setIsLoading);
  }, [params]);

  return (
    <>
      {isAddCourseModal && (
        <CourseModal
          saveFunc={handleAddCourse}
          setIsModal={setIsAddCourseModal}
        />
      )}
      {isEditCourseModal && (
        <CourseModal
          saveFunc={handleEditCourse}
          setIsModal={setIsEditCourseModal}
          view="edit"
          editItem={selectedItem}
        />
      )}
      {isDeleteCourseModal && (
        <ConfirmModal
          func={handleDeleteCourse}
          setIsModal={setIsDeleteCourseModal}
          heading={`Delete course "${selectedItem.courseName}" details?`}
        />
      )}
      <AdminLayout>
        <div>
          <h2 className="md:text-[24px] text-[18px] text-gray-500">
            {courses.length > 0
              ? `${courses.length} Courses by ${courses[0]?.universityName}`
              : 'Courses'}
          </h2>
        </div>
        {isLoading ? (
          <LoadingMutatingDots />
        ) : (
          <div className="shadow-md shadow-gray-400 text-gray-600 rounded p-4 my-5 text-[13px] bg-white">
            <div className="flex md:justify-between items-end flex-col-reverse md:flex-row gap-2 mb-8">
              <div className="flex gap-6 justify-between md:justify-normal md:w-auto w-[100%] flex-wrap">
                <div>
                  <select
                    type="number"
                    id="pageSize"
                    defaultValue={10}
                    onChange={(e) => setPageSize(+e.target.value)}
                    className="border border-gray-100 p-2 rounded-md outline-none  flex-grow max-w-[100px] justify-self-end"
                  >
                    <option value="5">Show 5</option>
                    <option value="10">Show 10</option>
                    <option value="20">Show 20</option>
                    <option value="50">Show 50</option>
                    <option value="100">Show 100</option>
                  </select>
                </div>
                <div>
                  <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={'Search in Table'}
                    className="border border-gray-100 p-2 px-4 rounded-full outline-none  flex-grow md:max-w-[200px] self-end"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={() => setIsAddCourseModal(true)}
                  className="px-3 py-2 border-primary bg-tl_primary text-white hover:bg-gray-200 hover:text-tl_primary border-2 transition-all duration-300 rounded-full"
                >
                  + Add New
                </button>
              </div>
            </div>
            {courses?.length > 0 ? (
              <div>
                <div className="w-full overflow-x-auto">
                  <table
                    {...getTableProps()}
                    className="table w-full border-gray-400"
                  >
                    <thead className="bg-gray-100 p-2">
                      {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                          {headerGroup.headers.map((column, i) => (
                            <th
                              {...column.getHeaderProps()}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              key={i}
                              className="py-3 relative border border-gray-200 whitespace-nowrap px-5"
                            >
                              {column.render('Header')}
                              <span className="absolute top-[50%] right-1 -translate-y-2/4">
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <BiSolidDownArrow />
                                  ) : (
                                    <BiSolidUpArrow />
                                  )
                                ) : (
                                  ''
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={i}
                            className={`hover:bg-gray-200 transition-all duration-300 ease-in-out`}
                          >
                            {row.cells.map((cell, i) => {
                              if (cell.column.id === 'actions')
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="p-2 border border-gray-200"
                                  >
                                    <div className="flex justify-center items-center gap-2">
                                      <button
                                        type="button"
                                        title="Edit"
                                        onClick={() => {
                                          setSelectedItem(row.original);
                                          setIsEditCourseModal(true);
                                        }}
                                        className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-tl_primary_2 hover:text-white"
                                      >
                                        <BsPencilFill />
                                      </button>
                                      <button
                                        type="button"
                                        title="Delete"
                                        onClick={() => {
                                          setSelectedItem(row.original);
                                          setIsDeleteCourseModal(true);
                                        }}
                                        className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-red-400 hover:text-white"
                                      >
                                        <AiFillDelete />
                                      </button>
                                    </div>
                                  </td>
                                );
                              else if (cell.column.id === 'checkbox')
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray-200"
                                  >
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      onChange={handleRowCheck}
                                    />
                                  </td>
                                );
                              else if (cell.column.id.includes('link-trunc-'))
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray-200 whitespace-nowrap"
                                  >
                                    <a
                                      href={row.original.courseLink}
                                      target="_blank"
                                      title={cell.value}
                                      className="text-blue-500"
                                    >
                                      {cell.value.length >
                                      +cell.column.id.split('-')[2]
                                        ? cell.value.slice(
                                            0,
                                            +cell.column.id.split('-')[2]
                                          ) + '...'
                                        : cell.value}
                                    </a>
                                  </td>
                                );
                              else if (cell.column.id === 'courses')
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray-200"
                                  >
                                    {cell.value?.length || 'N/A'}
                                  </td>
                                );
                              else if (cell.column.id === 'fee')
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray-200"
                                  >
                                    {cell.value}{' '}
                                    {row.original.tuitionFeeOverallCurrency}
                                  </td>
                                );
                              else if (cell.column.id === 'img')
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray-200"
                                  >
                                    <div className="w-[50px] h-[50px] mx-auto">
                                      {cell.value ? (
                                        <img
                                          src={cell.value}
                                          alt="Image"
                                          className="h-full w-full object-contain"
                                        />
                                      ) : (
                                        'N/A'
                                      )}
                                    </div>
                                  </td>
                                );
                              else
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-2 border whitespace-nowrap border-gray-200"
                                  >
                                    {cell.render('Cell')}
                                  </td>
                                );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-3">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className="p-1 border-2 disabled:bg-gray-100 rounded-md bg-blue-50 disabled:cursor-not-allowed"
                    >
                      <BiSolidChevronLeft />
                    </button>
                    <span>
                      Page {pageIndex + 1} of {pageCount}
                    </span>
                    <button
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      className="p-1 border-2 disabled:bg-gray-100 rounded-md bg-blue-50 disabled:cursor-not-allowed"
                    >
                      <BiSolidChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center my-10 bg-gray-100 text-gray-400 font-[500] w-fit mx-auto p-3">
                Add Courses to see here
              </p>
            )}
          </div>
        )}
      </AdminLayout>
    </>
  );
}

const COLUMNS = [
  {
    Header: '#',
    accessor: '',
    id: 'checkbox',
  },
  {
    Header: 'S. No.',
    accessor: (_, index) => index + 1 + '.',
    id: 'sno',
  },
  {
    Header: 'Name',
    accessor: 'courseName',
    id: 'link-trunc-40',
  },
  {
    Header: 'Level',
    accessor: 'level',
  },
  {
    Header: 'Major',
    accessor: 'major',
  },
  {
    Header: 'Tution Fee',
    accessor: 'tutionFeeOverall',
    id: 'fee',
  },
  {
    Header: 'Duration',
    accessor: 'duration',
  },
  // {
  //   Header: 'Scholarships',
  //   accessor: 'scholarships',
  // },
  {
    Header: 'Actions',
    accessor: 'actions',
    id: 'actions',
  },
];
