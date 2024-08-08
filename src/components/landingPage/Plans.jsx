import React, { useContext, useEffect, useState } from "react";
import "./Plans.css";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "antd";
import PlanKnowMore from "./PlanKnowMore";
import { Button } from "react-bootstrap";
import PlanPriceCard from "./PlanPriceCard";
import SelectPlan from "./SelectPlan";
import { fetchAllData } from "../../adminPanel/methods/commonMethod";
import { userMethod } from "../../userMethods/userMethod";
import { toast } from "react-toastify";
import { MainSiteContext } from "../../context/MainSiteContext";
import { FetchProfile } from "../../methods/MainMethods";

function Plans(props) {
  const { state, dispatch } = useContext(MainSiteContext);
  const { user, profile } = state;

  const [plans, setPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowMore, setKnowMore] = useState(-1);
  const [select, setSelect] = useState(-1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [price, setPrice] = useState(false);
  const [knowMoreContent, setKnowMoreContent] = useState({});
  const [services, setServices] = useState({
    loanAssistance: false,
    flight: false,
    accommodation: false,
    forexCard: false,
  });

  const handleInputData = (input) => {
    setServices((prevState) => ({
      ...prevState,
      [input]: !prevState[input], // Toggle the value
    }));
  };

  const handleCancel = () => {
    setSelect(-1);
    setKnowMore(-1);
    setPrice(false);
    setTermsAccepted(false);
    setServices({
      loanAssistance: false,
      flight: false,
      accommodation: false,
      forexCard: false,
    });
  };

  const knowMoreClicked = (name, i) => {
    setKnowMore(name);
    setKnowMoreContent(plans[i].knowMore);
  };
  const selectClicked = (name, i) => {
    setSelect(name);
    setKnowMoreContent(plans[i].knowMore);

    // if (name === "Silver") setKnowMoreContent(plans[0].knowMore[0]);
    // else if (name === "Gold (Safe)") setKnowMoreContent(plans[1].knowMore[0]);
    // else setKnowMoreContent(plans[2].knowMore[0]);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 768 },
      items: props.inDiv ? 2 : 3,
    },
    desktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 767, min: 577 },
      items: props.inDiv ? 2 : 3,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      partialVisibilityGutter: props.inDiv ? 0 : 30,
    },
  };
  useEffect(() => {
    // console.log("FETCH");
    fetchAllData("plans/get", setPlan, setIsLoading);
  }, []);

  // useEffect(() => {
  //   console.log(plans);
  // }, [plans]);

  return (
    <div className="plans-section" style={props.inDiv && { padding: "0" }}>
      <div className="plans container-xl">
        <div className="plans-btn-bar">
          <button className="plans-btn">Plans</button>
        </div>

        <div className="row mt-3 plans-row">
          <Carousel
            partialVisible={true}
            infinite={true}
            arrows={props.inDiv ? true : false}
            responsive={responsive}
          >
            {plans?.map((plan, index) => {
              return (
                <div key={index} className="col-14 ">
                  <div className="card plans-card">
                    <div className="plan-card m-2" style={{ height: "50rem" }}>
                      <h5>{plan.name}</h5>
                      <hr />
                      <div className="planModal">
                        {plan.featuresIncluded.map((feature, index) => {
                          return (
                            <div key={index} className="plan-item">
                              <CheckIcon style={{ color: "#09A02A" }} />
                              <p>{feature}</p>
                            </div>
                          );
                        })}
                        {plan?.featuresNotIncluded.map((feature, index) => {
                          return (
                            <div key={index} className="plan-item">
                              <ClearIcon style={{ color: "#B60C0C" }} />
                              <p>{feature}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 w-100 plan-price">
                        <h5 className="">
                          <span>Rs {plan.originalPrice}</span>Rs {plan.price} +
                          GST
                        </h5>
                        {plan.name === "Silver" && (
                          <span>University Application Fee Excluded</span>
                        )}
                      </div>

                      <div className="know-more-btns">
                        <button
                          onClick={() => {
                            // console.log(plan.name);
                            !user?.isLogin
                              ? toast.error("Login First!")
                              : selectClicked(plan?.name, index);
                          }}
                          className="select-btn mt-4 "
                          style={
                            props.selectedPlan === index && props.upgrade
                              ? { opacity: 0.6, cursor: "not-allowed" }
                              : {}
                          }
                          disabled={props.selectedPlan === index}
                        >
                          {
                            props.upgrade
                              ? props.selectedPlan === index
                                ? "Selected"
                                : "Upgrade"
                              : "Select" // or any other fallback value you want when upgrade is not true
                          }
                        </button>

                        <Modal
                          centered
                          className="planModel"
                          style={{ zIndex: 100000, top: 20 }}
                          onCancel={handleCancel}
                          open={select === plan.name}
                          footer={[
                            <Button variant="outlined" onClick={handleCancel}>
                              Cancel
                            </Button>,
                            price ? (
                              <Button
                                className="nextBtn"
                                variant="primary"
                                type="submit"
                                onClick={async () => {
                                  await userMethod(
                                    "/purchase-plan",
                                    { plan: plan },
                                    null
                                  );
                                  await FetchProfile(
                                    "user/profile/get",
                                    dispatch,
                                    () => {}
                                  );
                                }}
                              >
                                Pay
                              </Button>
                            ) : (
                              <Button
                                className="nextBtn"
                                variant="primary"
                                type="submit"
                                onClick={() => setPrice(true)}
                                disabled={!termsAccepted}
                              >
                                Next
                              </Button>
                            ),
                          ]}
                        >
                          {price ? (
                            <PlanPriceCard
                              services={services}
                              planDetails={plan}
                              setServices={handleInputData}
                            />
                          ) : (
                            <SelectPlan
                              price={price}
                              setPrice={setPrice}
                              planDetails={knowMoreContent}
                              setTermsAccepted={setTermsAccepted}
                            />
                          )}
                        </Modal>

                        <button
                          onClick={() => knowMoreClicked(plan.name, index)}
                          className="plan-know-more-btn select-btn mt-4"
                        >
                          Know More
                        </button>

                        <Modal
                          centered
                          className="planModel"
                          style={{ zIndex: 100000, top: 20 }}
                          onCancel={handleCancel}
                          footer={[
                            <Button variant="outlined" onClick={handleCancel}>
                              Cancel
                            </Button>,
                          ]}
                          open={knowMore === plan.name}
                        >
                          <PlanKnowMore
                            price={price}
                            setPrice={setPrice}
                            planDetails={knowMoreContent}
                            setTermsAccepted={setTermsAccepted}
                          />
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Plans;
