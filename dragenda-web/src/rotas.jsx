import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentAdd from "./pages/appointment-add/appointment-add.jsx";
import Doctors from "./pages/doctors/doctors.jsx";
import DoctorAdd from "./pages/doctor-add/doctor-add.jsx";
import DoctorEdit from "./pages/doctor-edit/doctor-edit.jsx";
import BusinessTypes from "./pages/business-types/business-types.jsx";
import BusinessTypeAdd from "./pages/business-type-add/business-type-add.jsx";
import BusinessTypeEdit from "./pages/business-type-edit/business-type-edit.jsx";
import Providers from "./pages/providers/providers.jsx";
import ProviderAdd from "./pages/provider-add/provider-add.jsx";
import NavigationTracker from "./components/Navigation/Navigation.jsx";

function Rotas() {
  return (
    <BrowserRouter>
      <NavigationTracker />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas de agendamentos */}
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/add" element={<AppointmentAdd />} />
          <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
          
          {/* Rotas de médicos (legado) */}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/add" element={<DoctorAdd />} />
          <Route path="/doctors/edit/:id_doctor" element={<DoctorEdit />} />
          
          {/* Novas rotas para tipos de negócio */}
          <Route path="/business-types" element={<BusinessTypes />} />
          <Route path="/business-types/add" element={<BusinessTypeAdd />} />
          <Route path="/business-types/edit/:id" element={<BusinessTypeEdit />} />
          
          {/* Novas rotas para prestadores de serviço genéricos */}
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/add" element={<ProviderAdd />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
