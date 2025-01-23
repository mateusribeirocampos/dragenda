import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { doctors, doctors_services } from "../../constants/data.js";

function DoctorEdit() {

  async function LoadEdit() {
    console.log("Load edition...");
  }



  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>
              Editar Médico
            </h2>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Médicos
            </label>
            <div className="form-control mb-2">
              <select name="doctors" id="doctors">
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
              <select name="service" id="service">
                <option value="0">Selecione o serviço</option>
                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.id_service}>
                      {d.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              CRM
            </label>
            <div className="form-control mb-2">
              <select name="service" id="service">
                <option value="0">Selecione o CRM</option>
                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.id_service}>
                      {d.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              Telefone
            </label>
            <div className="form-control mb-2">
              <select name="service" id="service">
                <option value="0">Selecione telefone</option>
                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.id_service}>
                      {d.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              Ativo
            </label>
            <div className="form-control mb-2">
              <select name="service" id="service">
                <option value="0">Médico ativo ?</option>
                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.id_service}>
                      {d.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/appointments" className="btn btn-outline-primary me-2">
                Cancelar
              </Link>
              <button 
              onClick={LoadEdit}
              className="btn btn-primary">Salvar dados</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorEdit;