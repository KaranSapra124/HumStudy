
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />


      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
