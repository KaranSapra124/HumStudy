import { Routes, Route } from "react-router-dom";
import Dashboard from "../adminPanel/pages/Dashboard";
import Courses from "../adminPanel/pages/Courses";
import Universities from "../adminPanel/pages/Universities";
import Users from "../adminPanel/pages/Users";
import Accomodations from "../adminPanel/pages/Accomodations";
import Flights from "../adminPanel/pages/Flights";
import Loans from "../adminPanel/pages/Loans";
import Applications from "../adminPanel/pages/Applications";
import Payments from "../adminPanel/pages/Payments";
import Blogs from "../adminPanel/pages/Blogs";
import Support from "../adminPanel/pages/Support";
import ReportsAndAnalytics from "../adminPanel/pages/ReportsAndAnalytics";
import LoanApplications from "../adminPanel/pages/LoansApplications";
import { MainContext } from "../context/AppContext";
import { Visa } from "../adminPanel/pages/Visa";
import Plans from "../adminPanel/pages/Plans";
import "../css/admin.css";
import AdminLogin from "../adminPanel/pages/AdminLogin";

export default function AdminRoutes() {
  return (
    <MainContext>
      <Routes>
        <Route index element={<Dashboard />}></Route>
        <Route path="/login" element={<AdminLogin/>}></Route>
        <Route path="/logout" element={<AdminLogin/>}></Route>
        <Route path="plans" element={<Plans />}></Route>
        <Route path="universities" element={<Universities />}></Route>
        <Route path="universities/:uniId" element={<Courses />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="accomodations" element={<Accomodations />}></Route>
        <Route path="visa" element={<Visa />}></Route>
        <Route path="flights" element={<Flights />}></Route>
        <Route path="loans" element={<Loans />}></Route>
        <Route path="loan-application" element={<LoanApplications />}></Route>
        <Route path="applications" element={<Applications />}></Route>
        <Route path="payments" element={<Payments />}></Route>
        <Route path="blogs" element={<Blogs />}></Route>
        <Route path="support" element={<Support />}></Route>
        <Route
          path="reports-and-analytics"
          element={<ReportsAndAnalytics />}
        ></Route>
      </Routes>
    </MainContext>
  );
}
