import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack, BiSolidOffer } from "react-icons/bi";
import {
  FaBlog,
  FaCcVisa,
  FaCreditCard,
  FaGraduationCap,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import {
  MdAnalytics,
  MdContactMail,
  MdContactSupport,
  MdDashboard,
  MdFlightTakeoff,
  MdHotel,
  MdSchool,
} from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  //   const [isSiteContentOpen, setIsSiteContentOpen] = useState(
  //     pathname.includes('site-content')
  //   );

  return (
    <main className="flex min-h-[100vh] max-w-[100vw] overflow-x-hidden text-[14px]">
      <aside
        className={`md:w-[250px] md:min-w-[250px] md:min-h-[100vh] h-auto w-full left-0 bg-tl_primary text-white md:static absolute transition-all duration-500 z-50 ${
          isNavOpen ? "top-[50px]" : "-top-[140%]"
        }`}
      >
        <h2 className="text-[32px] w-fit mx-auto my-4 md:block hidden">
          HUMSTUDY
        </h2>
        <nav className="list-none">
          {links.map((item, i) => (
            <NavItem key={i} data={item} />
          ))}
        </nav>
      </aside>
      <section className="md:w-[calc(100vw-250px)] w-[100vw] flex-grow flex flex-col">
        <header className="w-full h-[60px] shadow shadow-gray-200 flex items-center justify-between md:px-8 px-4 relative md:z-[49] z-[51] bg-white">
          <div className="flex items-center gap-6">
            <button
              type="button"
              title="Go back"
              onClick={() => navigate(-1)}
              className="p-2 rounded-md text-[20px]"
            >
              <BiArrowBack />
            </button>
            <p className="md:hidden">Header</p>
            <p className="md:block hidden">Logo</p>
          </div>
          <button
            type="button"
            onClick={() => setIsNavOpen((prev) => !prev)}
            className="p-2 md:hidden w-[35px] sm:h-[20px] flex flex-col justify-between relative"
          >
            <div
              className={`mx-auto w-[80%] h-[3px] absolute left-2/4 -translate-x-2/4 bg-tl_primary rounded-md transition-all duration-300 ${
                isNavOpen
                  ? "rotate-[135deg] top-2/4 -translate-y-2/4"
                  : "rotate-0 top-0"
              }`}
            ></div>
            <div
              className={`mx-auto w-[80%] h-[3px] absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 bg-tl_primary rounded-md transition-all duration-300 ${
                isNavOpen ? "scale-0" : "scale-100"
              }`}
            ></div>
            <div
              className={`mx-auto w-[80%] h-[3px] absolute left-2/4 -translate-x-2/4 bg-tl_primary rounded-md transition-all duration-300 ${
                isNavOpen
                  ? "-rotate-[135deg] bottom-2/4 translate-y-2/4"
                  : "rotate-0 bottom-0"
              }`}
            ></div>
          </button>
        </header>
        <section className="w-full md:p-8 p-4 text-gray-600 bg-natural_bg min-h-[calc(100dvh-60px)]">
          {children}
        </section>
      </section>
    </main>
  );
}

const NavItem = ({ data }) => {
  const { pathname } = useLocation();
  return (
    <Link to={`/admin/${data.to}`}>
      <li
        className={`flex text-white  items-center gap-3 p-4 border-t border-purple-500 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
          data.to
            ? pathname.includes(data.to)
              ? "bg-tl_primary_2/50"
              : ""
            : pathname === "/admin/"
            ? "bg-tl_primary_2/50"
            : ""
        }`}
      >
        <NavItemIcon icon={data.icon} /> {data.name}
      </li>
    </Link>
  );
};

const NavItemIcon = ({ icon }) => {
  return <span className="text-[18px]">{icon}</span>;
};

