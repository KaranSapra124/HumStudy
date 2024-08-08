import { Table } from "react-bootstrap";
import Modal from "../../components/modals/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const LoanDetailsModal = ({ loanDetail, setIsModal }) => {
  const modalStyle = {
    zIndex: 99999,
  };

  return (
    <>
      <Modal setIsModal={setIsModal} modalStyles={modalStyle}>
        <div className="p-4">
          <h3 className="mb-3">Loan Details</h3>
          <hr />
          <h4 className="mb-3">
            Applied Country: <span className="fw-normal">{loanDetail?.countries[0]}</span>
          </h4>
          <h4 className="mb-3">
            Planned University: <span className="fw-normal">{loanDetail?.plannedUniversity}</span>
          </h4>
          <h4 className="mb-3">
            Status Of Admission: <span className="fw-normal">{loanDetail?.statusOfAdmission}</span>
          </h4>
          <div className="mb-4">
            <h4>Academic Exam:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{loanDetail?.academicExam}</td>
                  <td>{loanDetail?.academicExamScore}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="mb-4">
            <h4>Aptitude Exam:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{loanDetail?.lastExam}</td>
                  <td>{loanDetail?.lastExamScore}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="mb-4">
            <h4>English Exam:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{loanDetail?.englishExam}</td>
                  <td>{loanDetail?.englishExamScore}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="mb-4">
            <h4>Cibil Score:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Cibil Score Of</th>
                  <th>Cibil Score</th>
                  <th>Job Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{loanDetail?.cibilOf}</td>
                  <td>{loanDetail?.cibilScore}</td>
                  <td>{loanDetail?.jobType}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <h4>Previous Loan Status:</h4>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Loan Before</th>
                  <th>Loan Active</th>
                  <th>Previous Loan Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{loanDetail?.loanBefore === "na" ? "N/A" : loanDetail?.loanBefore}</td>
                  <td>{loanDetail?.loanActive ? "Yes" : "No"}</td>
                  <td>{loanDetail?.previousLoanType !== "" ? loanDetail?.previousLoanType : "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoanDetailsModal;
