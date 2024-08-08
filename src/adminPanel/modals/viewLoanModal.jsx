import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import Modal from "../../components/modals/Modal";
import LoanDetailsModal from "./LoanDetailsModal";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export default function ViewLoanModal({ setIsModal, item }) {
  const [modal, setModal] = useState(true);
  const [isShowLoanModal, setIsShowLoanModal] = useState(false);
  const [viewedImage, setViewedImage] = useState(null); // State for the currently viewed image

  const { userId, loanId, loanStatus } = item;

  return (
    <>
      {isShowLoanModal && (
        <LoanDetailsModal
          loanDetail={userId?.loanDetails}
          setIsModal={setIsShowLoanModal}
        />
      )}
      <Modal setIsModal={setIsModal} modal={modal}>
        <div className="p-4">
          <h3 className="mb-4">User Details</h3>
          <hr />
          <div className="mb-3 d-flex justify-content-between">
            <h4>
              Name:{" "}
              <span className="fw-normal">
                {userId?.fName} {userId?.lName}
              </span>
            </h4>
            <div className="d-flex justify-content-around align-items-center">
              <h4>Loan Details:</h4>
              <span>
                {" "}
                <PlagiarismIcon
                  onClick={() => setIsShowLoanModal(true)}
                  style={{ cursor: "pointer" , color:"#5D0CFD" }}
                />
              </span>
            </div>
          </div>
          <div className="mb-3">
            <h4>
              Email: <span className="fw-normal">{userId?.email}</span>
            </h4>
          </div>
          <div className="mb-3">
            <h4>
              Phone Number:{" "}
              <span className="fw-normal">{userId?.phoneNumber}</span>
            </h4>
          </div>
          <div className="mb-3">
            <h4>
              Gender: <span className="fw-normal">{userId?.gender}</span>
            </h4>
          </div>
          <div className="mb-4">
            <h4>Aptitude Exams:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userId?.aptitudeExams?.aptitudeExam}</td>
                  <td>{userId?.aptitudeExams?.aptitudeExamScore}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="mb-4">
            <h4>English Test:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userId?.englishTest?.englishExam}</td>
                  <td>{userId?.englishTest?.englishExamScore}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* <div className="d-flex justify-content-end mt-5">
            <Button variant="secondary" onClick={() => setModal(false)}>
              Close
            </Button>
          </div> */}
        </div>
      </Modal>
    </>
  );
}
