import { useState, useEffect } from 'react';
import Modal from '../../components/modals/Modal';
import { NormalInput } from '../../components/inputs/ModalInputs';
import InputWithSearch from '../../components/inputs/InputWithSearch';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { fetchAllData } from '../methods/commonMethod';
import {format} from "date-fns"
export default function PaymentModal({
  saveFunc,
  setIsModal,
  view = 'add',
  editItem,
}) {
 
  const [users,setUsers]=useState([])
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({});

  const updateNestedData = (data, keys, value) => {
    const [currentKey, ...remainingKeys] = keys;

    if (!remainingKeys.length) {
      return {
        ...data,
        [currentKey]: value,
      };
    }
    return {
      ...data,
      [currentKey]: updateNestedData(data[currentKey], remainingKeys, value),
    };
  };

  const handleDataChange = (name = null, value) => {
    if (!name) return;
    if (name.includes('.')) {
      const keys = name.split('.');
      setData((prev) => updateNestedData(prev, keys, value));
    } else
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSelectPayerName = (val) => {
    const [name, email] = val.split(' | ');
    handleDataChange('payer.name', name);
    handleDataChange('payer.email', email);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newData = {
      ...editItem,
      ...data,
      payer:data?.payer?._id
      
    };
    // console.log(newData)
    saveFunc(newData);
    setModal(false);
  };
  const putValues = () => {
    setData(editItem);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (view === 'edit') putValues();
  }, []);
  useEffect(()=>{
    fetchAllData("users/get",setUsers,()=>{})

  
  },[])

  return (
    <Modal setIsModal={setIsModal} modal={modal}>
      <h2>{view === 'edit' ? 'Edit' : 'Add'} Payment Details</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="payer">Payer:</label>
          <div className="flex-grow md:max-w-[70%]">
            <InputWithSearch
              options={users?.map((item) => ({
                _id: item._id,
                name: `${item.fName} ${item.lName} | ${item.email}`,
              }))}
              selectedOpt={
                data?.payer?.name
                  ? `${data.payer.name} | ${data?.payer?.email}`
                  : ''
              }
              setSelectedOpt={(val) => handleSelectPayerName(val)}
              setSelectedOptId={(val) => handleDataChange('payer._id', val)}
            />
          </div>
        </div>
        <NormalInput
          type={'text'}
          label={'Payment ID'}
          inputId={'paymentId'}
          inputState={data?.paymentId}
          setInputState={(val) => handleDataChange('paymentId', val)}
        />
        <NormalInput
          type={'number'}
          label={'Amount'}
          inputId={'amount'}
          inputState={data?.amount}
          setInputState={(val) => handleDataChange('amount', val)}
        />
        <NormalInput
          type={"date"}
          label={"Paid At"}
          inputId={"paidAt"}
          inputState={
            data.paidAt ? format(new Date(data?.paidAt), "yyyy-MM-dd") : ""
          }
          setInputState={(val) => setData({ ...data, paidAt: new Date( val )})}

         
        />

        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="paymentType">Payment type:</label>
          {console.log(data?.loanPurpose)}
          <select
            name="paymentType"
            id="paymentType"
            // defaultValue={data?.type}
            value={data?.type}
            onChange={(e) => handleDataChange('type', e.target.value)}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          >
            <option value="">-- Select Purpose --</option>
            <option value="Single">Single</option>
            <option value="Installment">Installment</option>
          </select>
        </div>

        <button
          type="submit"
          className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
