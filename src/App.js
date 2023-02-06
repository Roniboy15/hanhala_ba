import './App.css';
import AdminHeader from './admin_comps/adminHeader';
import ClientHeader from './client_comps/clientHeader';
import { adminRoutes, clientRoutes } from './routes/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BrowserRouter>
          {/* Routes of header what to show client or admin header. Works like switch case. */}
          <Routes>
            <Route path="/admin/*" element={<AdminHeader />} />
            <Route path="/*" element={<ClientHeader />} />
          </Routes>
            <Routes>
              {/* client */}
              {clientRoutes()}
              {adminRoutes()}
            </Routes>
          {/* The toast messages added here */}
          <ToastContainer position="top-left" theme="colored" />
        </BrowserRouter>
    </div>
  );
}

export default App;
