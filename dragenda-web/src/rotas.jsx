import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentAdd from "./pages/appointment-add/appointment-add.jsx";
import Doctors from "./pages/doctors/doctors.jsx"
import DoctorAdd from "./pages/doctor-add/doctor-add.jsx";
import DoctorEdit from "./pages/doctor-edit/doctor-edit.jsx";


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/add" element={<AppointmentAdd />} />
        <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
        <Route path="/appointments/delete/:id_appointment" element={<AppointmentAdd />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/add" element={<DoctorAdd />} />
        <Route path="/doctors/edit/:id" element={<DoctorEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
