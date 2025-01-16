import "./doctors.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Doctor from "../../components/doctor/doctor.jsx";
import api from "../../constants/api.js";


function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  async function LoadDoctors() {
    console.log("LoadDoctors...");
    try {
      const response = await api.get("/doctors");

      if (response.data) {
        console.log(response.data);
        setDoctors(response.data);
      }
    } catch (error) {
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao listar os médicos.");
    }
  }

  useEffect(() => {
    LoadDoctors();
  }, [])

  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Médicos</h2>
          <Link to="/doctors/add" className="btn btn-outline-primary ms-3 mb-2">
            Novo Médico
          </Link>
        </div>

        <div className="d-flex justify-content-end ms-5 me-2">
          <div className="form-control justify-content-end ms-5 me-1">
            <select name="doctors" id="doctors">
              <option value="">Busca por nome do médico</option>
            </select>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary ms-2 me-2" type="button">
              Filtrar
            </button>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-hover ms-1 mt-5">
          <thead>
            <tr>
              <th scope="col">Médicos</th>
              <th scope="col">Especialidade</th>
              <th scope="col">CRM</th>
              <th scope="col">Telefone</th>
              <th scope="col">Ativo</th>
              <th scope="col" className="col-buttons"></th>
            </tr>
          </thead>
          <tbody>
              {doctors.map((doc) => {
                return (
                  <Doctor
                    key={doc.id_doctor}
                    doctor={doc.name}
                    specialty={doc.specialty}
                    crm={doc.crm}
                    telefone={doc.telefone}
                    ativo={doc.ativo}/>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;
