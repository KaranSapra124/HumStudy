import React, { useEffect, useState } from "react";
import "./Loans.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LoansFilter from "./LoansFilter";
import SortBar from "../ui/SortBar";
import "./loanCard.css";
import LoanCard from "./LoanCard";
import { Button, Modal } from "antd";
import { Pagination } from "../Pagination/pagination";
import LoginDiv from "../ui/LoginDiv";
import { userMethod } from "../../userMethods/userMethod";

const loanSortValues = ["Recommended", "Cheapest", "Rating"];

function Loans() {
  const [sortItem, setSortItem] = useState(1);
  const [loan, setLoan] = useState([]);
  const [filter, showFilter] = useState(false);
  const [login, setLogin] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [currItems, setCurrItems] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(6);

  const nPages = Math.ceil(loan?.total / recordsPerPage);

  const indexOfLastItem = currPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;

  const handleCancel = () => {
    setLogin(false);
  };

  useEffect(() => {
    userMethod(
      `/get-loans?pages=${currPage}&pageSize=${recordsPerPage}`,
      null,
      setLoan
    );
  }, [currPage, recordsPerPage]);

  const handleApplyFilters = (item) => {
    userMethod("/filter-loan", item, setLoan, null);
    // console.log(item);
  };

  useEffect(() => {
    setCurrItems(() =>
      loan?.loansData?.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [currPage, recordsPerPage]);

  // useEffect(() => console.log(loan,'LOANS'), [loan]);

  return (
    <div className="loans-section" style={{ marginTop: "5rem" }}>
      <div className="loans container-xl">
        <div className="row">
          <div className="col-0 col-sm-0 col-md-4 col-lg-3 px-4">
            {/* <AccommodationSearchFilter filter={filter} /> */}
            <LoansFilter
              setLogin={setLogin}
              filter={filter}
              handleChangeFilters={handleApplyFilters}
            />
            <Modal onCancel={handleCancel} footer={null} open={login}>
              <LoginDiv />
            </Modal>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9">
            <div className="accommodationSearch-results">
              {/* <SortBar sortValues={loanSortValues} /> */}
              <div className="filter-tag-bar">
                <h5 onClick={() => showFilter(!filter)} className="filter-tag">
                  <FilterAltIcon /> Filter
                </h5>
              </div>

              <div className="row">
                {loan?.loansData?.map((elem) => {
                  return (
                    <LoanCard
                      loanData={elem}
                      bankImage={elem?.bankImage}
                      eligible={true}
                      bankName={elem?.bankName}
                      expectedReturn={`${elem?.expectedInterestRate?.from}%-${elem?.expectedInterestRate?.to}%`}
                      interestRateType="Floating"
                      bankProcessingFee={elem?.processingFee?.to}
                      collatral={`${elem?.withCollateral?.minAmount} Lakhs`}
                    />
                  );
                })}
                <Pagination
                  currentPage={currPage}
                  nPages={nPages}
                  setCurrentPage={setCurrPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loans;
