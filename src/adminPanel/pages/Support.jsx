import { useState, useContext, useMemo, useEffect } from "react";
import { BsFillEyeFill, BsPencilFill } from "react-icons/bs";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { AppContext, ACTIONS } from "../../context/AppContext";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import AdminLayout from "../components/AdminLayout";
import { LoadingMutatingDots } from "../../components/Loadings";
import { format } from "date-fns";
import SupportModal from "../modals/SupportModal";
import ConfirmModal from "../../components/modals/ConfirmDeleteModal";
import ViewSupportModal from "../modals/ViewSupportModal";
import {
  fetchAllData,
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
} from "../methods/commonMethod";

export default function Page() {
  // const {
  //   state: { support, users },
  //   dispatch,
  // } = useContext(AppContext);
  const [support, setSupport] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [isAddSupportModal, setIsAddSupportModal] = useState(false);
  const [isEditSupportModal, setIsEditSupportModal] = useState(false);
  const [isViewSupportModal, setIsViewSupportModal] = useState(false);
  const [isDeleteSupportModal, setIsDeleteSupportModal] = useState(false);
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
    { columns, data: support, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const [filterInput, setFilterInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserName, setSelectedUserName] = useState("");

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setIsViewSupportModal(true);
  };
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditSupportModal(true);
  };
  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteSupportModal(true);
  };

  const addFunc = (item) => {
    console.log(item);
    handleAddItem(item, "support/add-support", setSupport);
  };
  const editFunc = (newItem) => {
    handleEditItem(
      newItem,
      `support/edit-support/${selectedItem._id}`,
      setSupport
    );
  };
  const deleteFunc = () => {
    handleDeleteItem(`support/delete-support/${selectedItem._id}`, setSupport);
  };
  const addReplyFunc = (reply) => {
    // dispatch({
    //   type: ACTIONS.ADD_SUPPORT_REPLY,
    //   payload: { _id: selectedItem._id, reply },
    // });
  };

  const handleRowCheck = (e) => {
    if (e.target?.checked) {
      e.target?.parentNode.parentNode.classList.add("bg-blue-100");
      e.target?.parentNode.parentNode.classList.remove("hover:bg-gray_1");
    } else {
      e.target?.parentNode.parentNode.classList.add("hover:bg-gray_1");
      e.target?.parentNode.parentNode.classList.remove("bg-blue-100");
    }
  };

  useEffect(() => {
    if (selectedItem)
      setSelectedItem(support.filter((sup) => sup.id === selectedItem.id)[0]);
  }, [support]);

  useEffect(() => fetchAllData("users/get", setUsers, setIsLoading), []);
  useEffect(
    () => fetchAllData("support/get-support", setSupport, setIsLoading),
    []
  );

  useEffect(() => console.log(users), [users]);
  useEffect(() => console.log(support), [support]);

  useEffect(() => {
    const user = users.find((item) => item._id == selectedItem?.userId);
    setSelectedUserName(user ? user.fName + " " + user.lName : "");
  }, [selectedItem]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isAddSupportModal && (
        <SupportModal
          saveFunc={addFunc}
          setIsModal={setIsAddSupportModal}
          view={"add"}
          users={users.map((item) => ({
            _id: item._id,
            name: item.fName + " " + item.lName,
          }))}
        />
      )}
      {isEditSupportModal && (
        <SupportModal
          editItem={selectedItem}
          saveFunc={editFunc}
          view={"edit"}
          setIsModal={setIsEditSupportModal}
          addReplyFunc={addReplyFunc}
          users={users.map((item) => ({
            _id: item._id,
            name: item.fName + " " + item.lName,
          }))}
        />
      )}
      {isViewSupportModal && (
        <ViewSupportModal
          setIsModal={setIsViewSupportModal}
          item={selectedItem}
          addReplyFunc={addReplyFunc}
          userName={selectedUserName}
        />
      )}
      {isDeleteSupportModal && (
        <ConfirmModal
          heading={`Delete Enquiry from user - ${selectedUserName} ?`}
          func={deleteFunc}
          setIsModal={setIsDeleteSupportModal}
        />
      )}
      <AdminLayout>
        <div>
          <h2 className="md:text-[32px] text-[24px] text-gray-500">Support</h2>
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
                    placeholder={"Search in Table"}
                    className="border border-gray-100 p-2 px-4 rounded-full outline-none  flex-grow md:max-w-[200px] self-end"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={() => setIsAddSupportModal(true)}
                  className="px-3 py-2 border-primary bg-tl_primary text-white hover:bg-gray-200 hover:text-tl_primary border-2 transition-all duration-300 rounded-full"
                >
                  + Add New
                </button>
              </div>
            </div>
            <div>
              <div className="w-[100%] overflow-x-auto">
                <table
                  {...getTableProps()}
                  className="table w-[100%] border border-gray-400"
                >
                  <thead className="text-black bg-gray_2 p-2">
                    {headerGroups.map((headerGroup, i) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                        {headerGroup.headers.map((column, i) => (
                          <th
                            {...column.getHeaderProps()}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            key={i}
                            className="py-3 relative border border-gray_3 whitespace-nowrap px-5"
                          >
                            {column.render("Header")}
                            <span className="absolute top-[50%] right-1 -translate-y-2/4">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <BiSolidDownArrow />
                                ) : (
                                  <BiSolidUpArrow />
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {support.length !== 0 ? (
                      page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={i}
                            className={`hover:bg-gray_1 transition-all duration-300 ease-in-out`}
                          >
                            {row.cells.map((cell, i) => {
                              if (cell.column.id === "actions")
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="p-2 border border-gray-200"
                                  >
                                    <div className="flex justify-center items-center gap-2 ">
                                      <button
                                        type="button"
                                        onClick={() => handleView(row.original)}
                                        className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-tl_primary_2 hover:text-white"
                                      >
                                        <BsFillEyeFill />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleEdit(row.original)}
                                        className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-tl_primary_2 hover:text-white"
                                      >
                                        <BsPencilFill />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDelete(row.original)
                                        }
                                        className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-tl_primary_2 hover:text-white"
                                      >
                                        <AiFillDelete />
                                      </button>
                                    </div>
                                  </td>
                                );
                              else if (cell.column.id === "checkbox")
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray_200"
                                  >
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      onChange={handleRowCheck}
                                    />
                                  </td>
                                );
                              else if (cell.column.id === "date")
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray_200"
                                  >
                                    {format(new Date(cell.value), "dd/MM/yy")}
                                  </td>
                                );
                              else if (cell.column.id === "name")
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-1 border border-gray_200"
                                  >
                                    {(() => {
                                      const user = users.find(
                                        (item) => item._id === cell.value
                                      );
                                      if (user)
                                        return user.fName + " " + user.lName;
                                      else return "N/A";
                                    })()}
                                  </td>
                                );
                              else
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    key={i}
                                    className="text-center p-2 border border-gray-200"
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                );
                            })}
                          </tr>
                        );
                      })
                    ) : (
                      <p className="text-center">No Support Data Found!</p>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-3">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="p-2 border-2 disabled:bg-gray-100 rounded-md bg-blue-100 disabled:cursor-not-allowed"
                  >
                    <AiOutlineLeft />
                  </button>
                  <span>
                    Page {pageIndex + 1} of {pageCount}
                  </span>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="p-2 border-2 disabled:bg-gray-100 rounded-md bg-grayblue_1 disabled:cursor-not-allowed"
                  >
                    <AiOutlineRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}

const COLUMNS = [
  {
    Header: "#",
    accessor: "",
    id: "checkbox",
  },
  {
    Header: "S. No.",
    accessor: (_, index) => index + 1 + ".",
    id: "sno",
  },
  {
    Header: "User ID",
    accessor: "userId",
  },
  {
    Header: "Name",
    accessor: "userId",
    id: "name",
  },
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Date",
    accessor: "createdAt",
    id: "date",
  },
  {
    Header: "Actions",
    accessor: "actions",
    id: "actions",
  },
];
