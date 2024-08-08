import { useEffect, useState } from "react";
import Modal from "../../components/modals/Modal";
import { Button, Accordion, Table } from "react-bootstrap";
import { NormalSelect } from "../components/ui/inputs/ModalInputs";
import { toast } from "react-toastify";
import { loanApplicationMethod } from "../methods/loanApplicationMethod";

export default function ViewLoanAppliedModal({ setIsModal, editItem }) {
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    loanId: editItem?.loan?._id,
    status: editItem?.loan?.loanStatus,
  });
  const [updateStatus, setUpdateStatus] = useState(true);
  const { loanId } = editItem.loan;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStatus = () => {
    loanApplicationMethod("/update-status", formData, null, null);
  };
  useEffect(() => console.log(formData), [formData]);

  useEffect(() => {
    console.log(loanId, editItem, "<><><>");
  }, [loanId]);

  return (
    <Modal
      setIsModal={setIsModal}
      modal={modal}
      modalStyles={{ padding: "1rem", overflow: "scroll" }}
    >
      <h4 className="p-2">Loan Details</h4>
      <hr />
      <div className="mb-3">
        <h4>
          Bank Name: <span>{loanId?.bankName}</span>
        </h4>
      </div>
      <div className="mb-3">
        <h4>Academic Score:</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Percent: {loanId.academicScore.from.percent}, CGPA:{" "}
                {loanId.academicScore.from.cgpa}
              </td>
              <td>
                Percent: {loanId.academicScore.to.percent}, CGPA:{" "}
                {loanId.academicScore.to.cgpa}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mb-3">
        <h4>Aptitude Exams:</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>GMAT</th>
              <th>GRE</th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Max: {loanId.aptitudeExams.GMAT.max}, Min:{" "}
                {loanId.aptitudeExams.GMAT.min}
              </td>
              <td>
                Max: {loanId.aptitudeExams.GRE.max}, Min:{" "}
                {loanId.aptitudeExams.GRE.min}
              </td>
              <td>
                Max: {loanId.aptitudeExams.SAT.max}, Min:{" "}
                {loanId.aptitudeExams.SAT.min}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mb-3">
        <h4>Cibil Score:</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loanId.cibilScore.from}</td>
              <td>{loanId.cibilScore.to}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mb-3">
        <h4>Expected Interest Rate:</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loanId.expectedInterestRate.from}</td>
              <td>{loanId.expectedInterestRate.to}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mb-3">
        <h4>Processing Fee:</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loanId?.processingFee?.from}</td>
              <td>{loanId?.processingFee?.to}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mb-3">
        <h4>Salary Range:</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loanId?.salary?.from}</td>
              <td>{loanId?.salary?.to}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Accordion className="mb-3" style={{ marginBottom: "1rem" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>With Collateral</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex justify-content-between">
              <span>Eligible: {loanId?.withCollateral?.eligible}</span>
              <span>Amount: {loanId?.withCollateral?.minAmount}</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="mt-2">
          <Accordion.Header>Without Collateral</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex justify-content-between">
              <span>
                Eligible:{" "}
                {loanId?.withoutCollateral?.eligible === false
                  ? "Not Eligible"
                  : loanId?.withoutCollateral?.eligible}
              </span>
              <span>Amount: {loanId?.withoutCollateral?.minAmount}</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* <div className="d-flex justify-content-end gap-4">
        <Button variant="secondary" onClick={() => setModal(false)}>
          Close
        </Button>
      </div> */}
      <div className="d-flex justify-around aling-items-center">
        <NormalSelect
          label="Loan Status"
          name="status"
          value={formData?.status}
          onChange={handleInputChange}
          options={options.status}
          optionType="object"
          optionValue="value"
        />
        <button className="bg-tl_primary h-fit mt-auto text-light m-2 p-1" style={{borderRadius:"5px"}} onClick={handleUpdateStatus}>
          Update
        </button>
      </div>
    </Modal>
  );
}

const options = {
  status: [
    { value: "pending", name: "pending" },
    { value: "rejected", name: "rejected" },
    { value: "accepted", name: "accepted" },
  ],
};
