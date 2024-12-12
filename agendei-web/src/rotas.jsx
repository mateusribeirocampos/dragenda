import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
