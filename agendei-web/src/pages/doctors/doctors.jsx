import "./doctors.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";

function Doctors() {
  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Médicos</h2>
          <Link to="/doctors/add" className="btn btn-outline-primary ms-5 mb-2">
            Novo Médico
          </Link>
        </div>

        <div className="d-flex justify-content-end ms-5 me-2">
          <div className="form-control justify-content-end ms-5 me-0">
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
        <table className="table table-hover" >
          <tr>
            <th scope="col">Médicos</th>
            <th scope="col">Especialidade</th>
            <th scope="col">CRM</th>
            <th scope="col">Telefone</th>
            <th scope="col">Ativo</th>
            <th scope="col" className="col-buttons"></th>
          </tr>
        </table>
      </div>
    </div>
    
  );
}

export default Doctors;
