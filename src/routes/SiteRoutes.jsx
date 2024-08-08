import { Routes, Route } from "react-router-dom";
import Homepage from "../mainSite/pages";
import "../css/site.css";

export default function SiteRoutes() {
  return (
    <Routes>
      <Route index element={<Homepage />}></Route>
    </Routes>
  );
}
