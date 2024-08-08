import React, { useContext, useEffect, useState } from "react";
import PersonalDetails from "../components/profile/PersonalDetails";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import ProfileDocuments from "../components/profile/ProfileDocuments";
import { Radio, Tabs } from "antd";
import "../components/profile/Personal.css";
import Dashboard from "../components/profile/Dashboard";
import ProfileLoan from "../components/profile/ProfileLoan";
import {  FetchProfile } from "../methods/MainMethods";
import { MainSiteContext } from "../context/MainSiteContext";

function Profile() {
  const {state:{profile},dispatch}=useContext(MainSiteContext)
  const profileContents = [
    {
      children: <PersonalDetails  />,
      label: "Profile Details",
    },
    {
      children: <ProfileDocuments />,
      label: "Documents",
    },
    {
      children: <ProfileLoan />,
      label: "Loan",
    },
    {
      children: <Dashboard />,
      label: "Dashboard",
    },
  ];
  useEffect(()=>{
    FetchProfile("user/profile/get",dispatch,()=>{})

  },[])
  
  console.log(profile)

  return (
    <div>
      <Navbar />
      <div className="personalDetails-section">
        <div className="profileDetails container-xl pt-3 mt-5 ">
          <Tabs
            defaultActiveKey="1"
            // type="card"
            size="large"
            items={profileContents.map((content, i) => {
              const id = String(i + 1);
              return {
                label: content?.label,
                key: id,
                children: content?.children,
              };
            })}
          />
        </div>
      </div>
      {/* <ProfileDocuments /> */}
      {/* <PersonalDetails /> */}
      <Footer />
    </div>
  );
}

export default Profile;
