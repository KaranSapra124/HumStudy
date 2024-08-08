import React, { useState } from "react";
import Navbar from "../components/ui/Navbar";
// import VisaMultiStepForm from "../components/visa/VisaMultiStepForm";
// import Footer from "../components/ui/Footer";
// import { Modal } from "react-bootstrap";
import { VisaForm } from "../components/visa/VisaForm";
// import { Input } from "antd";



function VisaFinderPage() {
  return (
    <div>
      <Navbar />
      {/* <VisaMultiStepForm /> */}
      <VisaForm />
      {/* <Footer /> */}
    </div>
  );
}

export default VisaFinderPage;
