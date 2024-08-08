// import Navbar from "../components/ui/Navbar";
// import { useEffect, useState } from "react";
// import styles from "../components/profile/profile.module.css";
// import Footer from "../components/ui/Footer";
// import ProfileForm from "../components/profile/ProfileForm";
// import ProfileDocuments from "../components/profile/ProfileDocuments";
// import AcademicsForm, {
//   AcademicExam,
//   AptitudeTest,
//   Education,
//   EmergencyContact,
//   LastExam,
//   WorkExperience,
// } from "../components/profile/AcademicsForm";
// import Other from "../components/profile/Other";
// import ProfileLoan from "../components/profile/Other";
// import { Collapse, theme } from "antd";
// import { CaretRightOutlined } from "@ant-design/icons";
// import { EnglishExam } from "../components/profile/AcademicsForm";

// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

// const englishExams = [
//   {
//     label: "TOEFL",
//     value: "toefl",
//     minMarks: 0,
//     maxMarks: 120,
//   },
//   {
//     label: "IELTS",
//     value: "ielts",
//     minMarks: 0,
//     maxMarks: 9,
//   },
//   {
//     label: "PTE",
//     value: "pte",
//     minMarks: 0,
//     maxMarks: 90,
//   },
//   {
//     label: "Not Applied",
//     value: "na",
//   },
// ];

// export default function Profile() {
//   const [isPremium, setIsPremium] = useState(true);
//   const [detail, setDetail] = useState("profile");
//   const [editable, setEditable] = useState(true);

//   const [formData, setFormData] = useState({
//     countries: undefined,
//     statusOfAdmission: undefined,
//     plannedUniversity: undefined,
//     startDate: undefined,
//     lastExam: undefined,
//     lastExamScore: 0,
//     englishExam: undefined,
//     englishExamScore: 0,
//     otherEnglishExam: "",
//     aptitudeExam: undefined,
//     otherAptitudeExam: "",
//     aptitudeExamScore: 0,
//     academicExam: undefined,
//     academicExamScore: 0,
//   });
//   const [experienceData, setExperienceData] = useState({
//     workType: undefined,
//     status: undefined,
//     organizationName: undefined,
//     designation: undefined,
//     university: undefined,
//     country: undefined,
//     startDate: null,
//     endDate: null,
//   });

//   const [emergencyDetails, setEmergencyDetails] = useState({
//     name: undefined,
//     relation: undefined,
//     phone: undefined,
//     email: undefined,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editable) {
//       console.log("Saved", formData);
//       setEditable(false);
//     } else setEditable(true);
//   };

//   const handleChange = (input) => (value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [input]: value,
//     }));
//   };

//   const handleExperienceChange = (input) => (value) => {
//     setExperienceData((prevState) => ({
//       ...prevState,
//       [input]: value,
//     }));
//   };
//   const handleEmergencyChange = (input) => (value) => {
//     setEmergencyDetails((prevState) => ({
//       ...prevState,
//       [input]: value,
//     }));
//   };

//   const getItems = (panelStyle) => [
//     {
//       key: "1",
//       label: "English Test Score",
//       children: <EnglishExam formData={formData} handleChange={handleChange} />,
//       style: panelStyle,
//     },
//     {
//       key: "2",
//       label: "Aptitude Test",
//       children: (
//         <AptitudeTest formData={formData} handleChange={handleChange} />
//       ),
//       style: panelStyle,
//     },
//     {
//       key: "3",
//       label: "Academic Information",
//       children: <Education formData={formData} handleChange={handleChange} />,
//       style: panelStyle,
//     },
//     {
//       key: "4",
//       label: "Experience Information",
//       children: (
//         <WorkExperience
//           formData={experienceData}
//           handleChange={handleExperienceChange}
//         />
//       ),
//       style: panelStyle,
//     },
//     {
//       key: "5",
//       label: "Emergency Contact",
//       children: (
//         <EmergencyContact
//           formData={emergencyDetails}
//           handleChange={handleEmergencyChange}
//         />
//       ),
//       style: panelStyle,
//     },
//   ];
//   const { token } = theme.useToken();
//   const panelStyle = {
//     marginBottom: 10,
//     background: "#fff",
//     borderRadius: token.borderRadiusLG,
//     border: "none",
//   };

//   return (
//     <div className="page">
//       <Navbar />
//       <div
//         className={styles.container}
//         style={{
//           backgroundColor: "transparent",
//           paddingTop: "30px",
//           padding: "0",
//         }}
//       >
//         <div
//           className={styles.switch}
//           style={{ display: "flex", gap: "0 15px", overflow: "auto" }}
//         >
//           <button
//             className={detail === "profile" && styles.active}
//             onClick={() => setDetail("profile")}
//           >
//             Profile Details
//           </button>
//           <button
//             className={detail === "documents" && styles.active}
//             onClick={() => setDetail("documents")}
//           >
//             Documents
//           </button>
//           <button
//             className={detail === "loan" && styles.active}
//             onClick={() => setDetail("loan")}
//           >
//             Loan
//           </button>
//           <button
//             className={detail === "status" && styles.active}
//             onClick={() => setDetail("status")}
//           >
//             Academics
//           </button>
//         </div>
//       </div>
//       <div className={styles.container} style={{ marginTop: "0" }}>
//         <div className="d-flex align-items-center gap-3 mb-3">
//           {detail === "documents" && <h3>Documents</h3>}
//           {detail === "profile" && <h3>Profile Details</h3>}
//           {detail === "status" && <h3>Academics</h3>}
//           {detail === "loan" && <h3>Loan Details</h3>}
//           <span
//             className={`badge ${
//               isPremium ? "text-bg-warning text-white" : "text-bg-light"
//             }`}
//           >
//             {isPremium ? "Premium" : "Basic"}
//           </span>
//         </div>
//         {detail === "profile" && <ProfileForm />}
//         {detail === "documents" && <ProfileDocuments />}
//         {detail === "status" && <AcademicsForm />}
//         {detail === "loan" && <ProfileLoan />}
//       </div>
//       <div className="profile_container__uiGV6 profile-score-div">
//         <div className="">
//           {getItems(panelStyle).map((item) => {
//             return (
//               <div>
//                 <Collapse
//                   className={styles.container}
//                   bordered={false}
//                   defaultActiveKey={["1"]}
//                   expandIcon={({ isActive }) => (
//                     <CaretRightOutlined rotate={isActive ? 90 : 0} />
//                   )}
//                   style={{
//                     width: "100%",
//                     padding: "0",
//                     margin: "10px auto",
//                     background: token.colorBgContainer,
//                   }}
//                   items={getItems(panelStyle).filter(
//                     (it) => it.key === item.key
//                   )}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
