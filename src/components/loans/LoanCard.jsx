import React, { useContext, useState } from "react";
import "./loanCard.css";
import { Modal } from "antd";
import { Button } from "react-bootstrap";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EvaluateForm from "./EvaluateForm";
import CallIcon from "@mui/icons-material/Call";
import { FILE_PATH } from "../../utils/apiConfig";
import { MainSiteContext } from "../../context/MainSiteContext";
import { toast } from "react-toastify";

function LoanCard(props) {
  const { state } = useContext(MainSiteContext);
  const { profile } = state;
  const loanDetails = profile?.loanDetails;
  const { loanData } = props;
  const [evaStep, setEvaStep] = useState(0);
  const [knowStep, setKnowStep] = useState(0);
  const [isCallModelOpen, setIsCallModelOpen] = useState(false);
  const [isGetEvaModalOpen, setIsGetEvaModalOpen] = useState(false);
  const [isKnowMoreModalOpen, setIsKnowMoreModalOpen] = useState(false);
  // console.log(props, "PROPS");
  const nextStep = (name) => {
    if (name === "eva") setEvaStep(evaStep + 1);
    else setKnowStep(knowStep + 1);
  };

  const knowMoreFinish = () => {
    setIsKnowMoreModalOpen(false);
    setKnowStep(0);
  };
  const renderGetEvaDiv = () => {
    switch (evaStep) {
      case 0:
        return (
          <div className="avail-card card">
            <div className="avail-card-top">
              <h2>Get Ready to avail Loan</h2>
              <h5>Prepare your documents </h5>
            </div>
            <img src="assets/images/docs.png" alt="docs" />
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("eva")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="reqDocs-card card">
            <div className="reqDocs-card-top">
              <h2>Required Documents</h2>
              <ul>
                <li>Academic & Offer letter</li>
                <li>Passport</li>
              </ul>
            </div>
            <img src="assets/images/checklistt.png" alt="docs" />
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("eva")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="reqDocs-card card">
            <EvaluateForm
              goToFirstStep={setEvaStep}
              closeModel={setIsGetEvaModalOpen}
              loanDetail={props}
            />
          </div>
        );
      default:
        return null; // Default case or when caseValue is not 0 or 2
    }
  };
  const renderKnowMoreDiv = () => {
    switch (knowStep) {
      case 0:
        return (
          <div className="avail-card card">
            <div className="avail-card-top">
              <h2>Know Everything Quickly</h2>
            </div>
            <img src="assets/images/know.png" alt="docs" />
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("know")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="reqDocs-card knowMore-card card">
            <div className="reqDocs-card-top">
              <h2>What is floating interest ?</h2>
            </div>
            <p>
              A floating interest rate is a variable interest rate that changes
              over time. It's also known as a variable, flexible, or adjustable
              interest rate.
            </p>
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("know")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="reqDocs-card knowMore-card card">
            <div className="reqDocs-card-top">
              <h2>Bank Interest Rate</h2>
            </div>
            <p>
              Interest rates can change, and you can negotiate with banks; the
              interest rate can also decrease based on your profile.
            </p>
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("know")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="reqDocs-card knowMore-card card">
            <div className="reqDocs-card-top">
              <h2>Bank Processing Fee</h2>
            </div>
            <p>
              Bank processing is an official fee for processing your loan that
              banks charge to every student. Some banks charge a percentage of
              your loan amount, while others charge a specific amount with GST.
            </p>
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("know")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="reqDocs-card knowMore-card card">
            <div className="reqDocs-card-top">
              <h2>Secured and Unsecured</h2>
            </div>
            <p>
              Some banks, including SBI and Bank of India, only provide secured
              loans for amounts exceeding 7.5 lakh. In secured loans, you have
              to provide a guarantee, while unsecured loans may or may not
              require it, depending on the bank.
            </p>
            <Button
              className=" nextBtn loan-nextBtn"
              onClick={() => nextStep("know")}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="reqDocs-card knowMore-card card">
            <div className="reqDocs-card-top">
              <h2>All Done</h2>
            </div>
            <img src="assets/images/done.png" alt="done" />
            <Button className="nextBtn loan-nextBtn" onClick={knowMoreFinish}>
              Finish <ChevronRightIcon />
            </Button>
          </div>
        );

      default:
        return null; // Default case or when caseValue is not 0 or 2
    }
  };
  const showGetEvaModal = () => {
    if (profile.education.length == 0) {
      return toast.error("Complete Your Education Details First!");
    } else {
      if (profile.loansApplied.find((elem) => elem == loanData._id)) {
        return toast.error("You have already applied for it!");
      } else {
        setIsGetEvaModalOpen(true);
      }
    }
  };
  const handleGetEvaOk = () => {
    setIsGetEvaModalOpen(false);
  };
  const handleGetEvaCancel = () => {
    setIsGetEvaModalOpen(false);
    setEvaStep(0);
  };

  const showKnowMoreModal = () => {
    setIsKnowMoreModalOpen(true);
  };
  const handleKnowMoreOk = () => {
    setIsKnowMoreModalOpen(false);
    setKnowStep(0);
  };
  const handleKnowMoreCancel = () => {
    setIsKnowMoreModalOpen(false);
    setEvaStep(0);
  };
  const showCallModal = () => {
    setIsCallModelOpen(true);
  };
  const handleCallOk = () => {
    setIsCallModelOpen(false);
  };
  const handleCallCancel = () => {
    setIsCallModelOpen(false);
  };

  return (
    <div className="col-12 col-lg-6 mt-2 mt-lg-4">
      <div className="loan-card card">
        <div className="loan-card-top-bar">
          <img src={`${FILE_PATH}${props.bankImage}`} alt="loan" />
          <h5>{props.bankName}</h5>
        </div>
        <div className="loan-card-middle-bar d-flex justify-content-evenly">
          <div>
            <div>
              <h6>Expected Return</h6>
              {console.log(props)}
              <p>
                {loanData?.expectedInterestRate?.from ==
                loanData?.expectedInterestRate?.to
                  ? loanData?.expectedInterestRate?.from + "%"
                  : loanData?.expectedInterestRate?.from +
                    "% - " +
                    loanData?.expectedInterestRate?.to +
                    "%"}
              </p>
            </div>
            <div>
              <h6>Interest Rate Type</h6>
              <p>{props.interestRateType}</p>
            </div>
          </div>
          <div>
            <div>
              <h6>Bank Processing Fee</h6>
              <p>
                {loanData?.processingFee?.type == "number"
                  ? "₹ " + loanData?.processingFee?.from
                  : loanData?.processingFee?.from +
                    "% - " +
                    loanData?.processingFee?.to +
                    "%"}
                {loanData?.processingFee?.withGST ? " + plus GST" : ""}
              </p>
            </div>
            <div>
              <h6>Collatral</h6>
              <p>Rs {props.collatral}</p>
            </div>
          </div>
        </div>
        {/* <div className="loan-card-bottom-bar">
        <h6>Bank Processing Fee</h6>
        <p>Rs 5000</p>
      </div> */}

        <div className="loan-card-buttons">
          {/* {console.log(loanData,"LOANDATA",loanDetails)} */}
          {loanData?.cibilScore?.to <= profile?.loanDetails?.cibilScore ? (
            <button
              className="evaluate-btn col-12 col-md-6 mt-2"
              onClick={showGetEvaModal}
            >
              Get Evaluation
            </button>
          ) : (
            <button
              onClick={showCallModal}
              className="evaluate-btn col-12 col-md-6 mt-2"
            >
              Call Now
            </button>
          )}
          <button
            className="know-more-btn col-12 col-md-5 mt-2"
            onClick={showKnowMoreModal}
          >
            Know More
          </button>
          {!props.eligible && <p>*You may not be eligible for this</p>}
        </div>
        <Modal
          zIndex={99999}
          className="loan-model"
          centered={true}
          footer={null}
          open={isGetEvaModalOpen}
          onOk={handleGetEvaOk}
          onCancel={handleGetEvaCancel}
        >
          {renderGetEvaDiv()}
        </Modal>
        <Modal
          zIndex={99999}
          className="loan-model"
          centered={true}
          footer={null}
          open={isKnowMoreModalOpen}
          onOk={handleKnowMoreOk}
          onCancel={handleKnowMoreCancel}
        >
          {renderKnowMoreDiv()}
        </Modal>
        <Modal
          zIndex={99999}
          className="loan-model"
          centered={true}
          footer={null}
          open={isCallModelOpen}
          onOk={handleCallOk}
          onCancel={handleCallCancel}
        >
          <div className="call-div">
            <h4>Please call us at :</h4>
            <h5 className="mt-3">
              {" "}
              <CallIcon /> 9978457895
            </h5>
            <h5>
              {" "}
              <CallIcon /> 9978457895
            </h5>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default LoanCard;