const links = [
  {
    name: "Dashboard",
    to: "",
    icon: <MdDashboard />,
  },
  {
    name: "Universities",
    to: "universities",
    icon: <FaUniversity />,
  },
  {
    name: "Applications",
    to: "applications",
    icon: <MdContactMail />,
  },
  {
    name: "Users",
    to: "users",
    icon: <FaUsers />,
  },
  {
    name: "Plans",
    to: "plans",
    icon: <BiSolidOffer />,
  },
  {
    name: "Visa",
    to: "visa",
    icon: <FaCcVisa />,
  },
  {
    name: "Flights",
    to: "flights",
    icon: <MdFlightTakeoff />,
  },
  {
    name: "Loans",
    to: "loans",
    icon: <IoMdCash />,
  },
  {
    name: "Loan Applications",
    to: "loan-application",
    icon: <HiOutlineDocumentArrowDown />,
  },

  {
    name: "Payments",
    to: "payments",
    icon: <FaCreditCard />,
  },
  {
    name: "Blogs",
    to: "blogs",
    icon: <FaBlog />,
  },
  {
    name: "Support",
    to: "support",
    icon: <MdContactSupport />,
  },
  {
    name: "Log Out",
    to: "logout",
    icon: <LogoutIcon />,
  },
  // {
  //   name: "Reports & Analytics",
  //   to: "reports-and-analytics",
  //   icon: <MdAnalytics />,
  // },
];

// navbar dropdown
{
  /* <button
            type="button"
            className="w-full"
            onClick={() => setIsSiteContentOpen((prev) => !prev)}
          >
            <li
              className={`flex items-center gap-3 p-4 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center`}
            >
              <HiMiniCodeBracket className="text-[18px]" /> Site Content{' '}
              <BiSolidChevronRight
                className={`transition-all duration-300 font-[700] ${
                  isSiteContentOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </li>
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isSiteContentOpen ? 'max-h-[400px]' : 'max-h-0'
            }`}
          >
            <Link to={`/admin/site-content/questions`}>
              <li
                className={`flex items-center gap-3 p-4 pl-10 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
                  pathname.includes('questions') ? 'bg-tl_primary_2/50' : ''
                }`}
              >
                <MdQuestionMark className="text-[18px]" /> Questions
              </li>
            </Link>
            <Link to={`/admin/site-content/degrees`}>
              <li
                className={`flex items-center gap-3 p-4 pl-10 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
                  pathname.includes('degrees') ? 'bg-tl_primary_2/50' : ''
                }`}
              >
                <FaGraduationCap className="text-[18px]" /> Degrees
              </li>
            </Link>
            <Link to={`/admin/site-content/colleges`}>
              <li
                className={`flex items-center gap-3 p-4 pl-10 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
                  pathname.includes('colleges') ? 'bg-tl_primary_2/50' : ''
                }`}
              >
                <FaSchool className="text-[18px]" /> Colleges
              </li>
            </Link>
            <Link to={`/admin/site-content/locations`}>
              <li
                className={`flex items-center gap-3 p-4 pl-10 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
                  pathname.includes('locations') ? 'bg-tl_primary_2/50' : ''
                }`}
              >
                <MdLocationOn className="text-[18px]" /> Locations
              </li>
            </Link>
            <Link to={`/admin/site-content/skills`}>
              <li
                className={`flex items-center gap-3 p-4 pl-10 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
                  pathname.includes('skills') ? 'bg-tl_primary_2/50' : ''
                }`}
              >
                <FaLaptopCode className="text-[18px]" /> Skills
              </li>
            </Link>
            <Link to={`/admin/site-content/industries`}>
              <li
                className={`flex items-center gap-3 p-4 pl-10 border-t border-gray-400 hover:bg-tl_primary_2/50 transition-all duration-500 md:justify-start justify-center ${
                  pathname.includes('industries') ? 'bg-tl_primary_2/50' : ''
                }`}
              >
                <FaIndustry className="text-[18px]" /> Industries
              </li>
            </Link>
          </div> */
}
