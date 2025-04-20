import "./appointments.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import Appointment from "../../components/appointment/appoitment.jsx";
import { useCallback, useEffect, useState } from "react";
import api from "../../constants/api.js";
import { useDoctors } from "../../hooks/useDoctors.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idDoctors, setIdDoctors] = useState("");

  const { doctors, LoadDoctors } = useDoctors();

  function ClickEdit(id_appointment) {
    navigate("/appointments/edit/" + id_appointment);
  }

  function ClickDelete(id_appointment) {
    confirmAlert({
      title: "Exclusão",
      message: "Confirme exlusão desse agendamento?",
      buttons: [
        {
          label: "Sim",
          onClick: () => DeleteAppointment(id_appointment),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
    console.log(id_appointment);
  }

  async function DeleteAppointment(id) {
    console.log(id);
    try {
      const response = await api.delete("/admin/appointments/" + id);
      console.log("/admin/appointments/" + id)
      if (response.data) {
        LoadAppointment();
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status == 401) {
          return navigate("/");
        }
        alert(error.response?.data.error);
      } else {
        alert("Erro ao excluir agendamento.");
      }
    }
  }

  const LoadAppointment = useCallback(async () => {
    console.log("LoadAppointment...");
    try {
      const response = await api.get("/admin/appointments", {
        params: {
          id_doctor: idDoctors,
          startDate: startDate,
          endDate: endDate,
        },
      });

      if (response.data) {
        console.log(response.data);
        setAppointments(response.data);
      }
    } catch (error) {
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao listar os agendamentos.");
    }
  }, [navigate, endDate, idDoctors, startDate]);

  function ChangeDoctor(e) {
    console.log(e.target.value);
    setIdDoctors(e.target.value);
  }

  useEffect(() => {
    LoadDoctors();
    LoadAppointment();
  }, [LoadDoctors, LoadAppointment]);

  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Agendamentos</h2>
          <Link
            to="/appointments/add"
            className="btn btn-outline-primary ms-3 mb-2"
          >
            Novo agendamento
          </Link>
        </div>

        <div className="d-flex justify-content-end">
          <input
            id="startDate"
            className="form-control"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="m-2">Até</span>
          <input
            id="endDate"
            className="form-control"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />

          <div className="form-control ms-3 me-3">
            <select
              name="doctors"
              id="doctors"
              value={idDoctors}
              onChange={ChangeDoctor}
            >
              <option value="">Todos os médicos</option>

              {doctors.map((doc) => {
                return (
                  <option key={doc.id_doctor} value={doc.id_doctor}>
                    {doc.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="d-grid gap-2">
            <button
              onClick={LoadAppointment}
              className="btn btn-primary me-2"
              type="button"
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Paciente</th>
              <th scope="col">Médico</th>
              <th scope="col">Serviço</th>
              <th scope="col">Data/Hora</th>
              <th scope="col" className="text-end">
                Valor
              </th>
              <th scope="col" className="col-buttons"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((ap) => {
              return (
                <Appointment
                  key={ap.id_appointment}
                  id_appointment={ap.id_appointment}
                  user={ap.user}
                  doctor={ap.doctor}
                  service={ap.service}
                  booking_date={ap.booking_date}
                  booking_hour={ap.booking_hour}
                  price={ap.price}
                  clickEdit={ClickEdit}
                  clickDelete={ClickDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
