import React, { useContext, useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Steps, Timeline, theme } from "antd";
import { Collapse, Divider } from "antd";
import DashboardUniversity from "./DashboardUniversity";
import DashboardUpdate from "./DashboardUpdate";
import DashboardCounsellor from "./DashboardCounsellor";
import DashboadPackage from "./DashboadPackage";
import "./DashboardUniversityCard.css";
import { MainSiteContext } from "../../context/MainSiteContext";
import TimelineItem from "antd/es/timeline/TimelineItem";
import { CheckCircle } from "@mui/icons-material";
import { fetchAllData } from "../../adminPanel/methods/commonMethod";

function Dashboard() {
  const { state } = useContext(MainSiteContext);
  const { profile } = state;
  const { token } = theme.useToken();
  const [loan, setLoans] = useState("");
  const [visa, setVisa] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const panelStyle = {
    marginBottom: 10,
    background: "#fff",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  useEffect(() => {
    fetchAllData("loan-application/get", setLoans, setIsLoading);
  }, []);

  useEffect(() => {
    fetchAllData("visa/get", setVisa, setIsLoading);
  }, []);
  useEffect(() => console.log(visa), [visa]);
  return (
    <div className="row">
      <div className="col-12 col-lg-6 mt-3 ">
        <Collapse
          items={[
            {
              key: "1",
              label: "My Applied University",
              children: <DashboardUniversity />,
            },
          ]}
          style={panelStyle}
        />
      </div>
      <div className="col-12 col-lg-6 mt-3">
        <Collapse
          items={[
            {
              key: "1",
              label: "Application Status",
              children: (
                <ApplicationStatus data={profile} loan={loan} visa={visa} />
              ),
            },
          ]}
          style={panelStyle}
        />
      </div>
      <div className="col-12 mt-3">
        <Collapse
          items={[
            {
              key: "1",
              label: "Update by Humstudy",
              children: <DashboardUpdate />,
            },
          ]}
          style={panelStyle}
        />
      </div>
      <div className="col-12 mt-3">
        <Collapse
          items={[
            {
              key: "1",
              label: "Assigned Counsellor",
              children: <DashboardCounsellor />,
            },
          ]}
          style={panelStyle}
        />
      </div>
      <div className="col-12 mt-3">
        <Collapse
          items={[
            {
              key: "1",
              label: "Package Details",
              children: <DashboadPackage plan={profile?.planDetails} />,
            },
          ]}
          style={panelStyle}
        />
      </div>
    </div>
  );
}
const ApplicationStatus = ({ data, loan, visa }) => {
  const universities = data.universitiesApplied;
  const loans = loan;
  const visaData = visa;
  // // Compute the counts
  const statusCounts = universities?.reduce(
    (acc, elem) => {
      if (elem.status === "Pending") acc.pending += 1;
      else if (elem.status === "Approved") acc.approved += 1;
      else if (elem.status === "Rejected") acc.rejected += 1;
      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 }
  );
  const loanStatusCounts = loan
    ?.filter((elem) => elem?.userId?._id == data?._id)
    .reduce(
      (acc, elem) => {
        if (elem.loanStatus === "pending") acc.pending += 1;
        else if (elem.loanStatus === "accepted") acc.approved += 1;
        else if (elem.loanStatus === "rejected") acc.rejected += 1;
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0 }
    );
  // console.log(visa, data._id, "VISA");
  const visaStatusCounts = visa
    ?.filter((elem) => elem?.userId == data?._id)
    .reduce(
      (acc, elem) => {
        if (elem.status === "Pending") acc.pending += 1;
        else if (elem.status === "Approved") acc.approved += 1;
        else if (elem.status === "Rejected") acc.rejected += 1;
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0 }
    );

  return (
    <>
      <Timeline mode="left">
        {universities?.length !== 0 && (
          <>
            <TimelineItem color="green" dot={<CheckCircle />}>
              Application Recieved
            </TimelineItem>

            <TimelineItem
              label={<h6>Application Status</h6>}
              color="green"
              dot={<CheckCircle />}
            >
              <div>
                {/* {statusCounts?.pending && ( */}
                  <div>{statusCounts?.pending} Application Waiting</div>
                {/* )} */}
                {/* {statusCounts?.approved && ( */}
                  <div>/ {statusCounts?.approved} Application Processed</div>
                {/* )} */}
                {/* {statusCounts?.rejected && ( */}
                  <div>/ {statusCounts?.rejected} Application Processed</div>
                {/* )} */}
              </div>
            </TimelineItem>
          </>
        )}
        {loans?.length !== 0 && (
          <>
            {/* <TimelineItem color="green" dot={<CheckCircle />}>
              Application Recieved
            </TimelineItem> */}

            <TimelineItem
              label={<h6>Loan Status</h6>}
              color="green"
              dot={<CheckCircle />}
            >
              <div>
                <div>{loanStatusCounts?.pending} Loan Waiting</div>

                <div>/ {loanStatusCounts?.approved} Loan Processed</div>

                <div>/ {loanStatusCounts?.rejected} Loan Rejected</div>
              </div>
            </TimelineItem>
          </>
        )}
        {visa?.length !== 0 && (
          <>
            {/* <TimelineItem color="green" dot={<CheckCircle />}>
              Application Recieved
            </TimelineItem> */}
            {/* {console.log(visaStatusCounts)} */}
            <TimelineItem
              label={<h6>Visa Status</h6>}
              color="green"
              dot={<CheckCircle />}
            >
              <div>
                {visaStatusCounts?.pending && (
                  <div>{visaStatusCounts?.pending} Visa Waiting</div>
                )}
                {/* {visaStatusCounts?.approved && ( */}
                  <div>/ {visaStatusCounts?.approved} Visa Approved</div>
                {/* // )} */}

                <div>/ {visaStatusCounts?.rejected} Visa Rejected</div>
              </div>
            </TimelineItem>
          </>
        )}
      </Timeline>
    </>
  );
};

export default Dashboard;
