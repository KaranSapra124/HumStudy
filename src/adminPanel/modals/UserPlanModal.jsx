import { useState } from "react";
import Modal from "../../components/modals/Modal";
const addOnServices = [
  {
    heading: "Add Loan Assistance",
    description: "Interest rate starts from 8.5%",
    name: "loanAssistance",
    inDashboard: "true",
    img: "../../assets/icons/loan.png",
  },
  {
    heading: "Avail Safe and Secure Flights",
    description: "International Flight Starting from 30,000 only",
    name: "flight",
    inDashboard: "true",
    img: "../../assets/icons/airplane.png",
  },
  {
    heading: "Get Safe & Verified Property",
    description: "For you & your love ones",
    name: "accommodation",
    inDashboard: "true",
    img: "../../assets/icons/bed.png",
  },
  {
    heading: "Best Forex Card ",
    description: "Add high discounted rate",
    name: "forexCard",
    inDashboard: "true",
    img: "../../assets/icons/forex.png",
  },
];
export default function UserPlanModal({ setIsModal, editItem }) {
  const [modal, setModal] = useState(true);

  return (
    <Modal setIsModal={setIsModal} modal={modal} modalStyles={{ width: "80%" }}>
      <h2> User Details</h2>
      <div className="h-full w-full p-9">
        {editItem?.planDetails ? (
          <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
            <div className="">Package Details</div>

            <div className="grid  grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-4">
                <div className="flex">
                  <h6 className="">Plan Name</h6>
                  <div className="pl-3">{editItem?.planDetails?.name}</div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="flex">
                  <h6 className="">Price</h6>
                  <div className="pl-3">{editItem?.planDetails?.price}</div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="flex">
                  <h6 className="">Expiry</h6>
                  <div className="pl-3">{editItem?.planDetails?.expiry}</div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">Add on Services</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 md:grid-cols-3 gap-3">
                {addOnServices.map((service, index) => {
                  return (
                    <div className="border-zinc-100 border p-2 rounded flex ">
                      <img
                        className="aspect-square w-[60px]"
                        src={service.img}
                        alt="town"
                      />
                      <div className="ml-2 ">
                        <div className="m-0">{service?.heading}</div>
                        <p>{service?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=""></div>
          </div>
        ) : (
          <div className="flex item-center h-full justify-center p-9 border rounded-md border-gray-100">
            <div className="">No Subsciption</div>
          </div>
        )}
      </div>
    </Modal>
  );
}
