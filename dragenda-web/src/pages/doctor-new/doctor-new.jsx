import { useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";
import api from "../../constants/api.js";
import ErrorMessage from "../../components/error/errorMessage.jsx";
import SucessMessage from "../../components/sucess/sucessMessage.jsx";

function DoctorNew() {

  const [nameDoctor, setNameDoctor] = useState("");
  const [specialtyDoc, setSpecialtyDoc] = useState("");
  const [msg, setMsg] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");
  const [availableDay, setAvailableDays] = useState([]);
  const [availableTime, setAvailableTime] = useState("");

  async function saveNewDoctor() {
    try {
      const response = await api.post("/admin/doctor-add", {
        nameDoctor,
        specialtyDoc,
        availableDay,
        availableTime,
      });
      if (response.data) {
        console.log("Médico inserido");
        setSucessMsg("Médico inserido com sucesso!");
      }
    } catch (error) {
      if (error.response?.data.error) {
        console.log(error.response?.data.error);
        setMsg(error.response?.data.error);
      } else {
        setMsg("Erro ao inserir médico. Tente novamente!");
      }
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>Novo Médico</h2>
          </div>

          <div className="col-12 mt-4">
            <h5 className="mb-2">Médicos</h5>
            <form className="form-singin" action="">
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  placeholder="Insira o nome do médico"
                  className="form-control"
                  autoComplete="doctorname"
                  onChange={(e) => setNameDoctor(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <h5>Serviço</h5>
              </div>
              <div className="mt-2">
                <input
                  name="service"
                  type="text"
                  placeholder="Especialidade do médico"
                  className="form-control"
                  autoComplete="serviceDoctor"
                  onChange={(e) => setSpecialtyDoc(e.target.value)}
                />
              </div>

              <div className="col-12 mt-4">
                <h5>Dias da Semana</h5>
                <div className="d-flex flex-wrap  mt-3">
                  {[
                    "Segunda",
                    "Terça",
                    "Quarta",
                    "Quinta",
                    "Sexta",
                    "Sábado",
                  ].map((day) => (
                    <div key={day} className="form-check me-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={day}
                        value={day}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setAvailableDays((prevDays) =>
                            checked
                              ? [...prevDays, value]
                              : prevDays.filter((d) => d !== value)
                          );
                        }}
                      />
                      <label className="form-check-label" htmlFor={day}>
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 mt-4">
                <h5>Horários de atendimento</h5>
                <div className="d-flex flex-wrap mt-3">
                  {[
                    "9:00",
                    "10:00",
                    "11:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                  ].map((timedoc) => (
                    <div key={timedoc} className="form-check me-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={timedoc}
                        value={timedoc}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setAvailableTime((prevTime) =>
                            checked
                              ? [...prevTime, value]
                              : prevTime.filter((t) => t !== value)
                          );
                        }}
                      />
                      <label className="form-check-label" htmlFor={timedoc}>
                        {timedoc}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <div>
                <Link
                  to="/appointments"
                  className="btn btn-outline-primary me-2"
                >
                  Cancelar
                </Link>
              </div>
              <div>
                <button
                  onClick={saveNewDoctor}
                  className="btn btn-primary"
                  type="button"
                >
                  Salvar dados
                </button>
              </div>
            </div>
          </div>
          <div>
            {msg && <ErrorMessage message={msg} />}
            {sucessMsg && <SucessMessage message={sucessMsg} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorNew;
