import AdminLayout from "../components/AdminLayout";
import {
  ActivePlansCard,
  CourseCard,
  FlightCard,
  LoanAppCard,
  SalesCard,
  UniAppCard,
  UniCard,
  VisaCard,
} from "../components/dashboard/DashboardCards";
import { SalesChart } from "../components/dashboard/Charts";
import SalesTable from "../components/dashboard/SalesTable";
import Todos from "../components/dashboard/Todos";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie.includes("tokenA")) {
      navigate("/admin/login");
      toast.error("Login First!");
    }
  }, []);
  return (
    <>
      <AdminLayout>
        <div className="flex max-[500px]:flex-wrap max-[500px]:justify-center gap-6 mb-2 ">
          <SalesCard className="flex basis-0 grow-1 " />
          <ActivePlansCard className="flex basis-0 grow-1 " />
          <div className="flex basis-0 grow-1 col-span-3">
            <Link
              to={"/admin/universities"}
              className="w-fit block no-underline"
            >
              <UniCard />
            </Link>
          </div>
          <div className="flex basis-0 grow-1">
            <Link
              to={"/admin/universities"}
              className="w-fit block no-underline"
            >
              <CourseCard />
            </Link>
          </div>
        </div>
        <div className="flex max-[500px]:flex-wrap max-[500px]:justify-center gap-6">
          <div className="flex basis-0 grow-1 col-span-3">
            <Link to={"/admin/flights"} className="no-underline">
              <FlightCard />
            </Link>
          </div>
          <div className="flex basis-0 grow-1 col-span-3">
            <Link to={"/admin/visa"} className="no-underline">
              <VisaCard />
            </Link>
          </div>
          <div className="flex basis-0 grow-1 col-span-3">
            <Link to={"/admin/applications"} className="no-underline">
              <UniAppCard />
            </Link>
          </div>
          <div className="flex basis-0 grow-1 col-span-3 no-underline">
            <Link to={"/admin/loan-application"} className="no-underline">
              <LoanAppCard />
            </Link>
          </div>
          {/* <SalesTable /> <SalesChart /> */}
        </div>
      </AdminLayout>
    </>
  );
}
