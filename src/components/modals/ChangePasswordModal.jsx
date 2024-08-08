import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function ChangePasswordModal({ saveFunc, setIsModal }) {
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [modal, setModal] = useState(true);

  const handleSave = () => {
    if (pass && confirmPass && pass === confirmPass) {
      setMsg("");
      saveFunc(oldPass, pass);
      setModal(false);
    } else {
      setMsg("Password values should be valid and equal");
    }
  };

  return (
    <Modal setIsModal={setIsModal} modal={modal}>
      <h2>Change Password</h2>
      <div className="flex flex-col gap-6 p-4 sm:p-8 sm:text-base text-[.7rem] text-gray-700">
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="oldPass">Old Password:</label>
          <input
            type="password"
            name="oldPass"
            id="OldPass"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          />
        </div>
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="pass">New Password:</label>
          <input
            type="password"
            name="pass"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          />
        </div>
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="confirmPass">Confirm Password:</label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          />
        </div>
        {msg && <p className="text-red-600 text-center">{msg}</p>}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setModal(false)}
            className="p-2 bg-gray-200 font-bold hover:text-white hover:bg-gray-400 rounded-md transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="p-2 bg-indigo_1 border border-indigo_1 text-white font-bold hover:bg-indigo-500 rounded-md transition-all duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
