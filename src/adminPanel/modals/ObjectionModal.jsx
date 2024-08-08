import { useState } from "react";
import Modal from "../../components/modals/Modal";
import { Select } from "antd";
import { NormalInput } from "../../components/inputs/ModalInputs";

export default function ObjectionModal({ setIsModal, editItem, files }) {
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    documents: "",
    message: "",
  });
  const handleChange = (name, val) => {
    if (!name) return;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <Modal setIsModal={setIsModal} modal={modal} modalStyles={{ zIndex:1900  }}>
      <h2> User Details</h2>
      <div className="h-full w-full p-9">
        <div className="flex mb-3 flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="payer"> Document:</label>
          <div className="flex-grow md:max-w-[70%]">
            <Select
              size="large"
              placeholder="Select Documents"
              optionFilterProp="children"
              value={formData?.documents}
              style={{ width: "100%" }}
              onChange={(val) => handleChange("documents", val)}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={files}
            />
          </div>
        </div>
        <NormalInput
          type={"text"}
          label={"Message"}
          inputId={"message"}
          inputState={formData?.message}
          setInputState={(val) => handleChange("message", val)}
        />
        
      </div>
    </Modal>
  );
}
