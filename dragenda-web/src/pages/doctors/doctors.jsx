import "./doctors.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Doctor from "../../components/doctor/doctor.jsx";
import api from "../../constants/api.js";


function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [nameDoctor, setNameDoctor] = useState("");

  function ClickEdit(id_doctor) {
    navigate("/doctors/edit/" + id_doctor);
  }

  function ClickDelete(id_doctor) {
    console.log("/doctors/delete/" + id_doctor);
  }

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

  async function ListDoctor() {
    console.log("ListDoctor...");
    if(!nameDoctor) {
      return LoadDoctors();
    }
    try {
      const response = await api.get("/admin/doctors", {
        params: {
          name: nameDoctor
        },
      });

      if (response.data){
        console.log(response.data)
        setDoctors(response.data);
      }
    } catch (error) {
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao listar os médicos");
    }
  }

  function ChangeDoctor(e) {
    console.log(e.target.value);
    setNameDoctor(e.target.value);

  }

  useEffect(() => {
    LoadDoctors();
    ListDoctor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <select 
            name="doctors" 
            id="doctors"
            value={nameDoctor}
            onChange={ChangeDoctor}
            >
              <option value="">Busca por nome do médico</option>

              {doctors.map((docs) => {
                return (
                  <option key={docs.id_doctor} value={docs.name}>
                    {docs.name}
                  </option>
                );
              })};
            </select>
          </div>
          <div className="d-grid gap-2">
            <button
            onClick={ListDoctor} 
            className="btn btn-primary ms-2 me-2" 
            type="button">
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
                    id_doctor={doc.id_doctor}
                    doctor={doc.name}
                    specialty={doc.specialty}
                    crm={doc.crm}
                    telefone={doc.phone}
                    ativo={doc.active}
                    clickEdit={ClickEdit}
                    clickDelete={ClickDelete}/>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;
