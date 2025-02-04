import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useCallback, useEffect, useState } from "react";
import api from "../../constants/api.js";
import { useDoctors } from "../../hooks/useDoctors.js";

function AppointmentAdd() {
  const navigate = useNavigate();
  const { id_appointment } = useParams(); // id_appointment is a parameter
  // Example of URL: http://localhost:3000/appointments/edit/1
  // In this case, id_appointment is 1
  const [idUser, setIdUser] = useState("");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const { doctors, LoadDoctors } = useDoctors("");

  const [idDoctors, setIdDoctors] = useState("");
  const [idService, setIdService] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHour, setBookingHour] = useState("");



  const LoadUsers = useCallback(
    async function LoadUsers() {
      console.log("LoadUsers...");
      try {
        const response = await api.get("/admin/users");

        if (response.data) {
          console.log("LoadUsers...");
          console.log(response.data);
          setUsers(response.data);
        }
      } catch (error) {
        if (error.response?.data.error)
          if (error.response.status === 401) {
            return navigate("/");
          } else alert("Erro ao listar os pacientes.");
      }
    },
    [navigate]
  );

  async function SaveAppointment() {

    const json = {
      id_doctor: idDoctors,
      id_service: idService,
      id_user: idUser,
      booking_date: bookingDate,
      booking_hour: bookingHour,
    };
    console.log("idDoctor: " + idDoctors, " idService: " +idService, " idUser: " + idUser, " bookingDate: " + bookingDate, " bookingHour: " + bookingHour );
    try {
      const response = await api.post("/admin/appointments", json);
      if (response.data) {
        navigate("/appointments");
      }
    } catch (error) {
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao sarvar dados.");
    }
  }

  async function LoadServices(id) {
    if (!id) {
      return;
    }
    try {
      const response = await api.get("/doctors/" + id + "/services");
      console.log(response + " " + " " + response.data + " id: " + id);
      if (response.data) {
        setServices(response.data);
      }
    } catch (error) {
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao listar serviços.");
    }
  }

  useEffect(() => {
    LoadUsers();
    LoadDoctors();
  }, [LoadUsers, LoadDoctors]);

  useEffect(() => {
    LoadServices(idDoctors);
    console.log(idDoctors);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDoctors]);

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>
              {id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"}{" "}
              {/*// If id_appointment is greater than 0, it will be displayed "Edit Appointment", otherwise "New Appointment" */}
            </h2>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="user" className="form-label">
              Pacientes
            </label>
            <div className="form-control mb-2">
              <select
                name="user"
                id="user"
                value={idUser}
                onChange={(e) => setIdUser(e.target.value)}
              >
                <option value="0">Selecione o paciente</option>
                {users.map((u) => {
                  return (
                    <option key={u.id_user} value={u.id_user}>
                      {u.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Médicos
            </label>
            <div className="form-control mb-2">
              <select
                name="doctors"
                id="doctors"
                value={idDoctors}
                onChange={(e) => setIdDoctors(e.target.value)}
              >
                <option value="0">Selecione o médico</option>
                {doctors.map((d) => {
                  return (
                    <option key={d.id_doctor} value={d.id_doctor}>
                      {d.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              Serviço
            </label>
            <div className="form-control mb-2">
              <select
                name="service"
                id="service"
                value={idService}
                onChange={(e) => setIdService(e.target.value)}
              >
                <option value="0">Selecione o serviço</option>
                {services.map((s) => {
                  return (
                    <option key={s.id_service} value={s.id_service}>
                      {s.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Data
            </label>
            <input
              type="date"
              className="form-control"
              name="bookingDate"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>
          <div className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Horário
            </label>
            <div className="form-control mb-2">
              <select
                name="bookingHour"
                id="bookingHour"
                value={bookingHour}
                onChange={(e) => setBookingHour(e.target.value)}
              >
                <option value="0">Horário</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
              </select>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/appointments" className="btn btn-outline-primary me-2">
                Cancelar
              </Link>
              <button
                onClick={SaveAppointment}
                className="btn btn-primary"
                type="button"
              >
                Salvar dados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentAdd;
